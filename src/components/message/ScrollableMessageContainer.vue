<script setup lang="ts">
import MessageList from "@/components/message/MessageList.vue";
import {ref, watch} from "vue";
import {Api} from "@/api/api";
import type {Message} from "@/api/message/message";
import type {Thread} from "@/api/thread/thread";

type MessagePage = {
  page: number,
  messages: Message[]
};

const props = defineProps({threadId: Number});

let messagePages = ref<MessagePage[]>([]);
let thread = ref<Thread | null>(null);

function initializeThread() {
  Api.getAllThreads(1000, 0).then(threads => threads.find(x => x.id == props.threadId))
      .then(t => thread.value = t);
}

function refresh() {
  Api.getMessagesPaginated(props.threadId, 25, messagePages.value.length)
      .then(pagination => messagePages.value.push({messages: pagination.items, page: pagination.page}));
}

function onScroll(event: Event) {
  if ((event.target as HTMLElement).scrollTop == 0) {
    refresh();
  }
}

watch(() => props.threadId, () => {
  messagePages.value = [];
  thread.value = null;
  initializeThread();
  refresh();
});

refresh();

</script>

<template>
  <div class="scrollable-message-container" @scroll="onScroll">
    <div v-bind:key="`message-page-${messagePage.page}`" v-for="messagePage in messagePages.sort((a, b) => b.page - a.page)">
      <MessageList v-if="thread" :messages="messagePage.messages" :thread="thread"/>
    </div>
  </div>
</template>

<style scoped lang="scss">
.scrollable-message-container {
  height: 93vh;
  overflow-y: scroll;
}
</style>