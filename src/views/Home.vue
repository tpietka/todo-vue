<script setup lang="ts">
import { onBeforeMount, toRefs } from 'vue';
import TodoList from '../components/TodoList.vue';
import { useTodos } from '../stores/todos';
const { todos } = toRefs(useTodos());
const { getTodos } = useTodos();
onBeforeMount(() => {
  getTodos();
});
</script>
<template><todo-list :todos="todos"></todo-list></template>
<style scoped></style>
