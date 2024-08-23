import { successResponse } from '@/server/utils/http'

export default defineEventHandler(() => {
	const data = {
		message: 'ok'
	}
	return successResponse(data)
})
