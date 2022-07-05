<script setup lang="ts">
import { useTodos } from '../stores/todos';

defineProps<{
  id: number;
  done: boolean;
}>();

const { markDone, deleteTodo } = useTodos();
</script>

<template>
  <div class="flex justify-end px-2 h-10 gap-4">
    <span v-if="!done" class="material-icons md-36" @click="markDone(id)">done</span>
    <span class="material-icons md-36" @click="deleteTodo(id)">delete</span>
  </div>
</template>
