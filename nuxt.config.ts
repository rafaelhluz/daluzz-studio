export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  app: {
    head: {
      htmlAttrs: { lang: 'pt-BR' },
      title: 'DALUZZ studio | Design, estratégia e desenvolvimento',
      meta: [
        { name: 'description', content: 'Criamos marcas, sites e experiências digitais memoráveis para negócios que querem fugir do comum.' },
        { name: 'theme-color', content: '#000000' }
      ]
    }
  }
})
