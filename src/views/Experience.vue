<template>
    <!-- <ExperienceIntro /> -->
    <Modal :data="modalData"/>
    <div class="changeScene-btn flex align-center justify-center text--m" @click="changeScene()">
      <span>CHANGE DE VUE</span>
    </div>
    <canvas @mousemove="handleMouseMove($event)" @click="handleClick($event)" class="webgl"></canvas>
</template>

<script setup>
import Experience from "@/Experience/Experience";
import ExperienceIntro from "@/components/ExperienceIntro.vue";
import gsap from 'gsap';
import Modal from "/src/components/Modal.vue";
import { onMounted, onUpdated, ref } from 'vue';
import MittInstance from "@/core/lib/MittInstance.js";
import { ENV_DATA } from "@/data/environmentData.js";

const modalData = ref(ENV_DATA[0].pins[0])
const currentSceneIndex = ref(0)


onMounted(() => {
  const experience = new Experience(document.querySelector('canvas.webgl'))
  experience.renderer.instance.render(experience.scene, experience.camera.instance)
})


MittInstance.on('displayModal', (data) => {
  modalData.value = data
})

const handleClick = (e) => {
  let mouse = {
    x: e.clientX / window.innerWidth * 2 - 1,
    y: -(e.clientY / window.innerHeight) * 2 + 1
  }
  experience.world.environment.checkPosition(mouse)
}

const handleMouseMove = (e) => {
  let mouse = {
    x: e.clientX / window.innerWidth * 2 - 1,
    y: -(e.clientY / window.innerHeight) * 2 + 1
  }
  experience.world.environment.checkHover(mouse)
}

const changeScene = () => {
  const arrayIndex = [0,1,2].filter((index) => index !== currentSceneIndex.value)
  let newRandIndex  = arrayIndex[Math.floor(Math.random() * arrayIndex.length)]
  currentSceneIndex.value = newRandIndex
  MittInstance.emit('changeScene', { data: ENV_DATA[newRandIndex] })
}
</script>
