<script setup lang="ts">
import NavBar from '../components/NavBar.vue';
import Filters from '../components/Filters.vue';
</script>

<template>
  <div class="h-full w-full text-slate-800 dark:text-slate-100">
    <nav-bar></nav-bar>
    <div class="h-full lg:w-10/12 lg:mx-auto my-24">
      <filters></filters>
      <router-view></router-view>
    </div>
  </div>
</template>

<style></style>
