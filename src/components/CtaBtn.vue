<template>
  <div class="cta-btn font-btn flex align-center">
    {{ text }}
    <ArrowBtn />
  </div>
</template>

<script setup>
  import ArrowBtn from '@/components/ArrowBtn.vue'

  defineProps({
    text: String,
    link: String,
  })
</script>
