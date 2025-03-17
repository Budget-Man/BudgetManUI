<template>
  <div class="box padding flex flex-col full chat scroll">
    <chat-message
      v-for="(msg, index) in messages"
      :key="index"
      :message="msg"
      :isMine="msg.sender === 'me'"
    />
  </div>
</template>

<script setup lang="ts">
import ChatMessage from "./ChatMessage.vue";
import type { Messages } from "./Chat.vue";

const { messages } = defineProps<{ messages: Messages }>();
</script>
