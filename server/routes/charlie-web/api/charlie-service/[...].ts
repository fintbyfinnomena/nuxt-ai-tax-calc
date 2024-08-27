import { SERVICE_URL } from '@/server/config/endpoint'
import { successResponse, errorResponse } from '@/server/utils/http'

export default defineEventHandler(async (event) => {
	if (!event.node.req.url) {
		throw errorResponse(400, 'api:charlie invalid url')
	}
	const routes = event.node.req.url.split('charlie-web/api/charlie-service')
	const endpoint = routes[routes.length - 1]
	const url = `${SERVICE_URL}/private/api/v1${endpoint}`
	try {
		const headers = await createRequestHeaders(event)

		// TODO: Temporary use - Have to migrate to access token extraction
		const finnoId = getHeader(event, 'Finno-User-Id')
		if (finnoId) {
			headers.set("Finno-User-Id", finnoId)
		}

		let body: string | undefined = undefined
		if (isMethod(event, ['POST', 'PATCH', 'PUT'])) {
			body = await readBody(event)
		}

		const res = await $fetch<Promise<any>>(url, {
			method: event.method,
			headers,
			body
		})

		return successResponse(res)
	} catch (error: unknown) {
		const err = error as AppError
		console.error(`error "${err.statusCode}:${event.method}" api from "/private/api/v1" url : ${url}`)
	}
})
