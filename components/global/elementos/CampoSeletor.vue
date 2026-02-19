<template>
  <div class="camposeletor" :class="{ aberto: state.aberto, preenchido: modelValue, desabilitado: disabled }">
    <div class="campo" @click="toggleAberto">
      <label v-if="label">
        {{ label }}
        <span v-if="obrigatorio">*</span>
      </label>
      <div class="valor">
        <p v-if="modelValue">{{ textoSelecionado }}</p>
      </div>
      <div class="icone">
        <Svgs nome="setinha" />
      </div>
    </div>
    <Transition name="slide">
      <div class="opcoes" v-if="state.aberto">
        <div class="busca" v-if="busca">
          <input
            type="text"
            v-model="state.termoBusca"
            placeholder="Buscar..."
            @click.stop
            ref="inputBusca"
          />
        </div>
        <div class="lista">
          <div class="opcao" v-for="(opcao, index) in opcoesFiltradas" :key="index" @click="selecionarOpcao(opcao)" :class="{ ativa: opcao.value === modelValue || opcao === modelValue }">
            <p>{{ opcao.label || opcao }}</p>
          </div>
          <div class="vazio" v-if="opcoesFiltradas.length === 0">
            <p>Nenhum resultado encontrado</p>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
const props = defineProps({
  label: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  modelValue: { type: [String, Number], default: '' },
  obrigatorio: { type: Boolean, default: false },
  opcoes: { type: Array, default: () => [] },
  busca: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false }
})

const emit = defineEmits(['update:modelValue'])

const inputBusca = ref(null)

const state = reactive({
  aberto: false,
  termoBusca: ''
})

const textoSelecionado = computed(() => {
  const opcao = props.opcoes.find((o) => (o.value || o) === props.modelValue)
  return opcao?.label || opcao || props.modelValue
})

const opcoesFiltradas = computed(() => {
  if (!props.busca || !state.termoBusca) {
    return props.opcoes
  }

  const termo = state.termoBusca.toLowerCase().trim()
  return props.opcoes.filter((opcao) => {
    const texto = (opcao.label || opcao).toLowerCase()
    return texto.includes(termo)
  })
})

const toggleAberto = () => {
  if (props.disabled) return
  state.aberto = !state.aberto

  if (state.aberto && props.busca) {
    nextTick(() => {
      inputBusca.value?.focus()
    })
  }
}

const selecionarOpcao = (opcao) => {
  const valor = opcao.value || opcao
  emit('update:modelValue', valor)
  state.aberto = false
  state.termoBusca = ''
}

onMounted(() => {
  document.addEventListener('click', fecharAoClicarFora)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', fecharAoClicarFora)
})

const fecharAoClicarFora = (evento) => {
  const elemento = evento.target.closest('.camposeletor')
  if (!elemento) {
    state.aberto = false
  }
}
</script>

<style lang="sass" scoped>
.camposeletor
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
    position: relative

    &:hover
      border-color: var(--cor-azul)

    label
      font-family: var(--regular)
      font-size: var(--f2)
      color: var(--cor-cinza)
      position: absolute
      top: 50%
      left: 20px
      transform: translateY(-50%)
      transition: all 0.3s
      pointer-events: none
      background-color: var(--cor-branco)
      padding: 0 5px

      span
        color: var(--cor-vermelho)

    .valor
      display: flex
      align-items: center
      justify-content: flex-start
      width: 100%

      p
        font-family: var(--regular)
        font-size: var(--f2)
        color: var(--cor-preto)

        &.placeholder
          color: var(--cor-cinza)
          opacity: 0.6

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

  &.preenchido, &.aberto
    .campo
      label
        top: 0
        left: 15px
        font-size: var(--f1)
        color: var(--cor-azul)

  &.desabilitado
    .campo
      opacity: 0.5
      cursor: not-allowed
      pointer-events: none

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
    max-height: 300px
    overflow: hidden
    position: absolute
    top: 100%
    left: 0
    z-index: 10

    .busca
      display: flex
      align-items: center
      justify-content: center
      width: 100%
      padding: 15px
      border-bottom: 1px solid #00000020
      position: sticky
      top: 0
      background-color: var(--cor-branco)
      z-index: 2

      input
        width: 100%
        padding: 10px 15px
        border-radius: 8px
        border: 1px solid #00000020
        font-family: var(--regular)
        font-size: var(--f2)
        color: var(--cor-preto)
        outline: none
        transition: all 0.3s

        &:focus
          border-color: var(--cor-azul)

        &::placeholder
          color: var(--cor-cinza)
          opacity: 0.6

    .lista
      display: flex
      flex-direction: column
      align-items: flex-start
      justify-content: flex-start
      width: 100%
      max-height: 235px
      overflow-y: auto

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

    .vazio
      display: flex
      align-items: center
      justify-content: center
      width: 100%
      padding: 20px

      p
        font-family: var(--regular)
        font-size: var(--f2)
        color: var(--cor-cinza)
        text-align: center

  .slide-enter-active,
  .slide-leave-active
    transition: all 0.3s

  .slide-enter-from,
  .slide-leave-to
    opacity: 0
    transform: translateY(-10px)

@media screen and (max-width: 1000px)
</style>
