<script setup lang="ts">
import { Todo } from '../models/todo';
import TodoButtons from './TodoButtons.vue';
import TodoDate from './TodoDate.vue';

defineProps<{
  todo: Todo;
}>();
</script>

<template>
  <div class="flex justify-between gap-2 items-center">
    <div :class="[todo.done ? 'opacity-60' : 'opacity-100', 'font-bold text-xl']">
      <div class="leading-tight text-base">{{ todo.title }}</div>
      <div>
        <todo-date v-if="!todo.done" :done="todo.done" :date="todo.deadline"></todo-date>
        <todo-date v-else :done="todo.done" :date="todo.completed"></todo-date>
      </div>
    </div>
    <todo-buttons :id="todo.id" :done="todo.done"></todo-buttons>
  </div>
</template>
