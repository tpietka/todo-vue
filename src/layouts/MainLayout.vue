<script setup lang="ts">
import { toRefs } from 'vue';
import { getCurrentDayName, getCurrentDateDDMMYYYY } from '../helpers/date';
import { useSettings } from '../stores/settings';
const { setDark, setLight } = useSettings();
const { theme } = toRefs(useSettings());
</script>

<template>
  <div
    class="h-full w-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100"
  >
    <div class="h-full md:max-w-2xl md:mx-auto py-4 md:py-8">
      <div class="flex justify-between mx-6 pb-4 md:mx-0">
        <div class="text-4xl">MyTodos</div>
        <div class="mt-2">
          <span v-if="theme != 'dark'" class="material-icons" @click="setDark"
            >dark_mode</span
          >
          <span v-if="theme == 'dark'" class="material-icons" @click="setLight"
            >light_mode</span
          >
        </div>
        <div class="text-right flex-col">
          <div class="text-2xl">{{ getCurrentDayName() }}</div>
          <div>{{ getCurrentDateDDMMYYYY() }}</div>
        </div>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<style></style>
