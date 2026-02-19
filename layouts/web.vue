<template>
  <div id="tela">
    <Nav />
    <main>
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup></script>

<style lang="sass" scoped>
main
  display: flex
  flex-direction: column
  align-items: flex-start
  justify-content: flex-start
  width: 100%

@media screen and (max-width: 1000px)
</style>
