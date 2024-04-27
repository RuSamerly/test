<template>
  <div
    class="content-item"
    :class="{
      'content-item--last': lastItem,
    }"
  >
      <div
        class="content-item__label"
        :class="{
          'content-item__label--margin': Boolean(item.text)
        }"
      >
        <div class="content-item__label-inner">{{ item.label }}</div>
        <div class="content-item__label-buttons">
          <button
            class="content-item__label-button content-item__label-button-ok"
            :class="{
              'content-item__label-button-ok--completed': item.completed
            }"
            v-show="!deleteMode"
            @click="completeItem"
          >
          </button>
          <button
            class="content-item__label-button content-item__label-button-edit"
            v-show="!deleteMode"
            @click="editItem"
          >
          </button>
          <button
            class="content-item__label-button content-item__label-button-del"
            v-show="!deleteMode"
            @click="deleteItem"
          >
          </button>
          <div
            v-if="deleteMode"
          >
            <input
              type="checkbox"
              ref="deleteCheck"
              class="content-item__label-check"
              v-model="deleteCheckChecked"
              @change="deleteCheckChange"
            >
          </div>
        </div>
      </div>

      <div
        class="content-item__text"
        v-if="item.text"
      >
        {{ item.text }}
      </div>

      <div
        class="content-item__duedate"
        v-if="item.dueDate && 0"
      >
        {{ item.dueDate }}
      </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { DeleteCheck, Todo } from '@/models/types';
import { useTodoStore } from '@/stores/todo';

const store = useTodoStore();

defineOptions({
  name: 'ContentItem',
});

const props = defineProps<{
  item: Todo,
  lastItem: boolean,
  deleteMode: boolean,
}>();

const emit = defineEmits(['edit', 'deleteCheck']);

const editItem = () => {
  emit('edit', props.item.id);
}

const deleteItem = () => {
  store.deleteItems([props.item.id]);
}

const completeItem = () => {
  store.toggleCompleted(props.item.id);
}

const deleteCheckChecked = ref(false);
const deleteCheck = ref(null);

watch(() => props.deleteMode, (val) => {
  if (!val) {
    deleteCheckChecked.value = false;
  }
});

const deleteCheckChange = () => {
  emit('deleteCheck', {
    id: props.item.id,
    delete: deleteCheckChecked.value,
  } as DeleteCheck);
}
</script>

<style lang="sass">
.content-item
  padding-bottom: 10px
  border-bottom: 1px solid #dcdcdc
  margin-bottom: 10px

  &--last
    border-bottom: none
    padding-bottom: 0
    margin-bottom: 0

.content-item__label
  display: flex
  flex-flow: row nowrap

  &-inner
    font-size: 18px
    flex-grow: 1

  &-check
    margin: 0 5px 0 0
    height: 24px
    width: 20px
    display: block

  &-buttons
    display: flex
    flex-flow: row nowrap
    column-gap: 10px
    align-items: center

  &-button
    border: none
    background-color: unset
    width: 24px
    height: 24px
    min-width: 24px
    min-height: 24px
    cursor: pointer
    background-size: cover
    opacity: 0.3

    &:hover
      opacity: 1

    &-ok
      background-image: url('@/assets/ok.png')
    
    &-ok--completed
      opacity: 1

    &-del
      background-image: url('@/assets/trash.png')

    &-edit
      background-image: url('@/assets/edit.png')    

  &--margin
    margin-bottom: 10px

.content-item__text
  font-size: 16px
  color: #454545
</style>
