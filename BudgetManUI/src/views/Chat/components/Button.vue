<template>
  <div
    :class="`box cursor-pointer flex-col avatar-chat flex bg-fade`"
    @mouseover="hover = true"
    @mouseleave="hover = false"
    @click="openChat"
  >
    <avatarBot box-class="flex button" />
    <div :class="`${hover ? 'display absolute box bg-light' : 'hide'} `">
      <div
        :class="`${
          hover
            ? 'popup-animation display box flex  justify-center'
            : 'hide'
        } `"
      >
        <img :src="waveHand" :style="{ width: '46px', height: '46px',display:'flex', marginTop:'6px' }" />
        <p>{{$t('message.hi-there')}}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import waveHand from "@/assets/images/hand-wave.png";
import avatarBot from "./AvatarBot.vue";
import { fa } from "element-plus/es/locale/index.js";

const emit = defineEmits(["open-chat"]);

const openChat = () => {
  emit("open-chat");
};

const hover = ref(false);
</script>
