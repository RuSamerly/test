import { defineStore } from 'pinia'
import { type Todo, type Tag, ShowMode, } from '@/models/types'
import CONSTANTS from '@/constants'

export const useTodoStore = defineStore('todo', {
  state: () => ({
    items: [] as Todo[],
    tags: [] as Tag[],
    selectedTag: -2 as number,
    time: Date.now(),
    showMode: ShowMode.All as ShowMode,
  }),

  getters: {
    editTags: (state): Tag[] => {
      return [
        {
          id: CONSTANTS.TAGS_NO_TAG,
          name: CONSTANTS.TAGS_NO_TAG_TITLE
        },
      ].concat(state.tags);
    },

    allTags: (state): Tag[] => {
      return [
        {
          id: CONSTANTS.TAGS_ALL,
          name: CONSTANTS.TAGS_ALL_TITLE,
        },
        {
          id: CONSTANTS.TAGS_NO_TAG,
          name: CONSTANTS.TAGS_NO_TAG_TITLE
        },
      ].concat(state.tags);
    },

    filteredItems: (state): Todo[] => {
      return state.items.filter((item) => {
        if (state.showMode === ShowMode.OnlyDone && !item.completed) {
          return false;
        }

        if (state.showMode === ShowMode.OnlyPending && item.completed) {
          return false;
        }

        if (state.selectedTag === CONSTANTS.TAGS_NO_TAG) {
          if (item.tag !== null) {
            return false;
          }
        } else if (state.selectedTag !== CONSTANTS.TAGS_ALL) {
          if (item.tag !== state.selectedTag) {
            return false;
          }
        }

        return true;
      });
    },
  },

  actions: {
    saveBase() {
      const s = JSON.stringify({
        items: this.items,
        tags: this.tags,
      });

      localStorage.setItem(CONSTANTS.LOCAL_STORAGE_NAME, s);
    },

    loadBase() {
      const s = localStorage.getItem(CONSTANTS.LOCAL_STORAGE_NAME);

      if (s !== null) {
        const base = JSON.parse(s);
        this.items = base.items;
        this.tags = base.tags;
      }
    },

    // updateTime() {
    //   this.time = Date.now();
    // },

    // startTimer() {
    //   setTimeout(() => {
    //     this.time = Date.now();
    //     this.startTimer();
    //   }, 3600000);
    // },

    toggleCompleted(id: number) {
      this.items.forEach((item, i) => {
        if (item.id === id) {
          this.items[i].completed = !this.items[i].completed;
        }
      });

      this.saveBase();
    },

    editItem(id: number, data: {
      label: string,
      text: string,
      tag: null | number,
    }) {
      this.items.forEach((item, i) => {
        if (item.id === id) {
          this.items[i].label = data.label;
          this.items[i].text = data.text;
          this.items[i].tag = data.tag !== null && data.tag >= 0 ? data.tag : null;
          this.items[i].completed = false;
        }
      });

      this.saveBase();
    },

    addItem(data: {
      label: string,
      text: string,
      tag: null | number,
    }) {
      let maxItemId = 0;

      this.items.forEach((item) => {
        if (item.id > maxItemId) {
          maxItemId = item.id;
        }
      });

      this.items.push({
        id: maxItemId + 1,
        label: data.label,
        text: data.text,
        tag: data.tag !== null && data.tag >= 0 ? data.tag : null,
        completed: false,
        dueDate: Date.now(),
      });

      this.saveBase();
    },

    deleteTag(id: number) {
      let pos: null | number = null;
      
      this.tags.forEach((tag, i) => {
        if (tag.id === id) {
          pos = i;
        }
      });

      if (pos !== null) {
        this.tags.splice(pos, 1);
        this.items.forEach((item, i) => {
          if (item.tag === id) {
            this.items[i].tag = null;
          }
        });
      }

      this.saveBase();
    },

    addTag(name: string): string {
      if (this.tags.some((tag) => {
        if (tag.name.toLowerCase() === name.toLowerCase()) {
          return true;
        }
      })) {
        return 'Такой тэг уже есть';
      }

      if (
        name.toLowerCase() === CONSTANTS.TAGS_ALL_TITLE.toLowerCase()
        || name.toLowerCase() === CONSTANTS.TAGS_NO_TAG_TITLE.toLowerCase()
      ) {
        return 'Не надо так делать, пожалуйста';
      }

      let maxTagId = 0;

      this.tags.forEach((tag) => {
        if (tag.id > maxTagId) {
          maxTagId = tag.id;
        }
      });

      this.tags.push({
        id: maxTagId + 1,
        name: name,
      });

      this.saveBase();
      return '';
    },

    findItem(id: number): Todo | null {
      let res: null | Todo = null;

      this.items.forEach((item, i) => {
        if (item.id === id) {
          res = item;
        }
      });

      return res;
    },

    deleteItems(ids: number[]) {
      ids.forEach((id) => {
        let pos: null | number = null;
  
        this.items.forEach((item, i) => {
          if (item.id === id) {
            pos = i;
          }
        });
  
        if (pos !== null) {
          this.items.splice(pos, 1);
        }
      });

      this.saveBase();
    },

    mockData() {
      this.tags = [
        {
          id: 0,
          name: 'Личное',
        },
        {
          id: 1,
          name: 'Работа'
        },
      ];

      this.selectedTag = CONSTANTS.TAGS_ALL;

      this.items = [
        {
          id: 0,
          label: 'Test 1',
          text: '',
          completed: false,
          dueDate: null,
          tag: null,
        },
        {
          id: 1,
          label: 'Personal test 1',
          text: '',
          completed: false,
          dueDate: null,
          tag: 0,
        },

        {
          id: 2,
          label: 'Personal test 2',
          text: 'text',
          completed: false,
          dueDate: null,
          tag: 0,
        },
        {
          id: 3,
          label: 'Work test 1 completed',
          text: '',
          completed: true,
          dueDate: null,
          tag: 1,
        },
        {
          id: 4,
          label: 'Work test 2',
          text: 'text',
          completed: false,
          dueDate: null,
          tag: 1,
        },
      ];

      this.saveBase();
    },
  }
});
