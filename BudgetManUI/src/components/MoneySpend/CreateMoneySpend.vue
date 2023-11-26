<template>
    <el-dialog :model-value="openDialog" title="Create Money spend" class="form-dialog" width="50%"
        @close="emit('onCloseClicked')">

        <div class="editform" v-if="model != undefined">
            <div>
                
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
import { ref, toRefs, computed, watch, inject } from 'vue';
// @ts-ignore
import { ElMessage, ElInput } from 'element-plus';
// @ts-ignore
import { handleAPICreate, handleAPIUpdate } from './Service/BasicAdminService.ts'

// @ts-ignore
import { SearchDTOItem } from './Models/SearchDTOItem.ts';
import { CreateMoneySpendRequest } from '../../Models/Request/MoneySpend/CreateMoneySpendRequest';
const emit = defineEmits<{
    (e: 'onSaved'): void;
    (e: 'onCloseClicked'): void;

}>()
const props = defineProps<{
    
    openDialog: boolean;
}>();
// Use computed to create a filtered model
const model = ref<CreateMoneySpendRequest>();
const Validate = (): boolean => {
   
    return true;
}
const Save = async () => {
    const valid = Validate();
    if (valid) {
        
            var editresult = await handleAPIUpdateMoneySpend(model);
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
        
        emit("onSaved");
    }
    else {
        ElMessage.error('valid failed.');
    }
}


</script>

<style>
.form-dialog {
    margin-top: 0;
    margin-right: 0;
    height: 100%;
}

.editform .el-select {
    width: 100%;
}
</style>