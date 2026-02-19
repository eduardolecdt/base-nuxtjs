<template>
  <div id="tela">
    <IndexSectionHero />
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'web'
})

useHead({
  title: 'Base NuxtJS | Home',
  meta: [
    { name: 'description', content: 'Projeto base em NuxtJS.' },
    { property: 'og:title', content: 'Base NuxtJS | Home' },
    { property: 'og:description', content: 'Projeto base em NuxtJS.' }
  ]
})
</script>
