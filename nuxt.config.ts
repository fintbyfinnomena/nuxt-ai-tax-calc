const serviceUrl = process.env.SERVICE_URL || "http://localhost:8080";
const baseURL = process.env.BASE_URL || "http://localhost:3000"
const finnoAuthURL = process.env.FINNO_AUTH_URL || "https://auth-int.finnomena.com"
const gtmId = process.env.GTM_ID;
const logoutURL = `${finnoAuthURL}/logout?redirect_uri=${encodeURIComponent(baseURL)}`

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
			auth: {
				token: `${finnoAuthURL}/oauth2/token`,
				userinfo: `${finnoAuthURL}/userinfo`,
				logout: logoutURL,
				login: `${finnoAuthURL}/oauth2/auth`,
				callback: `${baseURL}/api/auth/callback`,
				ttl: {
					refreshToken: 2592000,
					accessToken: 3600
				},
				cookie: {
					accessToken: 'access_token',
					refreshToken: 'refresh_token',
					challenge: 'auth.challenge',
					issuedAt: 'auth.issued_at',
					domain: process.env.AUTH_COOKIE_DOMAIN ?? '',
					secure: process.env.AUTH_COOKIE_SECURE ?? 'false'
				},
				challengeMethod: 'S256'
			},
      gtm: {
        id: gtmId,
      },
    },
  },
});
