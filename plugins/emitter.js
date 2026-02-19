import mitt from 'mitt'

export default defineNuxtPlugin(() => {
  const emitter = mitt()

  return {
    provide: {
      emitter: emitter
    }
  }
})
