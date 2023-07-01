<script setup lang="ts">
import TextArea from '@components/TextArea.vue'

const checkInput = (input: string) => {
    console.log(input)
}
</script>
<template>
    <div class="flex flex-col">
        <p class="text-2xl">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum soluta, ullam veniam beatae eligendi, delectus similique accusantium eveniet nisi veritatis, aliquid et excepturi. Ut optio aliquam hic quisquam eligendi aliquid?</p>
        <TextArea @user-input="checkInput"/>
    </div>
</template>