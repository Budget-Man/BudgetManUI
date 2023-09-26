<template>
    <el-row>
        <el-col :span="24">
            <div class="grid-content ep-bg-purple-dark action-pane" >
                <el-button :icon="Search" circle  @click="handlebtnAddClicked"> search</el-button>
                    <div v-if="allowAdd">
                        <el-button :icon="Plus" circle  @click="handlebtnAddClicked"> Create</el-button>
                    </div>
            </div>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
import {
  Check,
  Delete,
  Edit,
  Message,
  Search,
  Star,
  Plus,
} from '@element-plus/icons-vue';
const props = defineProps<{
 
  allowAdd:boolean;
}>();

const emit = defineEmits<{
    (e: 'onBtnAddClicked'): void;
    (e: 'onBtnSearchClicked'): void;
}>();
const handlebtnAddClicked=()=>{
    emit("onBtnAddClicked");
}
const handlebtnSearchClicked=()=>{
    emit("onBtnSearchClicked");
}
</script>