<template>
  <div :class="`box ${boxClass}`">
    <div :class="`avatar`">
      <img :src="image" />
    </div>
    <slot name="implement"></slot>
  </div>
</template>

<script setup lang="ts">
const { image = "", boxClass = "" } = defineProps<{
  image: string;
  boxClass?: string;
}>();
</script>
