<script setup lang="ts">
import { Todo } from '../models/todo';
import TodosCounter from './TodosCounter.vue';
import TodoComponent from './Todo.vue';

defineProps<{
  todos: Todo[];
  label: string;
  noTodosMessage: string;
}>();
</script>

<template>
  <div class="text-2xl flex gap-2 mb-2 items-center">
    <span>{{ label }}</span> <todos-counter :counter="todos.length"></todos-counter>
  </div>
  <div v-if="todos.length > 0">
    <todo-component
      class="dark:odd:bg-slate-800 p-4 odd:bg-slate-300"
      v-for="todo in todos"
      :key="todo.id"
      :todo="todo"
    ></todo-component>
  </div>
  <div v-else class="my-6">{{ noTodosMessage }}</div>
</template>
