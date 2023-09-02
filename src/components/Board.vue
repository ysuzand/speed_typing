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

  if (props.isOver) {
    countResult();
  }
})

const markupCorrectOrFail = (index: number) => {
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

// Remove red/green markup according to the number of deleted characters
const handleInputDelete = (previousInput: UserInputPayload, numberOfDeletedCharacter: number) => {
	// Start element index.
  let targetIndex = previousInput?.length - 1;
  // Loop through elements to delete red/green markup and update result counts.
  for (let count = numberOfDeletedCharacter; count > 0; count--) {
    const targetElement = textWrapper.value.children[targetIndex];
    // Reset 'error' class.
    if (targetElement.classList.contains('red')) {
		targetElement.classList.remove('red');
	} else {
    // Reset 'correct' class.
		targetElement.classList.remove('green');
	}		
  
    targetIndex--;
  }
}

const countResult = () => {
  let fail = 0, correct = 0;
  Array.from(textWrapper.value.children).forEach((childElement) => {
    childElement.classList.contains('green') && correct++;
    childElement.classList.contains('red') && fail++;
  })

  result.correct = correct;
  result.fail = fail;
}

const handleDeleteAll = () => {
  // HTMLCollection
  Array.from(textWrapper.value.children).forEach((child) => {
    if (child.getAttribute('class')) {
      child.removeAttribute('class')
    }
  })
}

const userInputs = ref<UserInputPayload | null>(null);

watch(userInputs, (current, prev) => {
	if (current && prev) {
    if (current.length === 0) {
      handleDeleteAll();
    }
		if (current.length < prev?.length) {
			handleInputDelete(prev, prev.length - current.length);
		} else if (current.length >= 0) {
			markupCorrectOrFail(current.length - 1);
		}
	} else {
		current?.length && markupCorrectOrFail(current?.length - 1);
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