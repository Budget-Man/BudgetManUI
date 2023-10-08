<template>
    <el-dialog :model-value="openDialog" title="Tips" class="form-dialog" width="30%" @close="emit('onCloseClicked')">

        <div class="editform" v-if="model != undefined">
            <div v-for="column in columns" :key="column.key">
                <div v-if="column.enableEdit == true">
                    <!-- Use double curly braces to bind variable values in templates -->
                    <label>{{ column.label }}</label>

                    <el-input v-model="model[column.key]" :placeholder="column.label"
                        v-if="column.inputType == undefined || column.inputType == 'text'" />
                    <!-- <MnDropdown v-if="column.inputType == 'dropdown'" :column="column" :colValue="model[column.key]">
                    </MnDropdown> -->
                </div>

            </div>

        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="emit('onCloseClicked')">Cancel</el-button>
                <el-button type="primary" @click="Save">
                    Confirm
                </el-button>
            </span>
            {{ model }}
        </template>
    </el-dialog>
</template>
  
<script setup lang="ts">
import { ref, toRefs , computed, watch, inject } from 'vue';
// @ts-ignore
import { ElMessage,ElInput } from 'element-plus';
// @ts-ignore
import { handleCreate, handleUpdate } from './Service/BasicAdminService.ts'
import type { TableColumn } from './Models/TableColumn';
import MnDropdown from './Input/MnDropdown.vue';
// @ts-ignore
import { SearchDTOItem } from './Models/SearchDTOItem.ts'
const emit = defineEmits<{
    (e: 'onSaved'): void;
    (e: 'onCloseClicked'): void;

}>()
const { columns, editItem, apiName, isEdit, openDialog } = defineProps<{
    columns: TableColumn[];
    editItem: SearchDTOItem ;
    apiName: string;
    isEdit: boolean;
    openDialog: boolean;
}>();
// Use computed to create a filtered model
const model = ref(editItem);
const Validate = (): boolean => {
    if (editItem != undefined)
        columns.forEach(column => {
            if (column.enableEdit) {
                const value = editItem[column.key];
                if (column.key == "id" && isEdit) {
                    if (value == undefined)
                        return false;
                }
                if (column.required && (value == undefined || value == "")) {
                    return false;
                }
            }

        });
        else return false;
    return true;
}
const Save = async () => {
    const valid = Validate();
    if (valid) {
        if (isEdit == true && editItem != undefined) {
            var editresult = await handleUpdate(editItem, apiName);
            if (editresult.isSuccess) {
                ElMessage({
                    message: 'data Updated.',
                    type: 'success',
                });
            }
            else {
                ElMessage.error('Update failed.');
                return;
            }
        }
        else if(editItem!=undefined) {
            var createresult = await handleCreate(editItem, apiName);
            if (createresult.isSuccess) {
                ElMessage({
                    message: 'data Created.',
                    type: 'success',
                });
            }
            else {
                ElMessage.error('Create failed.');
                return;
            }
        }
        emit("onSaved");
    }
   else{
    ElMessage.error('valid failed.');
   }
}
const updateColValue=(colName:string,value:string):void=>{
    //model.value[colName]=value;
    console.log(model.value);
}
</script>

<style>
.form-dialog {
    margin-top: 0;
    margin-right: 0;
    height: 100%;
}
</style>