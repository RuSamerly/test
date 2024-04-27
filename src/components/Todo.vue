<template>
  <div class="todo">
    <div class="todo-header">
      Тудушка
    </div>
    <div class="todo-content">
      <div class="todo-content__header">
        <Sorter />
      </div>
      <div class="todo-content__wrapper">
        <div class="todo-content__left">
          <Tags />
        </div>
        <div class="todo-content__right">
          <Content
            :deleteMode="deleteMode" 
            @deleteCheck="deleteCheck"
            @edit="editTodo"
          />
        </div>
      </div>
    </div>
    <div class="todo-footer">
      <button
        class="todo-footer__button todo-footer__button-add"
        v-show="!deleteMode"
        @click="addTodo"
      >
      </button>
      <button
        class="todo-footer__button todo-footer__button-delete"
        v-show="!deleteMode"
        @click="deleteTodo"
      >
      </button>
      <button
        class="todo-footer__button todo-footer__button-ok"
        v-show="deleteMode"
        @click="deleteTodoOk"
      >
      </button>
      <button
        class="todo-footer__button todo-footer__button-cancel"
        v-show="deleteMode"
        @click="deleteTodoCancel"
      >
      </button>
    </div>
    <ModalEdit
      v-if="editModalVisible"
      :id="editModalId"
      @close="editModalVisible = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Sorter from '@/components/Sorter.vue';
import Tags from '@/components/Tags.vue';
import Content from '@/components/Content.vue';
import type { DeleteCheck } from '@/models/types';
import { useTodoStore } from '@/stores/todo'
import ModalEdit from '@/components/modal/ModalEdit.vue'

const store = useTodoStore();

defineOptions({
  name: 'Todo',
});

const deleteMode = ref(false);
let deleteArr = [] as DeleteCheck[];

const editModalId = ref<null | number>(null);
const editModalVisible = ref(false);

const addTodo = () => {
  editModalId.value = null;
  editModalVisible.value = true;
};

const editTodo = (id: number) => {;
  editModalId.value = id;
  editModalVisible.value = true;
}

const deleteTodo = () => {
  deleteMode.value = true;
}

const deleteTodoOk = () => {
  const ids: number[] = [];
  deleteArr.forEach((item) => {
    if (item.delete) {
      ids.push(item.id);
    }
  });

  store.deleteItems(ids);
  deleteMode.value = false;
}

const deleteTodoCancel = () => {
  deleteMode.value = false;
  deleteArr = [];
}

const deleteCheck = (data: DeleteCheck) => {
  let found = false;

  deleteArr.forEach((item, i) => {
    if (item.id === data.id) {
      deleteArr[i].delete = data.delete;
      found = true;
    }
  });

  if (!found) {
    deleteArr.push(data);
  }

  console.log(deleteArr);
}
</script>

<style lang="sass">
.todo
  width: 90%
  max-width: 800px
  padding: 20px
  border: 1px solid #b9b9b9
  border-radius: 6px
  margin: 0 auto 20px auto
  box-shadow: 2px 2px 5px 0px #0000004f
  background-color: white

.todo-content
  margin-bottom: 20px

.todo-header
  margin-bottom: 40px
  text-align: center
  font-size: 24px

.todo-content__header
  margin-bottom: 20px

.todo-content__wrapper
  display: flex
  flex-flow: row nowrap
  column-gap: 20px

.todo-content__left
  width: 150px

.todo-content__right
  flex-grow: 1

.todo-footer
  display: flex
  flex-flow: row nowrap
  justify-content: flex-end
  column-gap: 10px

.todo-footer__button
  border: none
  background-color: unset
  width: 40px
  height: 40px
  min-width: 40px
  min-height: 40px
  cursor: pointer
  background-size: cover
  opacity: 0.8

  &:hover
    opacity: 1

  &-add
    background-image: url('@/assets/add.png')

  &-delete
    background-image: url('@/assets/trash.png')

  &-ok
    background-image: url('@/assets/ok.png')

  &-cancel
    background-image: url('@/assets/cancel.png')
</style>
