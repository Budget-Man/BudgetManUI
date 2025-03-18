<template>
  <div class="gallery">
    <div
      v-for="(image, index) in images"
      :key="index"
      class="image-wrapper"
      v-show="visibleImages ? visibleImages.includes(index) : true"
    >
      <img :src="image" alt="Pasted Image" class="preview" />
      <slot name="delete" :index="index"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps(["visibleImages", "images"]);
</script>
<style scoped>
.container {
  cursor: pointer;
}

.gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}

.image-wrapper {
  position: relative;
  display: inline-block;
}

.preview {
  max-width: 100px;
  height: auto;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
