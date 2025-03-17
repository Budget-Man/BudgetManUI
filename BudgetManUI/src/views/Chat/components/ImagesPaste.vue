<template>
  <div class="container box images scroll" v-if="images.length">
    <imagesGallery :visibleImages="visibleImages" :images="images">
      <template #delete>
        <button class="delete-btn" @click="removeImage(index)">✖</button>
      </template>
    </imagesGallery>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import imagesGallery from "./ImagesGallery.vue";

const images = ref([]); // Stores multiple images
const visibleImages = ref([]); // Tracks which images are visible

const props = defineProps(["imagesPasteEvent", "images"]);

const emits = defineEmits(["sendImages", "update:images"]);

watch(
  () => props.imagesPasteEvent,
  (imagesPasteEvent) => {
    handlePaste(imagesPasteEvent);
  }
);

const handlePaste = (event) => {
  const items = event.clipboardData?.items;
  if (!items) return;

  for (const item of items) {
    if (item.type.startsWith("image")) {
      const file = item.getAsFile();
      const reader = new FileReader();
      reader.onload = (e) => {
        images.value.push(e.target.result);
        const index = images.value.length - 1;
        visibleImages.value.push(index);
      };
      reader.readAsDataURL(file);
    }
  }
};

watch(images.value, () => {
  emits("update:images", images.value);
});

watch(
  () => props.images,
  (newValue) => {
    images.value = newValue;
  }
);
const removeImage = (index) => {
  images.value.splice(index, 1);
  visibleImages.value = visibleImages.value.filter((i) => i !== index);
};
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

.delete-btn {
  position: absolute;
  top: -5px;
  right: -5px;
  background: red;
  color: white;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 14px;
  cursor: pointer;
}

/* Fade Effect */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
