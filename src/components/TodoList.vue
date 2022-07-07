<script setup lang="ts">
import { Todo } from '../models/todo';
import TodosCounter from './TodosCounter.vue';
import TodoComponent from './Todo.vue';
import { useTodos } from '../stores/todos';
const { moveTodo } = useTodos();
const props = defineProps<{
  todos: Todo[];
  label: string;
  noTodosMessage: string;
}>();

const setDragId = (e: DragEvent, id: number) => {
  e.dataTransfer?.setData('Text', id.toString());
};

const dropTodo = (e: DragEvent) => {
  const id = e.dataTransfer?.getData('Text');
  if (id) {
    moveTodo(Number(id), props.label);
  }
};
</script>

<template>
  <div @dragover="(e: DragEvent) => e.preventDefault()" @drop="dropTodo">
    <div class="text-2xl flex gap-2 mb-2 items-center">
      <span>{{ label }}</span> <todos-counter :counter="todos.length"></todos-counter>
    </div>
    <todo-component
      v-if="todos.length > 0"
      draggable="true"
      @dragstart="setDragId($event, todo.id)"
      class="dark:even:bg-slate-800 p-4 even:bg-slate-300"
      v-for="todo in todos"
      :key="todo.id"
      :todo="todo"
    ></todo-component>
    <div v-else class="my-6">{{ noTodosMessage }}</div>
  </div>
</template>
