const serviceUrl = process.env.SERVICE_URL || "http://localhost:8080";
const baseURL = process.env.BASE_URL || "http://localhost:3000"
const finnoAuthURL = process.env.FINNO_AUTH_URL || "https://auth-int.finnomena.com"

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
				logout: `${finnoAuthURL}/logout`,
				login: `${finnoAuthURL}/oauth2/auth`,
				callback: `${baseURL}/taxi-web/api/auth/callback`,
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
    },
  },
});