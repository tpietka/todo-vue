<script setup lang="ts">
import { useTodos } from '../stores/todos';
import Tag from './Tag.vue';

defineProps<{
  tags: string[];
}>();

const { toggleTag } = useTodos();
</script>

<template>
  <div class="flex gap-2 justify-center my-4">
    <div @click="toggleTag(tag)" v-for="tag in tags">
      <tag :tag="tag"></tag>
    </div>
  </div>
</template>
