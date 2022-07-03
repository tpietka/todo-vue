<script setup lang="ts">
import { Todo } from '../models/todo';
    defineProps<{
      todo: Todo
    }>();
</script>

<template>
  <div>
      {{ todo }}
  </div>
</template>