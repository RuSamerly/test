<template>
  <Teleport to="body">
    <div
      class="overlay"
      @click.self="emit('close')"
    >
      <div
        class="modal-edit"
      >
        <p>Заголовок {{ id }}</p>
        <input
          type="text"
          v-model="label"
          :class="{
            'modal-edit__label-error': labelError,
          }"
        >

        <p>Текст</p>
        <input type="text" v-model="text">

        <p>Тег</p>
        <div class="modal-edit__tags">
          <div
            v-for="tag in editTags"
            :key="tag.id"
            @click="currentTag = tag.id"
            class="modal-edit__tag"
            :class="{
              'modal-edit__tag--selected': tag.id === currentTag
            }"
          >
            {{ tag.name }}
          </div>
        </div>

        <div class="modal-edit__buttons">
          <button
            class="modal-edit__button modal-edit__button-ok"
            @click="ok"
          >
          </button>
          <button
            class="modal-edit__button modal-edit__button-cancel"
            @click="emit('close')"
          >
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useTodoStore } from '@/stores/todo';
import { type Todo } from '@/models/types'
import { storeToRefs } from 'pinia';
import CONSTANTS from '@/constants';

const store = useTodoStore();
const { editTags } = storeToRefs(store);

defineOptions({
  name: 'ModalEdit',
});

const emit = defineEmits(['close']);

const props = defineProps<{
  id: null | number,
}>();

const label = ref('');
const labelError = ref(false);
const text = ref('');
const currentTag = ref<null | number>(CONSTANTS.TAGS_NO_TAG);

onMounted(() => {
  if (props.id !== null) {
    const item: Todo | null = store.findItem(props.id);
    console.log(item);

    if (item !== null) {
      label.value = item.label;
      text.value = item.text;
      if (item.tag) {
        currentTag.value = item.tag;
      } else {
        currentTag.value = CONSTANTS.TAGS_NO_TAG;
      }
    }
  }
});

const ok = () => {
  if (!label.value) {
    labelError.value = true;
    setTimeout(() => {
      labelError.value = false;
    }, 1000);
    return;
  }

  if (props.id) {
    // edit
    store.editItem(props.id, {
      label: label.value,
      text: text.value,
      tag: currentTag.value,
    });
  } else {
    // created
    store.addItem({
      label: label.value,
      text: text.value,
      tag: currentTag.value,
    });
  }

  emit('close');
}
</script>

<style lang="sass">
.overlay
  position: absolute
  left: 0
  top: 0
  width: 100%
  height: 100%
  background-color: #00000099
  display: flex
  flex-flow: row nowrap
  align-items: center
  justify-content: center

.modal-edit
  width: 90%
  max-width: 600px
  padding: 20px
  border: 1px solid #b9b9b9
  border-radius: 6px
  background-color: white

  p
    margin-top: 0
    margin-bottom: 10px

  input
    display: block
    width: 100%
    font-size: 16px
    padding: 4px 6px
    margin-bottom: 10px
    border: 1px solid black

  &__label-error
    border: 1px solid red !important

  &__tags
    display: flex
    flex-flow: row nowrap
    column-gap: 10px
    margin-bottom: 10px

  &__tag
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

  &__buttons
    display: flex
    flex-flow: row nowrap
    justify-content: flex-end
    column-gap: 10px

  &__button
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

    &-ok
      background-image: url('@/assets/ok.png')

    &-cancel
      background-image: url('@/assets/cancel.png')
</style>
  