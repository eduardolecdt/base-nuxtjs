export default defineNuxtRouteMiddleware((to) => {
  if (to.matched.length === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Página não encontrada',
      fatal: true
    })
  }
})
