<script setup lang="ts">
import type {Message} from "@/api/message/message";

export type MessageItemType = "stranger" | "me" | "unknown";

function getMessageAlign(type: MessageItemType): "start" | "end" {
  if (type == "me" || type == "unknown") return "start";
  else if (type == "stranger") return "end";
  throw new Error(`Unknown MessageItemType: ${type}`);
}

const props = defineProps<{type: MessageItemType, message: Message}>();
</script>

<template>
<div class="message-item" :style="{alignItems: getMessageAlign(props.type)}">
  <p class="message-sender">
    {{ props.message.senderName }}
  </p>
  <div class="message-content">
    {{ props.message.content }}
  </div>
  <p class="message-date">
    {{ props.message.sentAt.toDateString() }}
  </p>
</div>
</template>

<style scoped lang="scss">
.message-item {
  padding-top: 15px;
  padding-right: 50px;
  padding-left: 50px;

  display: flex;
  justify-content: left;
  flex-direction: column;
}

.message-content {
  border-radius: 40px;
  background: rebeccapurple;
  padding: 25px;
  color: white;
}

.message-date, .message-sender {
  color: gray;
}
</style>