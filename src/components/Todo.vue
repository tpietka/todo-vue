<script setup lang="ts">
import { computed } from 'vue';
import { getCurrentDateWithoutTime } from '../helpers/date';
import { Todo } from '../models/todo';
import TodoButtons from './TodoButtons.vue';

const props = defineProps<{
  todo: Todo;
}>();

const isDeadlineToday = computed(() => {
  return getCurrentDateWithoutTime() >= props.todo.deadline;
});
</script>

<template>
  <div class="flex justify-between items-center p-2">
    <div class="flex-col w-full justify-start">
      <div class="font-bold text-lg text-left">{{ todo.title }}</div>
      <div
        v-if="todo.deadline"
        :class="[isDeadlineToday ? 'text-red-500' : 'text-black-500', 'text-left']"
      >
        Due date: {{ todo.deadline }}
      </div>
    </div>
    <div>
      <todo-buttons :id="todo.id" :done="todo.done"></todo-buttons>
    </div>
  </div>
</template>
