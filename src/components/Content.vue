<template>
  <div class="content">
    <ContentItem
      v-for="(item, index) in filteredItems"
      :key="item.id"
      :item="item"
      :last-item="index === filteredItems.length - 1"
      :deleteMode="deleteMode"
      @deleteCheck="deleteCheck"
      @edit="edit"
    />
  </div>
</template>

<script setup lang="ts">
import ContentItem from '@/components/ContentItem.vue';
import { useTodoStore } from '@/stores/todo';
import { storeToRefs } from 'pinia';
import { type DeleteCheck } from '@/models/types';

const store = useTodoStore();
const { filteredItems } = storeToRefs(store);

defineOptions({
  name: 'Content',
});

const emit = defineEmits(['edit', 'deleteCheck']);

const props = defineProps<{
  deleteMode: boolean,
}>();

const deleteCheck = (data: DeleteCheck) => {
  emit('deleteCheck', data);
}

const edit = (id: number) => {
  emit('edit', id);
}
</script>

<style lang="sass">

  
</style>
