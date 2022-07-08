<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { useSettings } from './stores/settings';
import { useTodos } from './stores/todos';
const { getTodos } = useTodos();
const { isDark } = useSettings();

onBeforeMount(() => {
  isDark();
  getTodos();
});
</script>

<template>
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
  <router-view></router-view>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}
</style>
