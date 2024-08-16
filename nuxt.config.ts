const serviceUrl = process.env.SERVICE_URL || "http://localhost:8080";
const gtmId = process.env.GTM_ID;

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  compatibilityDate: "2024-07-17",
  components: [
    {
      path: "~/components",
      pathPrefix: false, // [!code ++]
    },
  ],
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/google-fonts",
    "@pinia/nuxt",
    "shadcn-nuxt",
    "nuxt-icon-tw",
    "@zadigetvoltaire/nuxt-gtm",
  ],
  plugins: [
    '~/plugins/commas.ts'
  ],
  googleFonts: {
    families: {
      "IBM Plex Mono": true,
      "Open+Sans": true,
      "IBM Plex Sans Thai": [400, 700],
    },
  },
  css: ["@/assets/css/global.css"],
  runtimeConfig: {
    public: {
      url: {
        serviceUrl: serviceUrl,
      },
      gtm: {
        id: gtmId,
      },
    },
  },
});
