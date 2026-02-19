<template>
  <NuxtLink :to="props.link" :class="props.cor" v-if="props.link">
    {{ texto }}
    <div class="icone">
      <Svgs :nome="icone" />
    </div>
  </NuxtLink>
  <button v-else :disabled="carregando" :class="props.cor">
    {{ texto }}
    <div class="icone">
      <Svgs :nome="icone" />
    </div>
  </button>
</template>

<script setup>
const props = defineProps({
  texto: {
    type: String,
    required: true
  },
  carregando: {
    type: Boolean,
    default: false
  },
  icone: {
    type: String,
    default: 'seta'
  },
  cor: {
    type: String,
    default: 'vermelho'
  },
  link: {
    type: String,
    default: null
  }
})
</script>

<style lang="sass" scoped>
button, a
  display: flex
  align-items: center
  justify-content: center
  padding: 10px 10px 10px 30px
  border-radius: 50px
  font-family: var(--semibold)
  font-size: var(--f2)
  color: var(--cor-branco)
  transition: all 0.3s

  &:hover

    .icone
      background-color: #ffffff40

      svg
        transform: scale(1.2)

  &.vermelho
    background-color: var(--cor-vermelho)

    &:hover
      background-color: var(--cor-vermelho-escuro)

  &.azul
    background-color: var(--cor-azul)

    &:hover
      background-color: var(--cor-azul-escuro)

  .icone
    display: flex
    align-items: center
    justify-content: center
    width: 40px
    height: 40px
    border-radius: 50px
    background-color: #ffffff20
    margin: 0 0 0 30px
    transition: all 0.3s

    svg
      width: 16px
      max-height: 16px
      fill: var(--cor-branco)
      transition: all 0.3s

@media screen and (max-width: 1000px)
</style>
