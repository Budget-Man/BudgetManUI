<template>
    <el-dialog :model-value="openDialog" :title="(isEdit ?  $t('edit') :  $t('create') ) +' '+ title" class="form-dialog" width="30%"
        @close="emit('onCloseClicked')" open-auto-focus	@opened="focusInput" ref="dialogRef">

        <div class="editform" v-if="model != undefined" ref="editFormRef">
            <div v-for="column in columns" :key="column.key">
                <div v-if="(isEdit && column.enableEdit == true) || (!isEdit && column.enableCreate == true)">
                    <!-- Use double curly braces to bind variable values in templates -->
                    <label>{{ column.label }}</label>

                    <el-input v-model="model[column.key]" :placeholder="column.label"
                        v-if="column.inputType == undefined || column.inputType == 'text'"
                        :type="column.inputType" />
                    
                    <el-input-number v-model="model[column.key]" :placeholder="column.label"
                        v-if="column.inputType == 'number'"
                        :type="column.inputType" controls-position="right"/>

                    <MnDropdown v-if="column.inputType == 'dropdown'" :column="column" @changed="handleUpdateValue"
                        v-model="model[column.key]">
                    </MnDropdown>

                    <el-input-currency v-if="column.inputType == 'currency'" v-model="model[column.key]" :placeholder="column.label"></el-input-currency>
                </div>

            </div>

        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="emit('onCloseClicked')">{{ $t('cancel') }}</el-button>
                <el-button type="primary" @click="Save">
                    {{ $t('confirm') }}
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>
  
<script setup lang="ts">
import { ref, toRefs, computed, watch, inject, onMounted } from 'vue';
// @ts-ignore
import { ElMessage, ElInput, ElLoading } from 'element-plus';
// @ts-ignore
import { handleAPICreate, handleAPIUpdate } from './Service/BasicAdminService.ts'
import type { TableColumn } from './Models/TableColumn';
// @ts-ignore
import MnDropdown from './Input/MnDropdown.vue';
// @ts-ignore
import { SearchDTOItem } from './Models/SearchDTOItem.ts';
import {useI18n} from 'vue-i18n';
// @ts-ignore
import elInputCurrency from '@/components/el-input-currency.vue'

const {t} = useI18n();
const emit = defineEmits<{
    (e: 'onSaved'): void;
    (e: 'onCloseClicked'): void;

}>()
const props = defineProps<{
    columns: TableColumn[];
    editItem: SearchDTOItem;
    apiName: string;
    createUrl?: string;
    editUrl?: string;
    isEdit: boolean;
    openDialog: boolean;
    title: string;
}>();
// Use computed to create a filtered model
const model = ref<SearchDTOItem>(props.editItem);

const dialogRef = ref()

const Validate = (): any => {
    if (model != undefined)
        for (const column of props.columns) {
            if (column.enableEdit) {
                const value = model.value[column.key];
                if (column.key == "id" && props.isEdit) {
                    if (value == undefined)
                        return column;
                }
                // console.log("Validate:");
                // console.log(column);
                // console.log(value);
                if (column.required && (value == undefined || value == "" || ((column.inputType=="number" || column.inputType=="currency") && value == 0))) {
                    // console.log("false");
                    return column;
                }
                //console.log("true");
            }

        }
    else return false;

    // console.log("validate true");
    return true;
}
const isLoading = ref(false)

const Save = async () => {
    if (isLoading.value) return
    isLoading.value = true;
    const valid = Validate();
    // console.log(valid);
    if (valid === true) {
        //set loading screen for dialog
        const loadingScreen = ElLoading.service({
            target:  dialogRef.value!=null ? dialogRef.value.$el.nextElementSibling.querySelector('.el-dialog') : null
        })
        if (props.isEdit == true && props.editItem != undefined) {
            const editUrl = props.apiName + (props.editUrl != undefined ? "/" + props.editUrl : "");
            var editresult = await handleAPIUpdate(props.editItem, editUrl);
            if (editresult.isSuccess) {
                ElMessage({
                    message: t('data-updated'),
                    type: 'success',
                });
            }
            else {
                ElMessage.error(t('update-failed'));
                return;
            }
        }
        else if (props.editItem != undefined) {
            const createUrl = props.apiName + (props.createUrl != undefined ? "/" + props.createUrl : "");
            var createresult = await handleAPICreate(props.editItem, createUrl);
            if (createresult.isSuccess) {
                ElMessage({
                    message: t('data-created'),
                    type: 'success',
                });
            }
            else {
                ElMessage.error(t('create-failed'));
                return;
            }
        }
        emit("onSaved");
        isLoading.value = false;
        loadingScreen.close()
    }
    else if (valid !== false) {
        ElMessage.error(t('field-valid-false',{val:valid.label}));
    }
    else {
        ElMessage.error(t('valid-failed'));
    }
}
const handleUpdateValue = (key: string, value: string): void => {
    model.value[key] = value;
    // console.log(model.value[key]);
}

watch(() => props.editItem, () => {
    model.value = props.editItem;
}, { immediate: true })

const editFormRef = ref();
const focusInput = () => {
    const inputsList = editFormRef.value.querySelectorAll('input');
    // console.log(inputsList);
    for (let i=0; i< inputsList.length; i++){
        // console.log(inputsList[i].value);
        if (inputsList[i].value=== undefined || inputsList[i].value === ''){
            inputsList[i].focus();
            break;
        }
    }
  }
onMounted(() => {
    document.addEventListener( "keypress", handleKeypress );
});
const handleKeypress = (event : KeyboardEvent) => {
//   console.log(event.key);
    if(props.openDialog){
  // Check if the key pressed is the Enter key (key code 13)
        if (event.key === 'Enter') {
            Save()
        }
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