<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { Todo } from '../models/todo';
import { useTodos } from '../stores/todos';
import InputLabel from '../components/InputLabel.vue';
import { useRouter } from 'vue-router';
import { isDateValid } from '../helpers/date';
const { addTodo, editTodo, getTodo } = useTodos();
const router = useRouter();

const props = defineProps<{
  id?: number | string;
}>();

let form = ref({} as Todo);

onBeforeMount(() => {
  if (props.id) {
    form.value = getTodo(Number(props.id));
  }
});

const submit = async () => {
  if (!isDateValid(form.value.deadline)) {
    alert('Invalid date format');
  } else if (!form.value.title) {
    alert('Title cannot be empty');
  } else {
    if (props.id) {
      editTodo(Number(props.id), form.value);
    } else {
      addTodo(form.value);
    }
    await router.push('/');
  }
};
const goBack = () => {
  router.back();
};
</script>
<template>
  <div class="w-full mt-12 flex-col">
    <h1 class="text-xl pb-10 text-center">Todo details</h1>
    <div class="w-full lg:px-0 px-8 pb-8 lg:w-96 lg:mx-auto">
      <input-label label="Title"></input-label>
      <input
        class="w-full px-4 bg-slate-300 text-slate-800 h-10"
        type="text"
        v-model="form.title"
      />
    </div>
    <div class="w-full lg:px-0 px-8 pb-8 lg:w-96 lg:mx-auto">
      <input-label label="Deadline"></input-label>
      <input
        placeholder="YYYY-MM-DD"
        class="w-full px-4 bg-slate-300 text-slate-800 h-10"
        type="text"
        v-model="form.deadline"
      />
    </div>
    <div
      class="fixed lg:relative lg:mt-4 lg:w-96 lg:mx-auto lg:gap-2 flex justify-center bottom-0 w-full"
    >
      <button class="h-full py-3 w-full bg-green-500" @click="submit" id="save-todo">
        Save
      </button>
      <button class="h-full py-3 w-full bg-red-500" @click="goBack" id="go-back">
        Go Back
      </button>
    </div>
  </div>
</template>
