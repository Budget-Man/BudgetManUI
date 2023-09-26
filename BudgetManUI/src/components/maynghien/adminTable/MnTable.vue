


<template>
    <div>
        <el-table class="admin-table" data="columns"  @sort-change="handleSortChange">
            <el-table-column v-for="column in columns" :key="column.key" prop="{{column.key}}" label="{{column.label}}" 
            sortable="{{ column.sorable }}" width="{{getWidth(column) }}" />
           
        </el-table>
    </div>
</template>
  
<script setup lang="ts">
// @ts-ignore
import { TableColumn } from '../Models/TableColumn.ts'
// @ts-ignore
import { SearchDTOItem } from '../Models/SearchDTOItem.ts'

const props = defineProps<{ 
    columns: TableColumn[];
    datas: SearchDTOItem[];
      
}>();


  // column: The column component
  // prop: The property associated with the column
  // order: 'ascending' or 'descending'

  // Perform sorting logic here based on the prop and order
  // You can update the tableData array with sorted data
const handleSortChange = (column:any, prop:string, order:string ) => {

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
</script>
  
<style scoped>
/* Add your table styling here */
.admin-table {
    width: 100%;
}
</style>
  