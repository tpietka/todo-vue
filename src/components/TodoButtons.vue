<script setup lang="ts">
import { useTodos } from '../stores/todos';

defineProps<{
  id: number;
  done: boolean;
}>();

const { markDone, deleteTodo } = useTodos();
</script>

<template>
  <div class="flex justify-end px-2 h-10 w-full gap-4">
    <button
      v-if="!done"
      class="bg-green-500 text-white h-8 w-full md:w-32"
      @click="markDone(id)"
    >
      Done
    </button>
    <button class="bg-red-500 text-white h-8 w-full md:w-32" @click="deleteTodo(id)">
      Delete
    </button>
  </div>
</template>
