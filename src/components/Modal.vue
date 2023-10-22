<template>
  <div :ref="modalContainer" class="modal__wrapper" :style ="{ background: 'linear-gradient(0deg, rgba(6, 5, 36, 0.70) 0%, rgba(6, 5, 36, 0.70) 100%), linear-gradient(0deg, rgba(255, 214, 87, 0.07) 0%, rgba(255, 214, 87, 0.07) 100%), url(' + dataToShow.modalInfos.image + ')', backgroundSize: 'cover', backgroundPosition: 'center' }">
    <div class="modal__container flex column align-center justify-center">
      <CloseCross @click="closeModal"/>
      <img class="modal__hero" :src="dataToShow.modalInfos.image" alt="" srcset="">
      <div class="modal__title-wrapper flex justify-start">
        <div class="modal__title title--l flex">
          <span>{{ dataToShow.modalInfos.title }}</span>
          <span>{{ dataToShow.modalInfos.title }}</span>
          <span>{{ dataToShow.modalInfos.title }}</span>
          <span>{{ dataToShow.modalInfos.title }}</span>
        </div>
      </div>
      <div class="modal__content flex justify-between">
        <div class="modal__subtitle title--s">{{ dataToShow.modalInfos.subTitle }}</div>
        <div class="modal__text text--l">{{ dataToShow.modalInfos.text }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import gsap from 'gsap';
import MittInstance from "@/core/lib/MittInstance.js";
import CloseCross from '@/components/closeCross.vue';

const props = defineProps({
  data: Object
})

const dataToShow = ref(props.data)
const modalContainer = ref(null)

onMounted(() => {
  modalContainer.value = modalContainer
})

MittInstance.on('displayModal', () => {
  gsap.to(modalContainer.value,
    {
      duration: 0.5,
      y: "0%",
    })
})


watch(
  () => props.data,
  () => { dataToShow.value = props.data}
)

const closeModal = () => {
  gsap.to(modalContainer.value,
    {
      duration: 0.5,
      y: "100%",
    })
}
</script>
