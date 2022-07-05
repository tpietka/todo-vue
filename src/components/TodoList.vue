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
  <div class="text-4xl text-left">{{ label }}</div>
  <div v-if="todos.length > 0" class="mt-8 mb-24">
    <todo-component
      class="mt-4 mb-4"
      v-for="todo in todos"
      :key="todo.id"
      :todo="todo"
    ></todo-component>
  </div>
  <div v-else class="mt-8 mb-24 text-left">{{ noTodosMessage }}</div>
</template>
