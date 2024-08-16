import { FINNO_AUTH_ENDPOINT } from '~/server/config/auth'
import { successResponse, errorResponse } from '@/server/utils/http'

const apiPrefix = '/api'
export default defineEventHandler(async (event) => {
	try {
		if (!event.node.req.url) {
			throw errorResponse(400, 'api:profile invalid url')
		}
		const routes = event.node.req.url.split(`${apiPrefix}/auth`)
		const endpoint = routes[routes.length - 1]
		const { data: profile } = await $fetch<Promise<any>>(`${FINNO_AUTH_ENDPOINT}/api/${endpoint}`, {
			headers: {
				'Cache-Control': 'no-cache'
			},
			method: 'get'
		})
		return successResponse(profile)
	} catch (error: unknown) {
		const err = error as AppError
		if (err.statusCode) {
			sendError(event, err)
		} else {
			sendError(event, errorResponse(500, 'api:profile unexpected error'))
		}
	}
})
