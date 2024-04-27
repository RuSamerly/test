<template>
  <Todo />
  <button
    @click="mock"
    class="mock-data"
  >
    Заполнить тестовыми данными
  </button>
</template>

<script setup lang="ts">
import Todo from './components/Todo.vue'
import { useTodoStore } from './stores/todo'

const store = useTodoStore();
store.loadBase();

const mock = () => {
  store.mockData();
}
</script>

<style lang="sass">
body
  background-color: #fffaef
  font-family: roboto, serif

*
  box-sizing: border-box
</style>
