<script setup lang="ts">
import type {Message} from "@/api/message/message";
import MessageItem from "@/components/message/MessageItem.vue";
import type {MessageItemType} from "@/components/message/messageItemType";
import type {Thread} from "@/api/thread/thread";
const props = defineProps<{thread: Thread, messages: Array<Message>}>();

function getMessageItemTypeFor(message: Message): MessageItemType {
  if (props.thread.type == "GROUP") {
      return "unknown";
  }

  if (message.senderName == props.thread.title) {
    return "stranger";
  }

  return "me";
}
</script>

<template>
<div v-if="props.messages">
  <div v-bind:key="`message-item-${message.id}-${message.senderName}`" v-for="message in props.messages">
    <MessageItem v-if="message" :message="message" :type="getMessageItemTypeFor(message)"/>
  </div>
</div>
</template>

<style scoped lang="scss">

</style>