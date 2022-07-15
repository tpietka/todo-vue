<script setup lang="ts">
import { computed } from 'vue';
import {
  getCurrentDate,
  formatDateToYYYYMMDD,
  formatDateToDDMMYYYY,
  isDeadlineTodayOrPastDeadline,
} from '../helpers/date';
const props = defineProps<{
  done: boolean;
  date: string;
}>();

const isDeadline = computed(() => {
  return isDeadlineTodayOrPastDeadline(props.date) && !props.done;
});

const formattedDate = computed(() => {
  return formatDateToDDMMYYYY(props.date);
});
</script>
<template>
  <span
    :class="[
      isDeadline ? 'text-red-500' : 'dark:text-slate-100 text-slate-800',
      'flex text-xs items-center gap-1 date-container',
    ]"
  >
    <span class="material-icons lg-14"> {{ done ? 'task_alt' : 'schedule' }} </span>
    <span class="date"> {{ formattedDate }}</span>
  </span>
</template>
