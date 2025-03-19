<template>
    <el-dialog :model-value="openDialog" :title="(isEdit ?  $t('edit') :  $t('create') ) +' '+ title" class="form-dialog me"
        @close="emit('onCloseClicked')" open-auto-focus	@opened="focusInput" ref="dialogRef">

        <div class="editform" v-if="model != undefined" ref="editFormRef">
            <div v-for="column in columns" :key="column.key">
                <div v-if="column.hidden != true && ((isEdit && column.enableEdit == true) || (!isEdit && column.enableCreate == true))">
                    <!-- Use double curly braces to bind variable values in templates -->
                    <label>{{ column.label }}</label>

                    <el-input v-model="model[column.key]" :placeholder="column.label"
                        v-if="column.inputType == undefined || column.inputType == 'text'"
                        :type="column.inputType" :disabled="column.isReadonly" />
                    
                    <el-input-number v-model="model[column.key]" :placeholder="column.label"
                        v-if="column.inputType == 'number'"
                        :type="column.inputType" controls-position="right" :disabled="column.isReadonly"/>

                    <MnDropdown v-if="column.inputType == 'dropdown'" :column="column" @changed="handleUpdateValue"
                        v-model="model[column.key]" :disabled="column.isReadonly" >
                    </MnDropdown>

                    <el-input-currency v-if="column.inputType == 'currency'" v-model="model[column.key]" :placeholder="column.label"></el-input-currency>

                    <input-amount-detail v-if="column.inputType == 'amount-detail'" v-model:amount="model[column.key]" :placeholder="column.label" 
                    v-model:details="model['details']"></input-amount-detail>
                </div>

            </div>

        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button style="margin: 0;"  @click="emit('onCloseClicked')" :icon="Close">{{ $t('cancel') }}</el-button>
                <el-button style="margin: 0;"  v-if="enableDelete" :icon="Delete" type="danger"
                        @click="handleDelete($event)">{{ $t('delete') }}</el-button>
                <el-button style="margin: 0;"  type="primary" @click="Save" :icon="Check">
                    {{ $t('confirm') }}
                </el-button>
            </span>
        </template>
    </el-dialog>
    <ConfirmPopup></ConfirmPopup>
</template>
  
<script setup lang="ts">
import { ref, toRefs, computed, watch, inject, onMounted } from 'vue';
import {
    Check,
    Delete,
    Edit,
    Message,
    Search,
    Star,
    Plus,
    Close,
} from '@element-plus/icons-vue';
// @ts-ignore
import { ElMessage, ElInput, ElLoading } from 'element-plus';
// @ts-ignore
import { handleAPICreate, handleAPIUpdate, handleAPIDelete } from './Service/BasicAdminService.ts'
import type { TableColumn } from './Models/TableColumn';
// @ts-ignore
import MnDropdown from './Input/MnDropdown.vue';
// @ts-ignore
import { SearchDTOItem } from './Models/SearchDTOItem.ts';
import {useI18n} from 'vue-i18n';
// @ts-ignore
import elInputCurrency from '@/components/el-input-currency.vue'
// @ts-ignore
import inputAmountDetail from '@/components/input-amount-detail.vue'
// @ts-ignore
import type { MoneyDetailDto } from "@/Models/Dtos/MoneyDetailDto";
// import ConfirmDialog from 'primevue/confirmdialog';
import { useConfirm } from "primevue/useconfirm";
import ConfirmPopup from 'primevue/confirmpopup';
const confirm = useConfirm();

const {t} = useI18n();
const emit = defineEmits<{
    (e: 'onSaved'): void;
    (e: 'onCloseClicked'): void;
    (e: 'onDeleted'): void;
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
    enableDelete?: boolean;
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
                console.log(column.inputType);
                // console.log(value);
                if (column.required && (value == undefined || value == "" || 
                    ((column.inputType=="number" || column.inputType=="currency" || column.inputType=="amount") && value == 0))) {
                    // console.log("false");
                    return column;
                }
                else
                if (column.inputType == "details")
                {
                    console.log(column.label)
                    if (model.value[column.key]!= undefined){
                        let array = model.value[column.key] as Array<MoneyDetailDto>
                        for (const i of array){
                            if (i.reason == undefined || i.reason.trimEnd() == "")
                                return column;
                        }
                    }
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
        console.log(props.editItem)
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
                loadingScreen.close()
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
        loadingScreen.close()
    }
    else if (valid !== false) {
        ElMessage.error(t('field-valid-false',{val:valid.label}));
    }
    else {
        ElMessage.error(t('valid-failed'));
    }
    isLoading.value = false;
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
    // console.log(props.columns)
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
const handleDelete = async (event: Event) => {
    // console.log(event.currentTarget)
    // emit("onDelete")
    confirm.require({
        target: event.currentTarget as HTMLElement | undefined,
        message: t("delete-confirm"),
        // header: "Danger Zone",
        icon: "pi pi-info-circle",
        rejectLabel: t("cancel"),
        acceptLabel: t("delete"),
        rejectClass: "p-button-secondary p-button-outlined",
        acceptClass: "p-button-danger",
        accept: async () => {
            //set loading screen for dialog
            const loadingScreen = ElLoading.service({
                target:  dialogRef.value!=null ? dialogRef.value.$el.nextElementSibling.querySelector('.el-dialog') : null
            })
            var deleteresult = await handleAPIDelete(props.editItem.id, props.apiName);
            if (deleteresult.isSuccess) {
                ElMessage({
                message: t("row-deleted"),
                type: "success",
                });

                emit("onDeleted")
            } else {
                ElMessage({
                message: t("deleted-error"),
                type: "error",
                });
                
            }
            loadingScreen.close()
        },
        reject: () => {
        // toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });
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
.form-dialog .dialog-footer{
    display: flex;
    justify-content: start;
    flex-wrap: wrap;
    gap:6px;
    
}
</style>