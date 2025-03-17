<template>
  <div class="chat-input box full flex-col">
    <ImagesPaste :imagesPasteEvent="imagesPasteEvent" v-model:images="images" />
    <textarea
      v-model="message"
      placeholder="What’s on your mind?"
      @keydown.enter.exact.prevent="sendMessage"
      @keydown.shift.enter.prevent="newLine"
      @paste="sendImagesPasteEvent"
      rows="2"
    ></textarea>

    <!-- <button @click="sendMessage">Send</button> -->
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ImagesPaste from "./ImagesPaste.vue";

const message = ref("");
const images = ref([]);
const emit = defineEmits(["send"]);

const sendMessage = () => {
  if (message.value.trim() !== "" || images.value.length) {
    emit("send", { message: message.value.trim(), images: images.value });
    message.value = ""; // Clear input after sending
    images.value = [];
  }
};

const newLine = () => {
  message.value += "\n";
};

const imagesPasteEvent = ref("");

const sendImagesPasteEvent = (event) => {
  imagesPasteEvent.value = event;
};
</script>

<style scoped>
.chat-input {
  display: flex;
  align-items: stretch; /* Ensures all elements have the same height */
  gap: 10px;
  background: #f9f9f9;
  border-radius: 8px;
}

textarea {
  flex: 1;
  resize: none;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  height: 40px; /* Fixed height */
}

button {
  background: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  height: 40px; /* Same height as textarea */
}

button:hover {
  background: #0056b3;
}
</style>
