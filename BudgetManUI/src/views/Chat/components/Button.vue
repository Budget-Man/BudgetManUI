<template>
  <div
    :class="`box cursor-pointer flex-col avatar-chat flex padding ${
      hover ? 'bg-light' : 'bg-fade'
    }`"
    @mouseover="hover = true"
    @mouseleave="hover = false"
    @click="openChat"
  >
    <avatarBot box-class="flex button" />
    <div :class="`${hover ? 'display absolute box bg-fade' : 'hide'} `">
      <div
        :class="`${
          hover
            ? 'popup-animation display padding box flex padding justify-center'
            : 'hide'
        } `"
      >
        <img :src="waveHand" :style="{ width: '46px', height: '46px' }" />
        <p>Hi there!</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import waveHand from "@/assets/images/hand-wave.png";
import avatarBot from "./AvatarBot.vue";

const emit = defineEmits(["open-chat"]);

const openChat = () => {
  emit("open-chat");
};

const hover = ref(false);
</script>
