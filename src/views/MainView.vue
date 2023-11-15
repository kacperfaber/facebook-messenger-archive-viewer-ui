<script setup lang="ts">

import MainViewSide from "@/components/mainView/side/MainViewSide.vue";
import MainViewContent from "@/components/mainView/content/MainViewContent.vue";
</script>

<template>
  <div id="app_main_view">
    <div id="app_main_view__side">
      <MainViewSide/>
    </div>

    <div id="app_main_view__content">
      <MainViewContent/>
    </div>
  </div>
</template>

<style scoped lang="scss">

#app_main_view {
  display: flex;
  justify-content: center;
  align-items: center;
}

#app_main_view__side {
  height: 100%;
  width: 20vw;
}
</style>