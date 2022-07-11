<script setup lang="ts">
import { useTodos } from '../stores/todos';
import { useRouter } from 'vue-router';
const router = useRouter();

const props = defineProps<{
  id: number;
  done: boolean;
  archived: boolean;
}>();

const { setDone, deleteTodo, setNotDone, archiveTodo } = useTodos();
const editTodo = () => {
  router.push({ name: 'EditTodoForm', params: { id: props.id } });
};
</script>

<template>
  <div class="flex items-center gap-2">
    <template v-if="!archived">
      <span v-if="!done" class="material-icons cursor-pointer lg-24" @click="setDone(id)"
        >done</span
      >
      <span v-if="!done" class="material-icons cursor-pointer lg-24" @click="editTodo"
        >edit</span
      >
      <span
        v-if="done"
        class="material-icons cursor-pointer lg-24"
        @click="setNotDone(id)"
        >undo</span
      >
      <span
        v-if="done"
        class="material-icons cursor-pointer lg-24"
        @click="archiveTodo(id)"
        >inventory</span
      >
    </template>
    <span class="material-icons cursor-pointer lg-24" @click="deleteTodo(id)"
      >delete</span
    >
  </div>
</template>
