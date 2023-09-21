<template>
    <el-dialog title="Warning" width="30%" :visible.sync="dialogVisible" :draggable="false">

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
                <el-button @click="dialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="dialogVisible = false">
                    Confirm
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>
  
<script setup lang="ts">
import { ref } from 'vue/dist/vue.js';


const { columns, editItem , dialogVisible} = defineProps<{
    columns: TableColumn[];
    editItem: SearchDTOItem | undefined;
    dialogVisible:boolean;
}>();
let model: SearchDTOItem = editItem !== undefined ? { ...editItem } : {};


</script>
  