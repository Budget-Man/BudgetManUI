<!-- components/TagInput.vue -->
<template>
    <div>
      <el-input
        v-model="inputValue"
        :placeholder="t('setting.memberListPlaceholder')"
        @keyup.enter="addTag"
      />
      <el-space>
        <el-tag
          v-for="(tag, index) in modelValue"
          :key="index"
          closable
          @close="removeTag(index)"
        >
          {{ tag }}
        </el-tag>
      </el-space>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from "vue";
  import { useI18n } from 'vue-i18n';

const { t } = useI18n();
  
  const props = defineProps({
    modelValue: Array, // v-model binding
  });
  
  const emit = defineEmits(["update:modelValue"]);
  
  const inputValue = ref("");
  
  // Add tag when Enter is pressed
  const addTag = () => {
    if (inputValue.value.trim() && !props.modelValue?.includes(inputValue.value)) {
      emit("update:modelValue", [...props.modelValue ??[], inputValue.value.trim()]);
      inputValue.value = ""; // Clear input
    }
  };
  
  // Remove tag
  const removeTag = (index:number) => {
    const newTags = [...props.modelValue ?? []];
    newTags.splice(index, 1);
    emit("update:modelValue", newTags);
  };
  </script>