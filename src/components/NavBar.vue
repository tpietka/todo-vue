<script setup lang="ts">
import { toRefs } from 'vue';
import { getCurrentDayName, getCurrentDateDDMMYYYY } from '../helpers/date';
import { useSettings } from '../stores/settings';
const { setDark, setLight } = useSettings();
const { theme } = toRefs(useSettings());
</script>

<template>
  <nav class="w-full text-slate-800 dark:text-slate-300 dark:bg-slate-800 bg-slate-300">
    <div class="flex lg:w-10/12 mx-6 lg:mx-auto items-center">
      <div @click="$router.push('/')" class="text-2xl w-full">MyTodos</div>
      <div class="w-full flex justify-center">
        <span
          v-if="theme != 'dark'"
          class="material-icons cursor-pointer"
          @click="setDark"
          >dark_mode</span
        >
        <span
          v-if="theme == 'dark'"
          class="material-icons cursor-pointer"
          @click="setLight"
          >light_mode</span
        >
      </div>
      <div class="text-right w-full flex-col">
        <div class="text-lg">{{ getCurrentDayName() }}</div>
        <div class="text-sm">{{ getCurrentDateDDMMYYYY() }}</div>
      </div>
    </div>
  </nav>
</template>
