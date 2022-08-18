<script setup lang="ts">
import { computed, ref } from 'vue';
import { useTodos } from '../stores/todos';
import Tag from './Tag.vue';

const props = defineProps<{
  tags: string[];
}>();

const tagsToDisplay = computed(() => {
  if (showMore.value) {
    return props.tags;
  }
  let cloneArr = props.tags.slice(0);
  return cloneArr.splice(0, 5);
});

let showMore = ref(false);
const { toggleTag } = useTodos();
</script>

<template>
  <div class="mt-8 flex flex-col items-center gap-4 justify-center">
    <div class="flex gap-2 flex-wrap justify-center">
      <div
        class="flex gap-2 flex-wrap justify-center"
        @click="toggleTag(tag)"
        v-for="tag in tagsToDisplay"
      >
        <tag :tag="tag"></tag>
      </div>
    </div>
    <div class="rotate-90" @click="showMore = !showMore" v-if="tags.length > 0">
      <div v-if="!showMore" class="material-icons cursor-pointer not-selectable">
        unfold_more
      </div>
      <div v-else class="material-icons cursor-pointer not-selectable">unfold_less</div>
    </div>
  </div>
</template>
