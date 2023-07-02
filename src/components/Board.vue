<script setup lang="ts">
import {ref, onMounted} from 'vue';
import TextArea from '@components/TextArea.vue'
type UserInputPayload = {
    typedText: string;
    length: number;
    currentChar: string;
}
const text = ref<HTMLParagraphElement>(null!);
const textFragment = ref<Array<string>>(['']);
onMounted(() => {
    textFragment.value = text.value?.innerText.split('');
})

const userInputs = ref<UserInputPayload | null>(null);
const checkInput = (payload: UserInputPayload) => {
    userInputs.value = payload;
    console.log(userInputs.value)
}
</script>
<template>
    <div class="flex flex-col">
        <p  ref="text"
            class="text-2xl mb-4">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum soluta, ullam veniam beatae eligendi, delectus similique accusantium eveniet nisi veritatis, aliquid et excepturi. Ut optio aliquam hic quisquam eligendi aliquid?</p>
        <TextArea @user-input="checkInput" />
    </div>
</template>