<template>
  <avatar :image="budManLogo" :box-class="boxClass">
    <template #implement>
      <p style="padding-right: 1em;">{{ $t('message.start') }}</p>
    </template>
  </avatar>
</template>

<script setup lang="ts">
import avatar from "./Avatar.vue";
import budManLogo from "../../../assets/budget-logo.png";

const { boxClass = "" } = defineProps<{ boxClass?: string }>();
</script>
