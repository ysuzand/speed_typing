<script setup lang="ts">
import {ref} from 'vue';

const userInput = ref('');
const emit = defineEmits(['userInput'])
const emitInputValue = (e: Event) => {
    const element = e.target as HTMLTextAreaElement;
    emit('userInput', element?.value)
}
</script>
<template>
    <textarea
        @input="emitInputValue"
        v-model="userInput"
        rows="10"
        class="border-2 border-gray-600 border-solid rounded-md text-xl p-4"
    />
</template>