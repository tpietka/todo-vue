<script setup lang="ts">
import { ref } from 'vue';
import { Todo } from '../models/todo';
import { useTodos } from '../stores/todos';
import InputLabel from '../components/InputLabel.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const { addTodo } = useTodos();
let form = ref({} as Todo);

const submit = async () => {
  addTodo(form.value);
  await router.push('/');
};
const goBack = () => {
  router.back();
};
</script>
<template>
  <div class="mx-auto mt-24 flex-col">
    <h1 class="text-xl pb-10 text-center">Todo details</h1>
    <div class="w-full md:px-0 px-8 pb-8 md:w-96 md:mx-auto">
      <input-label label="Title"></input-label>
      <input
        class="w-full bg-slate-300 text-slate-800 h-10"
        type="text"
        v-model="form.title"
      />
    </div>
    <div class="w-full md:px-0 px-8 pb-8 md:w-96 md:mx-auto">
      <input-label label="Deadline"></input-label>
      <input
        class="w-full bg-slate-300 text-slate-800 h-10"
        type="text"
        v-model="form.deadline"
      />
    </div>
    <div
      class="fixed md:relative md:mt-4 md:w-96 md:mx-auto md:gap-2 flex justify-center bottom-0 w-full"
    >
      <button
        class="h-full py-4 md:py-2 w-full bg-green-500"
        @click="submit"
        id="save-todo"
      >
        Save
      </button>
      <button class="h-full py-4 md:py-2 w-full bg-red-500" @click="goBack" id="go-back">
        Go Back
      </button>
    </div>
  </div>
</template>
