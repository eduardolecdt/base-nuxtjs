<template>
  <div class="campo" :class="{ preenchido: modelValue || state.focado }">
    <label v-if="label">
      {{ label }}
      <span v-if="obrigatorio">*</span>
    </label>
    <input v-if="tipo !== 'textarea'" :type="tipoInput" :placeholder="placeholder" :autocomplete="completar" spellCheck="false" :value="modelValue" @input="aoDigitar" @blur="aoDesfocar" @focus="state.focado = true" :readonly="bloqueado" />
    <textarea v-else-if="tipo === 'textarea'" :placeholder="placeholder" :value="modelValue" @input="aoDigitar" @blur="aoDesfocar" @focus="state.focado = true" :readonly="bloqueado" :rows="linhas"></textarea>
  </div>
</template>

<script setup>
const props = defineProps({
  completar: { type: String, default: 'false' },
  tipo: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
  modelValue: { type: [String, Number], default: '' },
  label: { type: String, default: '' },
  obrigatorio: { type: Boolean, default: false },
  bloqueado: { type: Boolean, default: false },
  mascara: { type: String, default: null },
  linhas: { type: Number, default: 4 }
})

const emit = defineEmits(['update:modelValue', 'blur'])

const state = reactive({
  focado: false
})

const tipoInput = computed(() => {
  if (props.tipo === 'email') return 'email'
  if (props.tipo === 'tel') return 'tel'
  return 'text'
})

const aoDigitar = (evento) => {
  let valor = evento.target.value

  if (props.mascara === 'celular') {
    valor = aplicarMascaraCelular(valor)
  } else if (props.mascara === 'nome') {
    valor = aplicarMascaraNome(valor)
  } else if (props.mascara === 'numero') {
    valor = aplicarMascaraNumero(valor)
  }

  emit('update:modelValue', valor)
}

const aoDesfocar = (evento) => {
  state.focado = false
  emit('blur', evento)
}

const aplicarMascaraCelular = (valor) => {
  valor = valor.replace(/\D/g, '')
  if (valor.length > 11) valor = valor.substring(0, 11)

  if (valor.length <= 10) {
    valor = valor.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3')
  } else {
    valor = valor.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, '($1) $2-$3')
  }

  return valor
}

const aplicarMascaraNome = (valor) => {
  return valor
    .toLowerCase()
    .split(' ')
    .map((palavra) => {
      if (palavra.length <= 2) return palavra
      return palavra.charAt(0).toUpperCase() + palavra.slice(1)
    })
    .join(' ')
}

const aplicarMascaraNumero = (valor) => {
  // Remove tudo que não for número, ponto ou vírgula
  valor = valor.replace(/[^\d.,]/g, '')

  // Substitui vírgula por ponto para padronizar
  valor = valor.replace(',', '.')

  // Garante que só tenha um ponto decimal
  const partes = valor.split('.')
  if (partes.length > 2) {
    valor = partes[0] + '.' + partes.slice(1).join('')
  }

  return valor
}
</script>

<style lang="sass" scoped>
.campo
  display: flex
  flex-direction: column
  align-items: flex-start
  justify-content: flex-start
  width: 100%
  position: relative

  label
    font-family: var(--regular)
    font-size: var(--f2)
    color: var(--cor-cinza)
    position: absolute
    left: 20px
    pointer-events: none
    background-color: var(--cor-branco)
    padding: 0 5px
    transition: all 0.3s

    span
      color: var(--cor-vermelho)

  &:not(:has(textarea))
    label
      top: 50%
      transform: translateY(-50%)

  &:has(textarea)
    label
      top: 20px

  &.preenchido
    label
      top: -5px
      left: 15px
      font-size: var(--f1)
      color: var(--cor-azul)
      transform: translateY(0)

  input, textarea
    width: 100%
    padding: 0 20px
    height: 50px
    border-radius: 10px
    border: 1px solid #00000020
    background-color: var(--cor-branco)
    font-family: var(--regular)
    font-size: var(--f2)
    color: var(--cor-preto)
    transition: all 0.3s

    &::placeholder
      color: transparent

    &:focus
      outline: none
      border-color: var(--cor-azul)

    &:disabled, &:read-only
      background-color: var(--cor-gelo)
      cursor: not-allowed

  textarea
    resize: none
    padding: 15px 20px
    min-height: 100px

@media screen and (max-width: 1000px)
</style>
