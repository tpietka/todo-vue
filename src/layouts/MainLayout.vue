<script setup lang="ts">
import NavBar from '../components/NavBar.vue';
</script>

<template>
  <div class="h-full w-full text-slate-800 dark:text-slate-100">
    <nav-bar></nav-bar>
    <div class="h-full lg:w-10/12 lg:mx-auto py-4 mb-10 lg:py-8">
      <router-view></router-view>
    </div>
  </div>
</template>

<style></style>
