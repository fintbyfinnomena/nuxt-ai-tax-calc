// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  compatibilityDate: "2024-07-17",
  components: [
    {
      path: '~/components',
      pathPrefix: false, // [!code ++]
    },
  ],
  modules: [
    '@nuxtjs/tailwindcss',
    "@nuxtjs/google-fonts",
    '@pinia/nuxt',
    "shadcn-nuxt",
    "nuxt-icon-tw"
  ],
  googleFonts: {
    families: {
      'IBM Plex Mono': true,
      'Open+Sans': true,
      'IBM Plex Sans Thai': [400, 700]
    },
  },
  css: [
    '@/assets/css/global.css'
  ],
})