<script setup lang="ts">
import { onBeforeMount, ref, toRefs } from 'vue';
import TodoList from '../components/TodoList.vue';
import { useTodos } from '../stores/todos';
import TodosCounter from '../components/TodosCounter.vue';
import CustomButton from '../components/CustomButton.vue';
import { getCurrentDayName, getCurrentDateWithoutTime } from '../helpers/date';
const { todayTodos, nextDaysTodos, doneTodos } = toRefs(useTodos());
const { getTodos } = useTodos();
onBeforeMount(() => {
  getTodos();
});
</script>
<template>
  <div class="text-right mx-6 flex-col">
    <div class="text-2xl">{{ getCurrentDayName() }}</div>
    <div>{{ getCurrentDateWithoutTime() }}</div>
  </div>
  <div class="md:flex-col">
    <!-- <div class="flex md:justify-center md:mx-auto md:w-1/2">
      <todos-counter :counter="deadlineTodosCount" className="deadline"></todos-counter>
      <todos-counter :counter="awaitingTodosCount" className="awaiting"></todos-counter>
      <todos-counter :counter="doneTodosCount" className="done"></todos-counter>
    </div> -->
    <div class="mt-12 mx-6 md:mt-48 md:mx-auto mb-12 md:w-1/3">
      <div>
        <todo-list
          label="Today"
          :todos="todayTodos"
          no-todos-message="You have no todos planned for today"
        ></todo-list>
      </div>

      <div>
        <todo-list
          label="Next days"
          :todos="nextDaysTodos"
          no-todos-message="You have no todos planned for next days"
        ></todo-list>
      </div>
      <div>
        <todo-list
          label="Done"
          :todos="doneTodos"
          no-todos-message="You have no done todos"
        ></todo-list>
      </div>
    </div>
    <div class="flex fixed bottom-0 md:relative md:justify-center w-full">
      <custom-button
        classes="bg-green-500 text-white py-4 flex justify-center bottom-0 w-full md:w-48"
        id="btn-add-todo"
        routeName="NewTodoForm"
        label="Add Todo"
      ></custom-button>
    </div>
  </div>
</template>
<style scoped></style>
