<script setup lang="ts">
import ScrollableMessageContainer from "@/components/message/ScrollableMessageContainer.vue";
import {AppStore} from "@/store/appStore";
</script>

<template>
  <div v-if="!AppStore.selectedThread" class="no-thread-selected">
    <h5>No thread selected.</h5>
    <p>Choose one</p>
  </div>
<ScrollableMessageContainer v-if="AppStore.selectedThread" :thread-id="AppStore.selectedThread?.id"/>
</template>

<style scoped lang="scss">
.no-thread-selected {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  height: 100%;
  width: 100%;
}
</style>