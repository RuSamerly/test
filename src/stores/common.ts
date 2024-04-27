import { defineStore } from 'pinia'

export const useCommonStore = defineStore('common', {
  state: () => ({}),

  getters: {
    isDesktop: () => {
      try {
        return window.matchMedia('(min-width: 1001px').matches;
      } catch {
        return true;
      }
    }
  },
});
