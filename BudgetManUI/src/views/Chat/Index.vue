<script setup lang="ts">
import { ref } from "vue";
import buttonChat from "./components/Button.vue";
import chat from "./components/Chat.vue";

const openChat = ref(false);
</script>

<template>
  <div class="float">
    <button-chat
      @open-chat="openChat = true"
      :class="`${openChat ? 'hide' : 'display'}`"
    />
    <chat
      :class="`${openChat ? 'display popup-animation box-chat' : 'hide'}`"
      @close-chat="openChat = false"
    />
  </div>
</template>
