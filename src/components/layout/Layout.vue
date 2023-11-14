<script setup lang="ts">
import AppToolbar from "@/components/layout/toolbar/AppToolbar.vue";
</script>

<template>
<div id="app_layout">
  <div id="app_toolbar">
    <AppToolbar/>
  </div>

  <div id="app_router_outlet">
    <RouterView/>
  </div>
</div>
</template>

<style scoped lang="scss">
#app_layout {
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

#app_toolbar {
  width: 100vw;
  height: 7vh;
}

#app_router_outlet {
  width: 100vw;
  height: 93vh;
}
</style>