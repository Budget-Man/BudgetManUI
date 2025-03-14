<template>
        <el-input
            v-model = "inputValue"
            @keypress="handleKeypress"
            @focus="handleFocus"
            @blur="handleBlur"
            @input="handleInput"
            :formatter="formatter"
            :parser="parser"
            ref="inputRef"
            maxlength="24"
            @change = "handleChange"
        >
        </el-input>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
// @ts-ignore
import { formatCurrency, getCurrentIsAddSuffix } from "@/Services/CurrencyUtilities";
// import { ElMessage, ElInput } from 'element-plus';

const props = defineProps<{
    // modelValue: string | number | undefined,
}>();
// watch(() => props.modelValue, (newValue) => {
//     // console.log('watch currency input value:');
//     // console.log(newValue);
//     inputValue.value = newValue;
// });
const emits = defineEmits(['update:modelValue', 'focus', 'blur']);
const inputRef = ref();
// Reactive properties
// const inputValue = ref(props.modelValue);
const inputValue = defineModel()
const handleKeypress = (event:any) => {
    // console.log('handleKeypress');
    // console.log(event.key);
    // if (event.key === 'Backspace') {
    //     if (inputValue.value.length > 0) {
    //         inputValue.value = inputValue.value.substring(0, inputValue.value.length - 1);
    //     }
    // }
    if (event.key === 'k')
    {
        inputValue.value += "000";
        // emits('update:modelValue', inputValue.value);
    }
    else if (event.key === 'm')
    {
        inputValue.value += "000000";
        // emits('update:modelValue', inputValue.value);
    }
    else if (IsNotNumber(event.key))
    {
        // console.log('prevent');
        event.preventDefault();
    }
}
const IsNotNumber = (value:any) => {
//   console.log(event);
  if (!/\d/.test(value) && value !== '.') {
    // console.log('prevent');
    return true;
  }
  else return false;
}
const handleFocus = (value : any) => {
    // console.log(value.target.value);
    setCursorPosition(value.target.value);
    // Handle focus event if needed
    emits('focus');
}
const handleBlur = () => {
    // Handle blur event if needed
    emits('blur');
}

const handleInput = (event: Event) => {
    // console.log(inputValue.value)
    // console.log(props.modelValue)
    // emits('update:modelValue', inputValue.value);
}

const formatter = (value: string) => {
    // console.log('formatter');
    //  console.log(value);
    if (value)
    {
        let result = formatCurrency(parseInt(value));
        // console.log(result);
        
        setCursorPosition(result);
        return result;
    }
    else return '';
}


const parser = (value : String) => {
    // console.log('parse');
    // console.log(value);
    const result = value.replace(/[^\d]/g, '');
    // console.log(result);
    return result;
}

const setCursorPosition = async (value : string) => {
    // querySelector('#datOneDiv').style.display = 'block';
    // console.log(value.length);
    // inputRef.value.focus();
    if (getCurrentIsAddSuffix()){
        let pos = value.length -2;
        // console.log(pos);
        // inputRef.value?.focus();
        // inputRef.value?.setSelectionRange(pos, pos);
        setTimeout(() => { //set cursor position after return formated value
                inputRef.value?.input.setSelectionRange(pos, pos);
            }, 0);
    }
}

const handleChange = (event : any) => {
    // console.log('handleChange');
    // console.log(event);
    // console.log(inputValue.value);
}
</script>

