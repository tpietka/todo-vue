<script setup lang="ts">
import moment from 'moment';
import { computed, ref } from 'vue';

const emit = defineEmits(['updateDate', 'hideDatePicker']);

let selectedMonth = ref(moment().month());
let selectedYear = ref(moment().year());
let selectedDay = ref(moment().date());

const updateDate = (n: number) => {
  selectedDay.value = n;
  let date = `${moment().year(selectedYear.value).format('YYYY')}-${moment()
    .month(selectedMonth.value)
    .format('MM')}-${moment().date(selectedDay.value).format('DD')}`;
  emit('updateDate', date);
  emit('hideDatePicker');
};

const daysInMonth = computed(() =>
  moment().year(selectedYear.value).month(selectedMonth.value).daysInMonth()
);
const month = computed(() =>
  moment().year(selectedYear.value).month(selectedMonth.value).format('MM')
);
const year = computed(() => moment().year(selectedYear.value).format('YYYY'));
const monthIndentation = computed(
  () => moment().year(selectedYear.value).month(selectedMonth.value).isoWeekday() - 2
);
</script>

<template>
  <div
    class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 dark:bg-[#141921] bg-[#F1F5F9] text-slate-800 dark:text-slate-100 border-2 border-slate-100 p-4 flex-col w-96 max-h-full"
  >
    <div class="flex my-3 justify-evenly">
      <div class="flex items-center gap-2">
        <span
          @click="selectedMonth -= 1"
          class="material-icons navigation-icon cursor-pointer"
          >arrow_left</span
        >
        {{ month }}
        <span
          @click="selectedMonth += 1"
          class="material-icons navigation-icon cursor-pointer"
          >arrow_right</span
        >
      </div>
      <div class="flex items-center gap-2">
        <span
          @click="selectedYear -= 1"
          class="material-icons navigation-icon cursor-pointer"
          >arrow_left</span
        >
        {{ year }}
        <span
          @click="selectedYear += 1"
          class="material-icons navigation-icon cursor-pointer"
          >arrow_right</span
        >
      </div>
    </div>
    <div class="date-grid">
      <div
        class="days-of-week"
        v-for="day in ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']"
      >
        {{ day }}
      </div>
      <div v-for="n in monthIndentation"></div>
      <div
        class="date cursor-pointer hover:bg-slate-600 hover:text-slate-100"
        @click="updateDate(n)"
        v-for="n in daysInMonth"
      >
        <span>{{ n }}</span>
      </div>
    </div>
  </div>
  <div @click="$emit('hideDatePicker')" class="backdrop"></div>
</template>

<style>
.date-grid {
  display: grid;
  text-align: center;
  grid-template-columns: repeat(7, 40px);
  grid-gap: 10px;
  grid-template-rows: repeat(7, 40px);
  align-items: center;
}
.backdrop {
  z-index: 30;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0.6;
  background-color: gray;
}
</style>
