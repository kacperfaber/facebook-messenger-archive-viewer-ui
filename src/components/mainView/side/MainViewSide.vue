<script setup lang="ts">
import {Api} from "@/api/api";
import {onMounted, ref} from "vue";
import type {Thread} from "@/api/thread/thread";
import Avatar from "primevue/avatar";
import {AppStore} from "@/store/appStore";
let threads = ref<Thread[] | null>(null);

onMounted(() => {
  Api.getAllThreads(1000, 0)
      .then(result => { threads.value = [...result, ...result, ...result, ...result, ...result] })
      .catch(() => alert("Something wrong..."));
});

function onThreadClicked(thread: Thread) {
  AppStore.selectedThread = thread;
}

</script>

<template>
  <div id="app_main_view__side">
    <div id="app_main_view__side__thread_list" v-if="threads != null">
      <div v-bind:key="thread.id" v-for="thread in threads" class="thread-item" @click="onThreadClicked(thread)">
        <div class="thread-avatar">
          <Avatar :label="thread.title.charAt(0)"/>
        </div>

        <div class="thread-content">
          <p class="thread-header">{{thread.title}}</p>
          <p class="thread-subtitle">{{thread.location}}</p>
        </div>
      </div>
    </div>

    <div id="app_main_view__side__loading_threads" v-if="threads == null">
      <h5>Loading...</h5>
    </div>
  </div>
</template>

<style scoped lang="scss">
#app_main_view__side {
  border-right: 1px solid rgba(255, 255, 255, .75);
  width: 100%;
  height: 100%;
}

#app_main_view__side__thread_list {
  width: 100%;
  height: 100%;
  overflow-y: auto;
}

.thread-item {
  width: 100%;

  padding: 25px;

  display: flex;
  align-items: center;
  justify-content: left;

  background: rgba(255, 255, 255, 0);
}

.thread-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.thread-content {
  p {
    margin-top: 0;
    margin-bottom: 0;
  }
  margin-left: 25px;
}

.thread-subtitle {
  color: gray;
  margin-bottom: 0;
}

</style>