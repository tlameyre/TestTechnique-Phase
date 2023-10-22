<template>
  <div class="intro__container flex column align-center justify-center">
    <h1 class="intro__title title--m">
      L’Occitane <br>
      vous invite à
      <span class="to-surround">
        Manosque
        <Circle />
      </span>
    </h1>
    <div class="intro-text__container hidden">
      <div class="intro-text title--m">Entrez au cœur de notre univers en visitant à 360° le jardin, l’usine et la boutique musée.</div>
      <router-link to="/experience">
        <CtaBtnVue text="Entrer dans l'expérience"/>
      </router-link>
    </div>
  </div>
</template>

<script setup>
  import { onMounted, ref } from 'vue';
  import Circle from '../components/Circle.vue'
  import gsap from 'gsap';
  import CtaBtnVue from '../components/CtaBtn.vue';

  onMounted(() => {
    let introTimeline = gsap.timeline();
    introTimeline.from('.intro__title', {
      duration: 1,
      opacity: 0,
      delay: 0.5,
      ease: 'power4.out',
      onComplete: () => {
      }
    })
    .from('.svg-circle', {
      duration: 1,
      opacity: 0,
      ease: 'power4.out',
    },"-=0.3")
    .to('.intro__title', {
      duration: 1,
      opacity: 0,
      y: -100,
      ease: 'power4.out',
    }, "+=1")
    .to('.intro-text__container', {
      duration: 1,
      opacity: 1,
      ease: 'power4.out',
    }, ">-0.4")
  })
</script>
