<template>
    <div>
      <button @click="openEditDialog">Open Edit Dialog</button>
      <edit-dialog
        :dialogVisible="editDialogVisible"
        :dialogTitle="editDialogTitle"
        @update:dialogVisible="editDialogVisible = $event"
      ></edit-dialog>
    </div>
  </template>
  
  <script lang="ts" setup>
  import {  ref } from 'vue';
  import EditDialog from './EditDialog.vue';
  
 
      const editDialogVisible = ref(false);
      const editDialogTitle = ref('Edit Item');
  
      const openEditDialog = () => {
        editDialogVisible.value = true;
      };
  
     
  </script>
  