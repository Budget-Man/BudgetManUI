


<template>
    <div>
        <el-table class="admin-table" :data="datas" @sort-change="handleSortChange" border row-key="id" table-layout="fixed"
            @row-click="handleRowClick" >
            <el-table-column v-for="column in shownCol" :key="column.key" :prop="column.key" :label="column.label"
                :sortable="column.sorable ? 'custom' : 'false'" :visible="column.hidden == false" />
            <el-table-column width="248" :label="$t('operations')" v-if="enableDelete || enableEdit">
                <template #default="scope" >
                    <div style="display: flex; flex-wrap: wrap;gap:2px;justify-content: start;">

                        <el-button style="margin: 0;" v-if="enableEdit" :icon="Edit" size="small"
                            @click="handleEdit(scope.$index, scope.row)">{{ $t('edit') }}</el-button>
                        <el-button style="margin: 0;" v-if="enableDelete" :icon="Delete" size="small" type="danger"
                            @click="handleDelete(scope.$index, scope.row, $event)">{{ $t('delete') }}</el-button>
                        <el-button style="margin: 0;" v-for="action in CustomActions" :icon="action.Icon" size="small" :key="action.ActionName"
                            @click="handleCustomAction(scope.$index, scope.row, action)">{{ action.ActionLabel }}</el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>

    </div>
</template>
  
<script setup lang="ts">
// @ts-ignore
import { TableColumn } from '../Models/TableColumn.ts'
// @ts-ignore
import { SearchDTOItem } from '../Models/SearchDTOItem.ts'
import { ref, watch } from 'vue';
import {
    Check,
    Delete,
    Edit,
    Message,
    Search,
    Star,
    Plus,
} from '@element-plus/icons-vue';
import { CustomActionResponse, type CustomAction } from './Models/CustomAction';
import { handleAPICustom } from './Service/BasicAdminService';

const props = defineProps<{
    columns: TableColumn[];
    datas: SearchDTOItem[];
    enableEdit: boolean;
    enableDelete: boolean;
    CustomActions: CustomAction[];

}>();
const emit = defineEmits<{
    (e: 'onEdit', item: SearchDTOItem): void;
    (e: 'onDelete', item: SearchDTOItem, target: EventTarget | null): void;
    (e: 'onCustomAction', item: CustomActionResponse): void;
    (e: 'onSortChange', event: any): void;
}>()
const selectedId = ref("");

const shownCol = ref<TableColumn[]>([{}]);

// column: The column component
// prop: The property associated with the column
// order: 'ascending' or 'descending'

// Perform sorting logic here based on the prop and order
// You can update the tableData array with sorted data
const handleSortChange = (event: any) => {
    
    emit('onSortChange', event);
};
const getWidth = (column: TableColumn): string => {
    let result: string = "";
    if (column.width != undefined) {
        result += column.width + "%";
    }

    return result;

}
const getValue = (item: SearchDTOItem, key: string): string | number => {
    return item[key];
};

const handleRowClick = (row: any, column: any, event: any) => {

    selectedId.value = row.id;

}

const handleEdit = (index: number, row: SearchDTOItem) => {

    emit("onEdit", row)
}
const handleDelete = (index: number, row: SearchDTOItem, event: Event) => {
    // console.log(event)
    emit("onDelete", row["id"], event.currentTarget)
}

const handleCustomAction = async (index: number, row: SearchDTOItem, action: CustomAction) => {
    let response: CustomActionResponse = new CustomActionResponse(action, row);



    emit("onCustomAction", response);

}
watch(() => props.columns, () => {
    shownCol.value = props.columns.filter(m => m.hidden == false);

}, { immediate: true })

</script>
  
<style scoped>
/* Add your table styling here */
.admin-table {
    width: 100%;
}
</style>
  