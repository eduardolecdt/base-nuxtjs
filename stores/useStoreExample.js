import { defineStore } from 'pinia'

export const useStoreExample = defineStore('storeExample', {
  state: () => {
    return {
      dado: []
    }
  },
  actions: {}
})
