function formatarTelefone(ddi, numeroCompleto) {
  const numeroLimpo = numeroCompleto.replace(/\D/g, '')

  if (ddi === '55') {
    const ddd = numeroLimpo.substring(0, 2)
    const numero = numeroLimpo.substring(2)
    return { ddd, numero }
  }

  return { ddd: '', numero: numeroLimpo }
}

function limparCaracteres(conteudo) {
  if (!conteudo) return ''
  return conteudo.replace(/\D/g, '')
}

function formatarNome(nome) {
  if (!nome) return ''

  return nome
    .toLowerCase()
    .split(' ')
    .map((palavra) => {
      if (palavra.length > 0) {
        return palavra.charAt(0).toUpperCase() + palavra.slice(1)
      }
      return palavra
    })
    .join(' ')
}

function formatarData(data) {
  if (!data) return ''
  const partes = data.split('/')
  if (partes.length !== 3) return ''
  const [dia, mes, ano] = partes
  const diaFormatado = dia.padStart(2, '0')
  const mesFormatado = mes.padStart(2, '0')
  return `${ano}-${mesFormatado}-${diaFormatado}T00:00:00.000Z`
}

function formatarDataLimpa(data) {
  if (!data) return null

  const dataLimpa = data.trim()

  const partes = dataLimpa.split('/')
  if (partes.length !== 3) return null

  const [dia, mes, ano] = partes

  if (!dia || !mes || !ano) return null
  if (ano.length !== 4) return null

  const diaFormatado = dia.padStart(2, '0')
  const mesFormatado = mes.padStart(2, '0')

  return `${ano}-${mesFormatado}-${diaFormatado}`
}

function formatarNumero(valor) {
  if (!valor) return null
  return Number(String(valor).replace(/\D/g, ''))
}

function formatarNumeroPreco(valor) {
  if (!valor) return null

  const numeroLimpo = String(valor).replace(/\D/g, '')

  const parteInteira = numeroLimpo.slice(0, -2)
  const parteDecimal = numeroLimpo.slice(-2)

  return Number(`${parteInteira}.${parteDecimal}`)
}

function formatarTextoString(texto) {
  if (!texto) return ''
  const semAcento = texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  return semAcento.toLowerCase()
}

function renderizarTelefone(telefone) {
  if (!telefone?.ddi || !telefone?.numero) return ''

  const numeroLimpo = telefone.numero.replace(/\D/g, '')

  if (telefone.ddi === '55') {
    const parte1 = numeroLimpo.slice(0, -4)
    const parte2 = numeroLimpo.slice(-4)
    return `${telefone.ddi} (${telefone.ddd}) ${parte1}-${parte2}`
  }

  return `${telefone.ddi} ${telefone.ddd} ${numeroLimpo}`
}

function renderizarCpf(cpf) {
  if (!cpf) return ''
  const numero = cpf.replace(/\D/g, '')
  if (numero.length !== 11) return cpf

  return numero.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
}

function renderizarCnpj(cnpj) {
  if (!cnpj) return ''
  const numero = cnpj.replace(/\D/g, '')
  if (numero.length !== 14) return cnpj

  return numero.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
}

function renderizarPreco(preco) {
  if (!preco) return '0,00'

  return new Intl.NumberFormat('pt-BR', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true
  }).format(preco)
}

function renderizarData(isoDate) {
  if (!isoDate) return ''

  const data = new Date(isoDate)
  const agora = new Date()
  const diffMs = agora - data
  const diffMinutes = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)

  if (diffHours < 24) {
    if (diffMinutes < 60) {
      return `há ${diffMinutes} minuto${diffMinutes !== 1 ? 's' : ''}`
    } else {
      return `há ${diffHours} hora${diffHours !== 1 ? 's' : ''}`
    }
  } else {
    const day = String(data.getDate()).padStart(2, '0')
    const month = String(data.getMonth() + 1).padStart(2, '0')
    const year = String(data.getFullYear()).slice(-2)
    const hours = String(data.getHours()).padStart(2, '0')
    const minutes = String(data.getMinutes()).padStart(2, '0')
    return `${day}/${month}/${year} ás ${hours}h${minutes}`
  }
}

function renderizarDataLimpa(data) {
  if (!data) return ''

  const dataLimpa = data.includes('T') ? data.split('T')[0] : data

  const partes = dataLimpa.split('-')
  if (partes.length !== 3) return ''

  const [ano, mes, dia] = partes
  const diaFormatado = dia.padStart(2, '0')
  const mesFormatado = mes.padStart(2, '0')

  return `${diaFormatado}/${mesFormatado}/${ano}`
}

function renderizarPorcentagem(valor) {
  if (!valor) return 0

  const numero = String(valor).replace(/\D/g, '')
  const valorFormatado = Number((Number(numero) / 100).toFixed(2))

  return valorFormatado
}

function limitarCaracteres(valor, quantidade) {
  if (!valor) return ''
  valor = String(valor)
  if (valor.length <= quantidade) return valor
  return `${valor.substring(0, quantidade)}...`
}

function formatarCpfCnpj(valor) {
  if (!valor) return ''

  const numeroLimpo = valor.replace(/\D/g, '')

  if (numeroLimpo.length <= 11) {
    return numeroLimpo
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
  } else {
    return numeroLimpo
      .replace(/(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1/$2')
      .replace(/(\d{4})(\d{1,2})$/, '$1-$2')
  }
}

function formatarCep(valor) {
  if (!valor) return ''

  const numeroLimpo = valor.replace(/\D/g, '')

  return numeroLimpo.replace(/(\d{5})(\d{1,3})$/, '$1-$2')
}

function formatarDataNascimento(valor) {
  if (!valor) return ''

  const numeroLimpo = valor.replace(/\D/g, '')

  return numeroLimpo
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{2})\/(\d{2})(\d)/, '$1/$2/$3')
    .replace(/(\d{2})\/(\d{2})\/(\d{4}).*/, '$1/$2/$3')
}

function renderizarCpfCnpj(valor) {
  if (!valor) return ''

  const numeroLimpo = valor.replace(/\D/g, '')

  if (numeroLimpo.length === 11) {
    return numeroLimpo
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
  } else if (numeroLimpo.length === 14) {
    return numeroLimpo
      .replace(/(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1/$2')
      .replace(/(\d{4})(\d{1,2})$/, '$1-$2')
  } else {
    return numeroLimpo
  }
}

function renderizarPrecoCampo(valor) {
  if (!valor) return ''

  const valorEmCentavos = Math.round(Number(valor) * 100)

  return valorEmCentavos.toString()
}

function validarEmail(email) {
  if (!email) return false

  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return regex.test(email)
}

function validarCpf(cpf) {
  if (!cpf) return false

  const numeroLimpo = cpf.replace(/\D/g, '')

  if (numeroLimpo.length !== 11) return false

  if (/^(\d)\1{10}$/.test(numeroLimpo)) return false

  let soma = 0
  for (let i = 0; i < 9; i++) {
    soma += parseInt(numeroLimpo.charAt(i)) * (10 - i)
  }
  let resto = 11 - (soma % 11)
  let digito1 = resto >= 10 ? 0 : resto

  if (parseInt(numeroLimpo.charAt(9)) !== digito1) return false

  soma = 0
  for (let i = 0; i < 10; i++) {
    soma += parseInt(numeroLimpo.charAt(i)) * (11 - i)
  }
  resto = 11 - (soma % 11)
  let digito2 = resto >= 10 ? 0 : resto

  if (parseInt(numeroLimpo.charAt(10)) !== digito2) return false

  return true
}

function validarCnpj(cnpj) {
  if (!cnpj) return false

  const numeroLimpo = cnpj.replace(/\D/g, '')

  if (numeroLimpo.length !== 14) return false

  if (/^(\d)\1{13}$/.test(numeroLimpo)) return false

  let tamanho = numeroLimpo.length - 2
  let numeros = numeroLimpo.substring(0, tamanho)
  const digitos = numeroLimpo.substring(tamanho)
  let soma = 0
  let pos = tamanho - 7

  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--
    if (pos < 2) pos = 9
  }

  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11)
  if (resultado != digitos.charAt(0)) return false

  tamanho = tamanho + 1
  numeros = numeroLimpo.substring(0, tamanho)
  soma = 0
  pos = tamanho - 7

  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--
    if (pos < 2) pos = 9
  }

  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11)
  if (resultado != digitos.charAt(1)) return false

  return true
}

function validarCpfCnpj(valor) {
  if (!valor) return false

  const numeroLimpo = valor.replace(/\D/g, '')

  if (numeroLimpo.length === 11) {
    return validarCpf(numeroLimpo)
  } else if (numeroLimpo.length === 14) {
    return validarCnpj(numeroLimpo)
  }

  return false
}

export { formatarTelefone, limparCaracteres, formatarNome, formatarData, formatarDataLimpa, formatarNumeroPreco, formatarNumero, formatarTextoString, renderizarTelefone, renderizarCpf, renderizarCnpj, renderizarPreco, renderizarData, renderizarDataLimpa, renderizarPorcentagem, limitarCaracteres, formatarCpfCnpj, formatarCep, formatarDataNascimento, renderizarCpfCnpj, renderizarPrecoCampo, validarEmail, validarCpf, validarCnpj, validarCpfCnpj }
