<template>
  <div :class="['chat-message box full', isMine ? 'mine' : 'other']">
    <div v-if="message.loading" class="message-bubble">
      <loading />
    </div>
    <imagesGallery :images="message.images" />
    <div v-if="!message.loading" class="message-bubble">
      <p>{{ message.text }}</p>
      <span class="timestamp">{{ message.time }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Message } from "./Chat.vue";
import loading from "./Loading.vue";
import imagesGallery from "./ImagesGallery.vue";

const { isMine, message } = defineProps<{
  message: Message; // { text: 'Hello!', time: '12:30 PM', sender: 'me' }
  isMine: Boolean;
}>();
</script>

<style scoped>
.chat-message {
  display: flex;
  flex-direction: column;

  margin: 8px 0;
}

.mine {
  align-items: end;
}

.message-bubble {
  max-width: 70%;
  padding: 10px;
  border-radius: 12px;
  background: #f1f1f1;
  position: relative;
  width: fit-content;
}

.mine .message-bubble {
  background: #007bff;
  color: white;
}

.timestamp {
  display: block;
  font-size: 10px;
  text-align: right;
  margin-top: 5px;
  opacity: 0.7;
}
</style>
