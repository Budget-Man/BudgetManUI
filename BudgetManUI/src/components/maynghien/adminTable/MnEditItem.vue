<template>
    open: {{ openDialog }}
    <el-button text @click="dialogVisible = true">
        click to open the Dialog
    </el-button>
    <el-dialog v-model="dialogVisible" title="Tips" width="30%">
        <div class="editform">
            <div v-for="column in columns" :key="column.key">
                <div v-if="column.enableEdit == true">
                    <!-- Use double curly braces to bind variable values in templates -->
                    <label>{{ column.key }}</label>
                    <el-input v-model="model[column.key]" :placeholder="column.key" />
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
        </template>
    </el-dialog>
</template>
  
<script setup lang="ts">
import { ref, type Ref, computed, watch,provide  } from 'vue';
// @ts-ignore
import { ElMessage } from 'element-plus';
// @ts-ignore
import { handleCreate, handleUpdate } from './Service/BasicAdminService.ts'
import type { TableColumn } from './Models/TableColumn';
const emit = defineEmits<{
    (e: 'onSaved'): void;
    (e: 'onCloseClicked'): void;

}>()
const { columns, editItem, apiName, isEdit, openDialog } = defineProps<{
    columns: TableColumn[];
    editItem: SearchDTOItem | undefined;
    apiName: string;
    isEdit: boolean;
    openDialog: boolean;
}>();
// Use computed to create a filtered model
const model = computed(() => {
    const filteredModel: SearchDTOItem = {};

    for (const column of columns) {
        if (column.enableEdit) {
            filteredModel[column.key] = editItem ? editItem[column.key] : '';
        }
    }

    return filteredModel;
});
const dialogVisible = ref(openDialog);
const Validate = (): boolean => {

    columns.forEach(column => {
        if (column.enableEdit) {
            const value = model.value[column.key];
            if (column.key == "id" && isEdit) {
                if (value == undefined)
                    return false;
            }
            if (column.required && (value == undefined || value == "")) {
                return false;
            }
        }

    });

    return true;
}
const Save = async () => {
    const valid = Validate();
    if (valid) {
        if (isEdit == true) {
            var editresult = await handleUpdate(model.value, apiName);
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
        else {
            var createresult = await handleCreate(model.value, apiName);
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
    }
    emit("onSaved");
}

const OpenDialog=()=>{
    dialogVisible.value=true;
}
provide('OpenDialogEditItem', OpenDialog);
</script>
  