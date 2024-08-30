const serviceUrl = process.env.SERVICE_URL || "http://localhost:8080";
const baseURL = process.env.BASE_URL || "http://localhost:3000";
const finnoAuthURL =
  process.env.FINNO_AUTH_URL || "https://auth-int.finnomena.com";
const gtmId = process.env.GTM_ID;
const amplitudeId = process.env.AMPLITUDE_ID;
const clarityId = process.env.CLARITY_ID;
const logoutURL = `${finnoAuthURL}/logout?redirect_uri=${encodeURIComponent(
  baseURL
)}`;
const batchCheckoutUrl =
  process.env.BATCH_CHECKOUT_URL || "https://trade-int.finnomena.com";

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
  app: {
    baseURL: "/charlie",
    buildAssetsDir: "_charlie",
    head: {
      meta: [
        {
          property: "og:image",
          content: `https://storage.googleapis.com/scontent.finnomena.com/fint/charlie/og-image.png`,
        },
        {
          property: "og:title",
          content: `Charlie - แชทบอท AI ผู้แนะนำ SSF RMF ThaiESG`,
        },
        {
          property: "og:description",
          content: `ช่วยจัดพอร์ต แนะนำ และ ให้ความรู้ทั่วไปเกี่ยวกับกองทุนประหยัดภาษีจาก Finnomena`,
        },
      ],
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: "https://scontent.finnomena.com/favicon/favicon.ico",
        },
      ],
      script: [
        {
          hid: "gtm",
          innerHTML: `window.dataLayer = window.dataLayer || [];`,
          type: "text/javascript",
        },
      ],
    },
  },
  plugins: ["~/plugins/commas.ts"],
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
        finnoAuthUrl: finnoAuthURL,
        batchCheckoutUrl: batchCheckoutUrl,
      },
      auth: {
        token: `${finnoAuthURL}/oauth2/token`,
        userinfo: `${finnoAuthURL}/userinfo`,
        logout: logoutURL,
        login: `${finnoAuthURL}/oauth2/auth`,
        callback: `${baseURL}/charlie-web/api/auth/callback`,
        ttl: {
          refreshToken: 2592000,
          accessToken: 3600,
        },
        cookie: {
          accessToken: "access_token",
          refreshToken: "refresh_token",
          challenge: "auth.challenge",
          issuedAt: "auth.issued_at",
          domain: process.env.AUTH_COOKIE_DOMAIN ?? "",
          secure: process.env.AUTH_COOKIE_SECURE ?? "false",
        },
        challengeMethod: "S256",
      },
      gtm: {
        id: gtmId,
      },
      amplitude: {
        id: amplitudeId,
      },
      clarity: {
        id: clarityId,
      },
    },
  },
});
