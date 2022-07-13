<script setup lang="ts">
import { toRefs } from 'vue';
import { getCurrentDayName, getCurrentDateDDMMYYYY } from '../helpers/date';
import { useSettings } from '../stores/settings';
const { setDark, setLight } = useSettings();
const { theme } = toRefs(useSettings());
</script>

<template>
  <div class="h-full w-full text-slate-800 dark:text-slate-100">
    <div class="h-full lg:w-10/12 lg:mx-auto py-4 mb-10 lg:py-8">
      <div class="flex justify-between mx-6 lg:mx-0">
        <div class="text-4xl w-full">MyTodos</div>
        <div class="mt-2 w-full flex justify-center">
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
          <div class="text-2xl">{{ getCurrentDayName() }}</div>
          <div>{{ getCurrentDateDDMMYYYY() }}</div>
        </div>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<style></style>
