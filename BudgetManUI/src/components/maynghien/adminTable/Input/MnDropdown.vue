<template>
<el-select v-bind="colValue" class="m-2" placeholder="Select" size="large" @change="dropdownChange"
  >
    <el-option
      v-for="item in column.dropdownData.data"
      :key="item[column.dropdownData.keyMember]"
      :label="item[column.dropdownData.displayMember]"
      :value="item[column.dropdownData.keyMember]"
    />
  </el-select>
</template>

<script setup lang="ts">
// @ts-ignore
import { TableColumn } from '@/components/maynghien/adminTable/Models/TableColumn.ts';
// @ts-ignore
import { SearchDTOItem } from '@/components/maynghien/adminTable/SearchDTOItem.ts';

    const props  = defineProps<{
    column: TableColumn;
    colValue: string;
    
}>();
const emit = defineEmits<{
    (e: 'update:colValue',value:string): void;

}>();
const dropdownChange=(value:any):void=>{
  console.log("changed")
  console.log(value);
  emit('update:colValue', value);
}

</script>