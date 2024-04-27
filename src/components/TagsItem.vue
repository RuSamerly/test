<template>
  <div
    class="tag"
    :class="{
      'tag--selected': selected
    }"
    @click="click"
  >
    {{ tag.name }}
    <div
      class="tag--del"
      v-if="deleteMode"
    >
  </div>
  </div>
</template>

<script setup lang="ts">
import type { Tag } from '@/models/types'
import { useTodoStore } from '@/stores/todo';
import { storeToRefs } from 'pinia'

const store = useTodoStore();

const { selectedTag } = storeToRefs(store);

defineOptions({
  name: 'TagsItem',
});

const emit = defineEmits(['click'])

const props = defineProps<{
  tag: Tag,
  selected: boolean,
  deleteMode: boolean,
}>();

const click = () => {
  emit('click', props.tag.id);
}
</script>

<style lang="sass">
.tag
  padding: 10px
  border-radius: 6px
  border: 1px solid black
  cursor: pointer
  text-align: center
  position: relative

  &:hover
    background-color: #f9f1d0

  &--selected
    background-color: #f9f1d0

.tag--del
  width: 24px
  height: 24px
  background-image: url('@/assets/trash.png')
  background-size: cover
  position: absolute
  right: 5px
  top: 50%
  transform: translateY(-50%)
</style>
