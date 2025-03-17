<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import chat from "./views/Chat/Index.vue";
import Cookies from "js-cookie";
// import LayoutElement from './Layouts/LayoutElement.vue'

const isAuthenticated: boolean = !!Cookies.get("accessToken");
</script>

<template>
  <RouterView></RouterView>
  <chat v-if="isAuthenticated" />
</template>

<style scoped></style>
