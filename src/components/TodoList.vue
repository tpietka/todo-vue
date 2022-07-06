<script setup lang="ts">
import { Todo } from '../models/todo';
import TodoComponent from './Todo.vue';

defineProps<{
  todos: Todo[];
  label: string;
  noTodosMessage: string;
}>();
</script>

<template>
  <div class="text-2xl text-left">{{ label }}</div>
  <div v-if="todos.length > 0" class="mb-12">
    <todo-component v-for="todo in todos" :key="todo.id" :todo="todo"></todo-component>
  </div>
  <div v-else class="mt-2 mb-12 text-left">{{ noTodosMessage }}</div>
</template>
