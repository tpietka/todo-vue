<script setup lang="ts">
import { toRefs } from 'vue';
import TodoList from '../components/TodoList.vue';
import { useTodos } from '../stores/todos';
import CustomButton from '../components/CustomButton.vue';
const { todayTodos, nextDaysTodos, doneTodos } = toRefs(useTodos());
</script>
<template>
  <div
    class="flex fixed z-20 h-14 lg:h-auto lg:gap-2 justify-center bottom-0 w-full lg:relative lg:justify-center lg:my-12"
  >
    <custom-button
      class="bg-green-700 text-slate-100 font-bold py-3 lg:py-2 w-full bottom-0 lg:w-48 hover:bg-green-600"
      id="btn-add-todo"
      routeName="NewTodoForm"
      label="Add Todo"
    ></custom-button>
    <custom-button
      class="bg-slate-500 text-slate-100 font-bold py-3 lg:py-2 w-full bottom-0 lg:w-48 hover:bg-slate-600"
      id="btn-archive-todos"
      routeName="Archive"
      label="Archived Todos"
    ></custom-button>
  </div>
  <div class="mx-6 lg:mx-auto">
    <div class="lg:flex lg:w-full my-10">
      <todo-list
        class="w-full"
        label="Today"
        :todos="todayTodos"
        no-todos-message="You have no todos planned for today"
      ></todo-list>
      <div
        class="border-b-2 lg:border-b-0 lg:border-r-2 my-10 lg:my-0 lg:mx-10 border-slate-800 dark:border-slate-100 h-1 lg:h-auto"
      ></div>
      <todo-list
        class="w-full"
        label="Next days"
        :todos="nextDaysTodos"
        no-todos-message="You have no todos planned for next days"
      ></todo-list>
      <div
        class="border-b-2 lg:border-b-0 lg:border-r-2 my-10 lg:my-0 lg:mx-10 border-slate-800 dark:border-slate-100 h-1 lg:h-auto"
      ></div>
      <todo-list
        class="w-full"
        label="Done"
        :todos="doneTodos"
        no-todos-message="You have no done todos"
      ></todo-list>
    </div>
  </div>
</template>
