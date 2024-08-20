import { H3Event } from 'h3'

export const createRequestHeaders = async (event: H3Event): Promise<Headers> => {
	const config = useRuntimeConfig()
	const header: HeadersInit = new Headers()
	let authorization = event.node.req.headers.authorization
	let contentType = getHeader(event, 'content-type')
	let cookie = getHeader(event, 'cookie')
	const finnoUserId = process.env.FINNO_USER_ID
	if (finnoUserId) {
		header.set('Finno-User-Id', finnoUserId)
	}
	if (!authorization) {
		authorization = getCookie(event, config.public.auth.cookie.accessToken)
	}
	if (authorization) {
		header.set('Authorization', `Bearer ${authorization}`)
	}
	if (contentType) {
		header.set('Content-Type', contentType)
	}
	if (cookie) {
		header.set('Cookie', cookie)
	}
	return header
}
