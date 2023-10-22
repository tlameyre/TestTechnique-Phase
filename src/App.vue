<template>
  <router-view v-slot="{ Component }">
    <component :is="Component" />
  </router-view>
</template>

<style lang="scss" scoped>

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.header-menu {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
  * {
    color: white;
    font-size: 24px;
    font-weight: 600;
  }
}
</style>


