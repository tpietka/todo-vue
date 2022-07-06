<script setup lang="ts">
import { computed } from 'vue';
import { getCurrentDateWithoutTime, getDateWithoutTime } from '../helpers/date';
import { Todo } from '../models/todo';
import TodoButtons from './TodoButtons.vue';

const props = defineProps<{
  todo: Todo;
}>();

const isDeadlineToday = computed(() => {
  return getCurrentDateWithoutTime() >= getDateWithoutTime(props.todo.deadline);
});
</script>

<template>
  <div class="flex-col justify-between items-start">
    <div class="flex w-full justify-start gap-2 items-center">
      <div
        :class="[
          todo.done ? 'opacity-60' : 'opacity-100',
          'font-bold w-full text-xl text-left',
        ]"
      >
        {{ todo.title }}
      </div>
      <todo-buttons :id="todo.id" :done="todo.done"></todo-buttons>
    </div>
    <div
      v-if="todo.deadline"
      :class="[
        isDeadlineToday && !todo.done ? 'text-red-500' : 'text-black-500',
        todo.done ? 'opacity-60' : 'opacity-100',
        'text-left flex gap-2',
      ]"
    >
      <span class="material-icons"> schedule </span> {{ todo.deadline }}
    </div>
  </div>
</template>
