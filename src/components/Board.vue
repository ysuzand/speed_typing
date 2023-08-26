<script setup lang="ts">
import {ref, onMounted, watch} from 'vue';
import TextArea from '@components/TextArea.vue';

type UserInputPayload = {
	typedText: string;
	length: number;
	currentChar: string;
}

const textWrapper = ref<HTMLParagraphElement>(null!);
const textInArray = ref<Array<string>>([]);
const exampleText = 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum soluta, ullam veniam beatae eligendi, delectus similique accusantium eveniet nisi veritatis, aliquid et excepturi. Ut optio aliquam hic quisquam eligendi aliquid?'

onMounted(() => {
	textInArray.value = exampleText.split('');
})

const compareExampleWithUserInput = (index: number) => {
	// 1. Find spanElement with the same index
	const targetSpanElement = textWrapper.value.children[index]
	const targetCharacter = targetSpanElement.innerHTML;
	// 2. Compare character and user input character
	const userInputCharacter = userInputs.value?.currentChar;
	// 3. Replace spanElement with one with css class (green/red)
	if (targetCharacter === userInputCharacter) {
		targetSpanElement.classList.add('green');
	} else {
		targetSpanElement.classList.add('red');
	}
}

const userInputs = ref<UserInputPayload | null>(null);

// Watch if a user deletes inputs. If so, delete color class.
watch(userInputs, (current, prev) => {
	if (current && prev && (current.length < prev?.length)) {
		const targetElement = textWrapper.value.children[prev?.length - 1];
		targetElement.classList.remove('red');
		targetElement.classList.remove('green');
	}
})
const checkInput = (payload: UserInputPayload) => {
	userInputs.value = payload;
	if (payload.length > 0) {
		compareExampleWithUserInput(payload.length - 1);
	}
}
</script>
<template>
	<div class="flex flex-col">
		<p ref="textWrapper" class="text-2xl mb-4">
			<span
				v-for="(char, index) in textInArray"
				:data-index="index"
			>{{ char }}</span>
		</p>
		<TextArea @user-input="checkInput" />
	</div>
</template>
<style lang="scss">
.green {
	color: green;
	text-decoration: underline;
}

.red {
	color: red;
	text-decoration: underline;
}
</style>