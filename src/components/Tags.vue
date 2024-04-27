<template>
  <div class="tags">
    <TagsItem
      v-for="tag in allTags"
      :key="tag.id"
      :tag="tag"
      :selected="selectedTag === tag.id"
      :deleteMode="deleteMode && tag.id >= 0"
      @click="tagClick"
    />
  </div>
  <div class="tags-bottom">
    <button
      class="tags-bottom__icon tags-bottom__icon-add"
      @click="newTag"
    >
    </button>
    <button
      class="tags-bottom__icon tags-bottom__icon-del"
      @click="deleteMode = !deleteMode"
    >
    </button>
    <div
      class="tags-bottom__new"
      v-show="newTagVisible"
    >
      <input
        v-model="newTagName"
        class="tags-bottom__new-input"
        @keypress="newTagKeypress"
      >
      <div class="tags-bottom__new-buttons">
        <button
          class="tags-bottom__new-icon tags-bottom__new-icon-ok"
          @click="newTagOk"
        >
        </button>
        <button
          class="tags-bottom__new-icon tags-bottom__new-icon-cancel"
          @click="newTagCancel"
        >
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TagsItem from './TagsItem.vue';
import { useTodoStore } from '@/stores/todo';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const store = useTodoStore();
const { allTags, selectedTag } = storeToRefs(store);

defineOptions({
  name: 'Tags',
});

const deleteMode = ref(false);

const tagClick = (id: number) => {
  if (deleteMode.value && id >= 0) {
    store.deleteTag(id);
  } else {
    selectedTag.value = id;
  }

  deleteMode.value = false;
};

const newTagVisible = ref(false);

const newTag = () => {
  newTagVisible.value = true;
};

const newTagName = ref('');

const newTagKeypress = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    newTagOk();
  }
};

const newTagOk = () => {
  let msg = store.addTag(newTagName.value);

  if (msg) {
    alert(msg);
  } else {
    newTagName.value = '';
    newTagVisible.value = false;
  }
};

const newTagCancel = () => {
  newTagName.value = '';
  newTagVisible.value = false;
};

</script>

<style lang="sass">
.tags
  display: flex
  flex-flow: column nowrap
  row-gap: 6px
  margin-bottom: 20px

.tags-bottom
  display: flex
  flex-flow: row nowrap
  justify-content: space-between
  position: relative

.tags-bottom__icon
  border: none
  background-color: unset
  width: 24px
  min-width: 24px
  height: 24px
  min-height: 24px
  cursor: pointer
  background-size: cover
  opacity: 0.3

  &:hover
    opacity: 1

  &-del
    background-image: url('@/assets/trash.png')

  &-add
    background-image: url('@/assets/add.png')

.tags-bottom__new
  position: absolute
  border-radius: 6px
  border: 1px solid black
  background-color: white
  padding: 10px
  width: calc(100% + 20px)
  left: -10px
  top: -40px
  height: calc(100% + 60px)

  &-input
    display: block
    width: 100%
    font-size: 16px
    padding: 4px 6px
    margin-bottom: 10px

  &-buttons
    display: flex
    flex-flow: row nowrap
    justify-content: space-between

  &-icon
    border: none
    background-color: unset
    width: 24px
    min-width: 24px
    height: 24px
    min-height: 24px
    cursor: pointer
    background-size: cover

    &-ok
      background-image: url('@/assets/ok.png')

    &-cancel
      background-image: url('@/assets/cancel.png')
</style>
