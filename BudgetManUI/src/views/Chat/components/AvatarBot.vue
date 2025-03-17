<template>
  <avatar :image="budManLogo" :box-class="boxClass">
    <template #implement>
      <p>Budman</p>
    </template>
  </avatar>
</template>

<script setup lang="ts">
import avatar from "./Avatar.vue";
import budManLogo from "../../../assets/budget-logo.png";

const { boxClass = "" } = defineProps<{ boxClass?: string }>();
</script>
