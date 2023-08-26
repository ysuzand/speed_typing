<script setup lang="ts">
import {ref, onMounted, watch, reactive, onUpdated} from 'vue';
import TextArea from '@components/TextArea.vue';

type UserInputPayload = {
	typedText: string;
	length: number;
	currentChar: string;
}

const textWrapper = ref<HTMLParagraphElement>(null!);
const textInArray = ref<Array<string>>([]);
const result = reactive({
	correct: 0,
	fail: 0,
})
const props = defineProps<{
	isOver: boolean;
	init: boolean;
}>()

onMounted(() => {
	fetch('/typing-text.json')
	.then(res => res.json())
	.then(data => { textInArray.value = data['1'].split('') })
});

onUpdated(() => {
	if (props.init) {
		result.correct = 0;
		result.fail = 0;
	}
})

const compareUserInput = (index: number) => {
	// 1. Find spanElement with the same index
	const targetSpanElement = textWrapper.value.children[index]
	const targetCharacter = targetSpanElement.innerHTML;
	// 2. Compare character and user input character
	const userInputCharacter = userInputs.value?.currentChar;
	// 3. Replace spanElement with one with css class (green/red)
	if (targetCharacter === userInputCharacter) {
		targetSpanElement.classList.add('green');
		result.correct++;
	} else {
		targetSpanElement.classList.add('red');
		result.fail++;
	}
}

const handleUserInputDelete = (previousInput: UserInputPayload) => {
	const targetElement = textWrapper.value.children[previousInput?.length - 1];
	if(targetElement.classList.contains('red')) {
		targetElement.classList.remove('red');
		result.fail--;
	} else {
		targetElement.classList.remove('green');
		result.correct--;
	}		
}

const userInputs = ref<UserInputPayload | null>(null);

// Watch if a user deletes inputs. If so, delete color class.
watch(userInputs, (current, prev) => {
	console.log(prev?.length)
	if (current && prev) {
		if (current.length < prev?.length) {
			handleUserInputDelete(prev);
		} else if (current.length >= 0) {
			compareUserInput(current.length - 1);
		}
	} else {
		current?.length && compareUserInput(current?.length - 1);
	}
})
const checkInput = (payload: UserInputPayload) => {
	userInputs.value = payload;
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
		<TextArea v-if="!isOver" @user-input="checkInput" class="w-full" />
		<div v-else class="over flex justify-center">
			Game Over Correct: {{result.correct}} Fail: {{result.fail}}
		</div>
	</div>
</template>
<style lang="scss" scoped>
.green {
	color: green;
	text-decoration: underline;
}

.red {
	color: red;
	text-decoration: underline;
}

.over {
	color: blue;
}
</style>