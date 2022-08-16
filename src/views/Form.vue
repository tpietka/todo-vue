<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue';
import { Todo } from '../models/todo';
import { useTodos } from '../stores/todos';
import { useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';
import InputLabel from '../components/InputLabel.vue';
import DatePicker from '../components/DatePicker.vue';
import ValidationErrorMessage from '../components/ValidationErrorMessage.vue';
import { useValidations } from '../composables/validations';
import { useAlerts } from '../stores/alerts';
import CustomButton from '../components/CustomButton.vue';
import DialogVue from '../components/Dialog.vue';

const props = defineProps<{
  id?: number | string;
}>();

let displayDialog = ref(false);
let tag = ref('');
let form = ref({
  tags: [] as string[],
} as Todo);
let showDatePicker = ref(false);

const { addTodo, editTodo, getTodo } = useTodos();
onBeforeMount(() => {
  form.value.priority = 1;
  if (props.id) {
    form.value = getTodo(Number(props.id));
  }
});

const addTag = () => {
  if (tag.value && tag.value != ' ') {
    form.value.tags.push(tag.value);
    tag.value = '';
  } else {
    tag.value = '';
  }
};

const router = useRouter();
const { displayAlert } = useAlerts();
const submit = async () => {
  v.value.$touch();
  if (v.value.$invalid) {
    displayAlert('Errors detected in form', 'warning');
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

var randomColor = 'bg-[#' + Math.floor(Math.random() * 16777215).toString(16) + ']';

const { validateDateFormat, validateRequired } = useValidations();
const rules = computed(() => ({
  form: {
    title: { required: validateRequired('Title') },
    deadline: {
      required: validateRequired('Deadline'),
      format: validateDateFormat(),
    },
  },
}));
const v = useVuelidate(rules, { form });
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
      <validation-error-message
        class="mt-1"
        :display-error="v.form.title.$error"
        :error-messages="v.form.title.$errors"
      ></validation-error-message>
    </div>
    <div class="w-full lg:px-0 px-8 pb-8 lg:w-96 lg:mx-auto">
      <input-label label="Description"></input-label>
      <textarea
        class="w-full py-2 px-4 bg-slate-300 text-slate-800"
        rows="4"
        v-model="form.description"
      />
    </div>
    <div class="w-full lg:px-0 px-8 pb-8 lg:w-96 lg:mx-auto">
      <input-label label="Tags"></input-label>
      <input
        class="w-full px-4 bg-slate-300 text-slate-800 h-10"
        type="text"
        v-model="tag"
        @keydown.space="addTag"
        @keydown.enter="addTag"
      />
      <div v-if="form.tags.length > 0" class="flex mt-4 gap-2">
        <div
          class="p-2 flex items-center gap-2 border-2 rounded-xl border-slate-800 dark:border-slate-100"
          v-for="(tag, index) in form.tags"
          :key="index"
        >
          {{ tag }}
          <span class="material-icons cursor-pointer" @click="form.tags.splice(index, 1)"
            >cancel</span
          >
        </div>
      </div>
    </div>
    <div class="w-full lg:px-0 px-8 pb-8 lg:w-96 lg:mx-auto">
      <input-label label="Deadline"></input-label>
      <span class="relative flex items-center">
        <input
          placeholder="YYYY-MM-DD"
          class="w-full px-4 bg-slate-300 text-slate-800 h-10"
          type="text"
          v-model="form.deadline"
        />
        <span
          class="material-icons cursor-pointer absolute not-selectable dark:text-[#141921] mr-2 right-0"
          @click="showDatePicker = true"
          >calendar_month</span
        >
      </span>
      <validation-error-message
        class="mt-1"
        :display-error="v.form.deadline.$error"
        :error-messages="v.form.deadline.$errors"
      >
      </validation-error-message>
    </div>
    <div class="w-full lg:px-0 px-8 pb-8 lg:w-96 lg:mx-auto">
      <input-label label="Priority"></input-label>
      <span
        @click="form.priority = n"
        v-for="n in 5"
        :class="[
          n <= form.priority ? 'text-red-500' : 'text-slate-300',
          'material-icons lg-36 cursor-pointer not-selectable',
        ]"
      >
        local_fire_department
      </span>
    </div>
    <div
      class="fixed lg:relative lg:mt-4 h-14 lg:w-96 lg:mx-auto lg:gap-2 flex justify-center bottom-0 w-full"
    >
      <custom-button
        @click="submit"
        class="bg-green-700 text-white font-bold py-3 lg:py-2 w-full bottom-0 lg:w-48 hover:bg-green-600"
        id="btn-save-form"
        label="Save"
      ></custom-button>
      <custom-button
        @click="displayDialog = true"
        class="bg-red-700 text-white font-bold py-3 lg:py-2 w-full bottom-0 lg:w-48 hover:bg-red-600"
        id="btn-leave-form"
        label="Go back"
      ></custom-button>
    </div>
    <dialog-vue :display="displayDialog" message="Are you sure?">
      <custom-button
        @click="goBack"
        class="bg-slate-700 text-white font-bold py-3 lg:py-2 w-full bottom-0 lg:w-48"
        id="btn-save-form"
        label="Go back"
      ></custom-button>
      <custom-button
        @click="displayDialog = false"
        class="bg-slate-700 text-white font-bold py-3 lg:py-2 w-full bottom-0 lg:w-48"
        id="btn-leave-form"
        label="Stay"
      ></custom-button>
    </dialog-vue>
  </div>
  <date-picker
    v-if="showDatePicker"
    @hide-date-picker="showDatePicker = false"
    @update-date="(value: string) => form.deadline=value"
  ></date-picker>
</template>
