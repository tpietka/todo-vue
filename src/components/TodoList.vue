<script setup lang="ts">
import { Todo } from '../models/todo';
import TodoComponent from './Todo.vue';

defineProps<{
  todos: Todo[];
}>();
</script>

<template>
  <div v-for="todo in todos" :key="todo.id">
    <todo-component :todo="todo"></todo-component>
  </div>
</template>
