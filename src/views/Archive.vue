<script setup lang="ts">
import { toRefs } from 'vue';
import TodoList from '../components/TodoList.vue';
import { useTodos } from '../stores/todos';
import CustomButton from '../components/CustomButton.vue';
import Search from '../components/Search.vue';
const { archivedTodos } = toRefs(useTodos());
</script>
<template>
  <div
    class="flex fixed gap-2 justify-center bottom-0 w-full lg:relative lg:justify-center lg:my-12"
  >
    <custom-button
      class="bg-slate-500 text-slate-100 font-bold py-3 lg:py-2 w-full bottom-0 lg:w-48 hover:bg-slate-600"
      id="btn-add-todo"
      routeName="Home"
      label="Active Todos"
    ></custom-button>
  </div>
  <div class="mx-6 lg:mx-auto">
    <search></search>
    <div class="lg:flex lg:w-full my-10">
      <todo-list
        class="w-full"
        label="Archived"
        :todos="archivedTodos"
        no-todos-message="You have no archived todos"
      ></todo-list>
    </div>
  </div>
</template>
