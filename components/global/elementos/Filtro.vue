<template>
  <div class="filtro" :class="{ aberto: aberto, preenchido: modelValue }">
    <div class="campo" @click="toggleAberto">
      <p v-if="modelValue">{{ textoSelecionado }}</p>
      <p v-else class="placeholder">{{ placeholder }}</p>
      <div class="icone">
        <Svgs nome="setinha" />
      </div>
    </div>
    <Transition name="slide">
      <div class="opcoes" v-if="aberto">
        <div class="opcao" v-for="(opcao, index) in opcoes" :key="index" @click="selecionarOpcao(opcao)" :class="{ ativa: opcao.value === modelValue || opcao === modelValue }">
          <p>{{ opcao.label || opcao }}</p>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
const props = defineProps({
  placeholder: { type: String, default: 'Selecionar' },
  modelValue: { type: [String, Number], default: '' },
  opcoes: { type: Array, default: () => [] },
  aberto: { type: Boolean, default: false }
})

const emit = defineEmits(['update:modelValue', 'abrir', 'fechar'])

const textoSelecionado = computed(() => {
  const opcao = props.opcoes.find((o) => (o.value || o) === props.modelValue)
  return opcao?.label || opcao || props.modelValue
})

const toggleAberto = () => {
  if (props.aberto) {
    emit('fechar')
  } else {
    emit('abrir')
  }
}

const selecionarOpcao = (opcao) => {
  const valor = opcao.value || opcao
  emit('update:modelValue', valor)
  emit('fechar')
}

onMounted(() => {
  document.addEventListener('click', fecharAoClicarFora)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', fecharAoClicarFora)
})

const fecharAoClicarFora = (evento) => {
  const elemento = evento.target.closest('.filtro')
  if (!elemento && props.aberto) {
    emit('fechar')
  }
}
</script>

<style lang="sass" scoped>
.filtro
  display: flex
  flex-direction: column
  align-items: flex-start
  justify-content: flex-start
  width: 100%
  position: relative

  .campo
    display: flex
    align-items: center
    justify-content: space-between
    width: 100%
    padding: 0 20px
    height: 50px
    border-radius: 10px
    border: 1px solid #00000020
    background-color: var(--cor-branco)
    cursor: pointer
    transition: all 0.3s

    &:hover
      border-color: var(--cor-azul)

    p
      font-family: var(--regular)
      font-size: var(--f2)
      color: var(--cor-preto)

      &.placeholder
        color: var(--cor-cinza)

    .icone
      display: flex
      align-items: center
      justify-content: center
      margin: 0 0 0 10px
      transition: all 0.3s

      svg
        width: 12px
        max-height: 12px
        transform: rotate(90deg)
        fill: var(--cor-cinza)
        transition: all 0.3s

  &.aberto
    .campo
      border-color: var(--cor-azul)

      .icone
        transform: rotate(180deg)

  .opcoes
    display: flex
    flex-direction: column
    align-items: flex-start
    justify-content: flex-start
    width: 100%
    background-color: var(--cor-branco)
    border-radius: 10px
    border: 1px solid #00000020
    box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1)
    margin: 10px 0 0 0
    max-height: 250px
    overflow-y: auto
    position: absolute
    top: 100%
    left: 0
    z-index: 10

    .opcao
      display: flex
      align-items: center
      justify-content: flex-start
      width: 100%
      padding: 15px 20px
      cursor: pointer
      transition: all 0.3s

      &:hover
        background-color: var(--cor-gelo)

      &.ativa
        background-color: var(--cor-azul)

        p
          color: var(--cor-branco)

      p
        font-family: var(--regular)
        font-size: var(--f2)
        color: var(--cor-preto)

  .slide-enter-active,
  .slide-leave-active
    transition: all 0.3s

  .slide-enter-from,
  .slide-leave-to
    opacity: 0
    transform: translateY(-10px)

@media screen and (max-width: 1000px)
  .filtro
    .campo
      height: 45px
      padding: 0 15px

      p
        font-size: var(--f1)

      .icone
        svg
          width: 10px

    .opcoes
      .opcao
        padding: 12px 15px

        p
          font-size: var(--f1)
</style>
