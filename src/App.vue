<script setup lang="ts">
import {ref} from 'vue'
import Button from '@components/Button.vue'
import Board from '@components/Board.vue'
import Timer from '@components/Timer.vue'

const hasStarted = ref(false);
const gameOver = ref(false);
const setStart = () => {
  hasStarted.value = true;
}
</script>

<template>
  <header class="flex justify-center my-4 md:max-w-2xl md:mx-auto">
    <h1 className="text-2xl font-bold">Speed typing challenge!</h1>
  </header>

  <main>
    <div class="flex flex-col justify-center p-4 md:max-w-2xl md:mx-auto">
      <Timer :startTimer="hasStarted" @gameOver="gameOver = true" class="mb-4"/>
      <Button
        v-if="!hasStarted"
        @click="setStart"
        class="w-32 mx-auto"
      >Start</Button>
      <Board v-else :isOver="gameOver"/>
    </div>
  </main>
</template>
