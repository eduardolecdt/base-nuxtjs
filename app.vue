<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
useHead({
  htmlAttrs: {
    lang: 'pt-BR'
  },
  title: 'Base NuxtJS',
  meta: [
    { charset: 'utf-8' },
    { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=yes' },
    { name: 'format-detection', content: 'telephone=no' },
    { name: 'HandheldFriendly', content: 'true' },
    { name: 'theme-color', content: '#000000' },
    { name: 'msapplication-TileColor', content: '#000000' },
    { name: 'msapplication-navbutton-color', content: '#000000' },
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
    { name: 'mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-title', content: 'Base NuxtJS' },
    { name: 'application-name', content: 'Base NuxtJS' },
    { name: 'description', content: 'Projeto base em NuxtJS.' },
    { name: 'keywords', content: 'nuxtjs, vue, frontend' },
    { name: 'robots', content: 'index, follow' },
    { name: 'googlebot', content: 'index, follow, max-image-preview:large' },
    { name: 'author', content: 'Base NuxtJS' },
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: 'Base NuxtJS' },
    { property: 'og:description', content: 'Projeto base em NuxtJS.' },
    { property: 'og:site_name', content: 'Base NuxtJS' },
    { property: 'og:locale', content: 'pt_BR' },
    { property: 'og:url', content: 'https://exemplo.com' },
    { property: 'og:image', content: 'https://exemplo.com/favicons/share.png' },
    { property: 'og:image:type', content: 'image/png' },
    { property: 'og:image:width', content: '1920' },
    { property: 'og:image:height', content: '1080' },
    { property: 'og:image:alt', content: 'Base NuxtJS' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Base NuxtJS' },
    { name: 'twitter:description', content: 'Projeto base em NuxtJS.' },
    { name: 'twitter:image', content: 'https://exemplo.com/favicons/share.png' }
  ],
  link: [
    { rel: 'canonical', href: 'https://exemplo.com' },
    { rel: 'icon', type: 'image/x-icon', href: '/favicons/favicon.ico' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicons/favicon-16x16.png' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicons/favicon-32x32.png' },
    { rel: 'icon', type: 'image/png', sizes: '194x194', href: '/favicons/favicon-194x194.png' },
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicons/apple-touch-icon.png' },
    { rel: 'icon', type: 'image/png', sizes: '36x36', href: '/favicons/android-chrome-36x36.png' },
    { rel: 'icon', type: 'image/png', sizes: '48x48', href: '/favicons/android-chrome-48x48.png' },
    { rel: 'icon', type: 'image/png', sizes: '72x72', href: '/favicons/android-chrome-72x72.png' },
    { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicons/android-chrome-96x96.png' },
    { rel: 'icon', type: 'image/png', sizes: '144x144', href: '/favicons/android-chrome-144x144.png' },
    { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/favicons/android-chrome-192x192.png' },
    { rel: 'icon', type: 'image/png', sizes: '256x256', href: '/favicons/android-chrome-256x256.png' },
    { rel: 'icon', type: 'image/png', sizes: '384x384', href: '/favicons/android-chrome-384x384.png' },
    { rel: 'icon', type: 'image/png', sizes: '512x512', href: '/favicons/android-chrome-512x512.png' },
    { rel: 'mask-icon', href: '/favicons/safari-pinned-tab.svg', color: '#000000' }
  ]
})

onMounted(() => {
  if (process.client) {
    watch(
      () => useRoute().path,
      () => {
        window.scrollTo(0, 0)
      }
    )
  }
})
</script>
