import { randomString } from '@/server/utils/random'
import { FINNO_AUTH_CLIENT_ID } from '@/server/config/auth'
import crypto from 'crypto'

export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig()
	const challenge = randomString(43)
	setCookie(event, config.public.auth.cookie.challenge, challenge, {
		httpOnly: true,
		path: '/',
		secure: config.public.auth.cookie.secure === 'true'
	})

	const state = randomString(9)
	const hash = crypto.createHash('sha256').update(challenge).digest('base64url')

	let url = `${config.public.auth.login}?client_id=${FINNO_AUTH_CLIENT_ID}`
	url = `${url}&redirect_uri=${config.public.auth.callback}`
	url = `${url}&response_type=code`
	url = `${url}&scope=offline`
	url = `${url}&state=${state}`
	// url = `${url}&code_challenge=${hash}`
	// url = `${url}&code_challenge_method=${config.public.auth.challengeMethod}`

	const query = getQuery(event)
	if (query.action) {
		url = `${url}&action=${query.action}`
	}

	let authRedirect = '/'

	setCookie(event, 'auth_redirect', authRedirect, {
		httpOnly: true,
		path: '/',
		maxAge: 86400000
	})

	await sendRedirect(event, url)
})
