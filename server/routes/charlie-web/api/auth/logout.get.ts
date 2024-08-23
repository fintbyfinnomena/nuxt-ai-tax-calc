import { H3Event } from 'h3'

const config = useRuntimeConfig()

export const clearSession = (event: H3Event) => {
	const cookieOption = {
		path: '/',
		httpOnly: true,
		secure: config.public.auth.cookie.secure === 'true'
	}

	deleteCookie(event, config.public.auth.cookie.challenge, cookieOption)
	deleteCookie(event, config.public.auth.cookie.accessToken, cookieOption)
	deleteCookie(event, config.public.auth.cookie.refreshToken, cookieOption)
}

export default defineEventHandler(async (event) => {
	clearSession(event)
	await sendRedirect(event, config.public.auth.logout)
})
