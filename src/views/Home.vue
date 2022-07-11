<script setup lang="ts">
import { toRefs } from 'vue';
import TodoList from '../components/TodoList.vue';
import { useTodos } from '../stores/todos';
import CustomButton from '../components/CustomButton.vue';
const { todayTodos, nextDaysTodos, doneTodos, search } = toRefs(useTodos());
</script>
<template>
  <div
    class="flex fixed lg:gap-2 justify-center bottom-0 w-full lg:relative lg:justify-center lg:my-12"
  >
    <custom-button
      class="bg-green-700 text-slate-100 font-bold py-3 lg:py-2 w-full bottom-0 lg:w-48 hover:bg-green-600"
      id="btn-add-todo"
      routeName="NewTodoForm"
      label="Add Todo"
    ></custom-button>
    <custom-button
      class="bg-slate-500 text-slate-100 font-bold py-3 lg:py-2 w-full bottom-0 lg:w-48 hover:bg-slate-600"
      id="btn-add-todo"
      routeName="Archive"
      label="Archived Todos"
    ></custom-button>
  </div>
  <div class="flex w-56 my-6 mx-auto lg:mx-0">
    <div class="w-full relative flex justify-center">
      <input
        type="text"
        class="px-2 text-slate-800 bg-slate-300"
        v-model="search"
        placeholder="Search for todo"
      /><span
        @click="search = ''"
        v-if="search"
        class="material-icons absolute cursor-pointer mx-4 right-0 text-slate-800"
        >clear</span
      >
    </div>
  </div>
  <div class="lg:flex lg:w-full my-12 mx-6 lg:mx-auto lg:my-0">
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
</template>
