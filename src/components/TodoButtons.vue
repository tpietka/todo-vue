<script setup lang="ts">
import { useTodos } from '../stores/todos';

defineProps<{
  id: number;
  done: boolean;
}>();

const { markDone, deleteTodo } = useTodos();
</script>

<template>
  <div class="flex-column justify-between items-center px-2">
    <div class="flex h-10 w-full gap-4">
      <button
        v-if="!done"
        class="bg-green-500 text-white h-8 w-full"
        @click="markDone(id)"
      >
        Done
      </button>
      <button class="bg-red-500 text-white h-8 w-full" @click="deleteTodo(id)">
        Delete
      </button>
    </div>
  </div>
</template>
