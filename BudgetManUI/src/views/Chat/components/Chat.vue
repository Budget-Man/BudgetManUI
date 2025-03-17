<template>
  <div class="box bg-light chat flex flex-col overflow-hidden">
    <div class="box flex full row-reverse cursor-pointer" @click="closeChat">
      <img :src="closeIcon" :style="{ width: '32px', aspectRatio: 1 }" />
    </div>
    <div class="avatar-chat box padding flex flex-col full">
      <avatar-bot box-class="chat-assistant flex full"></avatar-bot>
      <p class="text separate box full">Nice assistant</p>
    </div>

    <chat-list :messages="messages" />

    <div class="avatar-chat box flex padding full items-end">
      <send class="send" @send="handleSend" />
      <!-- <avatar image="" box-class="chat-user"> </avatar> -->
    </div>
  </div>
</template>
<script setup lang="ts">
import avatarBot from "./AvatarBot.vue";
import send from "./Send.vue";
import closeIcon from "../../../assets/images/close-btn-icon.png";

import chatList from "./ChatList.vue";
import { ref } from "vue";
import { sendRequestMessage } from "../api/sendRequestMessage";
import { dayjs } from "element-plus";

const emit = defineEmits(["close-chat"]);

const closeChat = () => {
  emit("close-chat");
};

const messages = ref<Messages>([]);

const handleSend = async ({
  message,
  images,
}: {
  message: string;
  images: unknown[];
}) => {
  const timeOfMessage = () => dayjs(new Date()).format("HH:mm A");
  const list = [...messages.value];

  const messageFromUser = {
    text: message,
    time: timeOfMessage(),
    sender: "me",
    images,
  };

  const messageFromChatbot = ({
    loading,
    message,
    time,
  }: {
    loading: boolean;
    message: string;
    time: string;
  }) => {
    return {
      text: message,
      time,
      sender: "other",
      loading,
    };
  };

  messages.value.unshift(messageFromUser);

  let chatbotResponse = "";

  setTimeout(() => {
    if (!chatbotResponse) {
      messages.value.unshift(
        messageFromChatbot({
          loading: true,
          message: "give me a second bae",
          time: timeOfMessage(),
        })
      );
    }
  }, 250);

  chatbotResponse = await sendRequestMessage({
    message,
    images,
  });

  list.unshift(
    messageFromChatbot({
      loading: false,
      message: chatbotResponse,
      time: timeOfMessage(),
    }),
    messageFromUser
  );
  messages.value = list;
};

export type Message = {
  text: string;
  time: string;
  sender: string;
  loading?: boolean;
  images?: unknown[];
};

export type Messages = Message[];
</script>
