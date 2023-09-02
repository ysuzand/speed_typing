<script setup lang="ts">
import {ref, onMounted} from 'vue';

const userInput = ref('');
const textRef = ref<HTMLTextAreaElement | null>(null);
onMounted(() => {
	textRef.value && textRef.value.focus();
})
const emit = defineEmits(['userInput'])
const emitInputValue = (e: Event) => {
	const element = e.target as HTMLTextAreaElement;
	const value = element?.value;
	emit('userInput', {
		typedText: value,
		length: value.length,
		currentChar: value.charAt(value.length - 1)
	})
}
</script>
<template>
	<textarea
		@input="emitInputValue"
		v-model="userInput"
		ref="textRef"
		rows="7"
		class="border-2 border-gray-600 border-solid rounded-md text-xl p-4"
	/>
</template>