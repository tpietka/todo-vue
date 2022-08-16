<script setup lang="ts">
import { toRefs } from 'vue';
import { useTodos } from '../stores/todos';
const { search } = toRefs(useTodos());
</script>

<template>
  <div
    class="lg:w-1/3 h-12 bg-transparent rounded-xl border-slate-800 dark:border-slate-300 items-center border-2 mx-auto relative flex justify-center"
  >
    <span
      class="w-4 -z-0 pointer-events-none material-icons absolute left-0 mx-4 right-0 not-selectable text-slate-800 dark:text-slate-300"
      >search</span
    >
    <input
      type="text"
      class="px-12 w-full focus:outline-none bg-transparent text-slate-800 dark:text-slate-300"
      v-model="search"
      :placeholder="$t('message.search')"
    /><span
      @click="search = ''"
      v-if="search"
      class="material-icons abolute cursor-pointer right-0 mx-4 text-slate-800 dark:text-slate-300"
      >clear</span
    >
  </div>
</template>
