<template>
  <div class="intro-experience__container flex column align-center justify-center">
    <DragSVG />
    <div class="intro-experience__text text--l">Drag in 360° to navigate</div>
    <CtaBtnVue @click="handleClick()" text="Got It!"/>
  </div>
</template>

<script setup>
  import CtaBtnVue from './CtaBtn.vue';
  import DragSVG from './DragSVG.vue';
  import gsap from 'gsap';

  const handleClick = () => {
    gsap.to('.intro-experience__container', {
      duration: 1,
      opacity: 0,
      onComplete: () => {
      document.querySelector('.intro-experience__container').style.display = 'none';
    }})
  }

</script>
