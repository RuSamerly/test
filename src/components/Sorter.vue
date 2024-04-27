<template>
  <div class="sorter">
    <input type="radio" :checked="showMode === ShowMode.All" @click="showMode = ShowMode.All" :id="`SHOW-MODE-${ShowMode.All}`">
    <label :for="`SHOW-MODE-${ShowMode.All}`">Все</label>
    <input type="radio" :checked="showMode === ShowMode.OnlyDone" @click="showMode = ShowMode.OnlyDone" :id="`SHOW-MODE-${ShowMode.OnlyDone}`">
    <label :for="`SHOW-MODE-${ShowMode.OnlyDone}`">Завершённые</label>
    <input type="radio" :checked="showMode === ShowMode.OnlyPending" @click="showMode = ShowMode.OnlyPending" :id="`SHOW-MODE-${ShowMode.OnlyPending}`">
    <label :for="`SHOW-MODE-${ShowMode.OnlyPending}`">Незавершённые</label>

  </div>
</template>

<script setup lang="ts">
import { ShowMode } from '@/models/types'
import { useTodoStore } from '@/stores/todo';
import { storeToRefs } from 'pinia';

const store = useTodoStore();
const { showMode } = storeToRefs(store);

defineOptions({
  name: 'Sorter',
});
</script>

<style lang="sass">
.sorter
  display: flex
  flex-flow: row nowrap
  justify-content: flex-end

  & input
    margin-top: 0
    cursor: pointer
    
  & label
    cursor: pointer
    margin-right: 10px
</style>
  