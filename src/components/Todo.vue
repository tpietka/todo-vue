<script setup lang="ts">
import { computed } from 'vue';
import { getCurrentDateWithoutTime } from '../helpers/date';
import { Todo } from '../models/todo';
import { useTodos } from '../stores/todos';

const { markDone, deleteTodo } = useTodos();
const props = defineProps<{
  todo: Todo;
}>();

const isDeadlineToday = computed(() => {
  return getCurrentDateWithoutTime() >= props.todo.deadline;
});
</script>

<template>
  <div class="flex-column justify-between items-center p-2">
    <div class="flex-column">
      <div class="flex w-full justify-between">
        <div class="font-bold text-lg">{{ todo.title }}</div>
        <div
          v-if="todo.deadline"
          :class="[isDeadlineToday ? 'text-red-500' : 'text-black-500']"
        >
          Due date: {{ todo.deadline }}
        </div>
      </div>
      <div class="text-left leading-tight">{{ todo.text }}</div>
    </div>
  </div>
</template>
