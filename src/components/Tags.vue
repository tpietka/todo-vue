<script setup lang="ts">
import { toRefs } from 'vue';
import { useTodos } from '../stores/todos';
import Tag from './Tag.vue';

const { toggleTag } = useTodos();
const { allTags } = toRefs(useTodos());
</script>

<template>
  <div class="flex gap-2 justify-center my-4">
    <div @click="toggleTag(tag)" v-for="tag in allTags">
      <tag :tag="tag"></tag>
    </div>
  </div>
</template>
