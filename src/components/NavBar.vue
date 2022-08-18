<script setup lang="ts">
import { toRefs } from 'vue';
import { getCurrentDayName, getCurrentDateDDMMYYYY } from '../helpers/date';
import { useSettings } from '../stores/settings';

const { setDark, setLight, setLocale } = useSettings();
const { theme, locale } = toRefs(useSettings());
</script>

<template>
  <nav
    class="w-full h-14 fixed z-30 top-0 text-slate-800 dark:text-slate-300 dark:bg-slate-800 bg-slate-300"
  >
    <div class="flex h-full z-60 lg:w-10/12 mx-6 lg:mx-auto items-center">
      <div @click="$router.push('/')" class="text-2xl w-full cursor-pointer">MyTodos</div>
      <div class="w-full flex justify-center">
        <span
          v-if="theme != 'dark'"
          class="material-icons cursor-pointer"
          @click="setDark"
          >dark_mode</span
        >
        <span
          v-if="theme == 'dark'"
          class="material-icons not-selectable cursor-pointer"
          @click="setLight"
          >light_mode</span
        >
      </div>
      <div class="cursor-pointer">
        <span v-if="locale != 'pl'" @click="setLocale('pl')">PL</span>
        <span v-if="locale != 'en'" @click="setLocale('en')">EN</span>
      </div>
      <div class="text-right w-full flex-col">
        <div class="text-lg">{{ getCurrentDayName() }}</div>
        <div class="text-sm">{{ getCurrentDateDDMMYYYY() }}</div>
      </div>
    </div>
  </nav>
</template>
