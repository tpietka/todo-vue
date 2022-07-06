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
  <div class="text-2xl">{{ label }}</div>
  <div v-if="todos.length > 0">
    <todo-component
      class="dark:odd:bg-slate-900 p-4 odd:bg-slate-300"
      v-for="todo in todos"
      :key="todo.id"
      :todo="todo"
    ></todo-component>
  </div>
  <div v-else class="mt-2">{{ noTodosMessage }}</div>
</template>
