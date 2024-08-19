const apiPrefix = '/api'

export const useAuth = defineStore('auth', () => {
	// composables
	const fetch = useRequestFetch()

	// actions
	function login() {
		window.location.href = `${apiPrefix}/auth/login`
	}

	function register() {
		window.location.href = `${apiPrefix}/auth/login?action=register`
	}

	function logout() {
		window.location.href = `${apiPrefix}/auth/logout`
	}

	async function validate() {
		const config = useRuntimeConfig()
		const { user, setLoginStatus } = useUser()
		const event = useRequestEvent()
		const refreshToken = useCookie(config.public.auth.cookie.refreshToken)
		setLoginStatus(!!refreshToken)

		const accessToken = useCookie(config.public.auth.cookie.accessToken)
		if (!accessToken.value) {
			setLoginStatus(false)
			return
		}
		try {
			await fetch(config.public.auth.userinfo, {
				method: 'get',
				headers: {
					Authorization: 'Bearer ' + accessToken.value
				}
			})
			setLoginStatus(true)
		} catch (err: unknown) {
			setLoginStatus(false)
		}

		if (!user.isLoggedIn && refreshToken.value) {
			try {
				const reqCookies = useRequestHeaders(['cookie'])
				const reqHeaders: HeadersInit = new Headers()
				if (reqCookies && reqCookies.cookie) {
					reqHeaders.set('cookie', reqCookies.cookie)
				}

				const res = await fetch.raw(`${apiPrefix}/auth/login`, {
					method: 'POST',
					credentials: 'include',
					headers: reqHeaders
				})

				const cookies = (res.headers.get('Set-Cookie') || '').split(',')
				if (cookies) {
					event?.node.res.setHeader('Set-Cookie', cookies)

					for (const cookie of cookies) {
						const search = config.public.auth.cookie.accessToken + '='
						if (cookie.includes(search)) {
							const arr = cookie.split(';')
							if (arr && event) {
								event.context.newAccessToken = arr[0].replace(search, '')
							}
						}
					}
				}

				setLoginStatus(true)
			} catch (err) {
				console.error('[auth:refresh]', err)
			}
		}
	}

	return {
		login,
		validate,
		logout,
		register
	}
})

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useAuth, import.meta.hot))
}
