import { CONFIG } from '~/plugins/mypreciousAuth/config.js'

export default class MyLocalScheme {
	constructor(auth, options) {
		this.$auth = auth
		this.name = CONFIG.name
		this.refreshInterval = null

		this.options = Object.assign({}, CONFIG.options, options)
	}

	_setToken(token) {
		if (this.options.globalToken) {
			// Set Authorization token for all axios requests
			this.$auth.ctx.app.$axios.setHeader(this.options.tokenName, token)
		}
	}

	_clearToken() {
		if (this.options.globalToken) {
			// Clear Authorization token for all axios requests
			this.$auth.ctx.app.$axios.setHeader(this.options.tokenName, false)
		}
	}

	mounted() {
		// Logout on error
		this.$auth.onError(() => {
			this._logoutLocally()
		})

		if (this.options.tokenRequired) {
			const token = this.$auth.syncToken(this.name)
			this._setToken(token)
		}

		return this.$auth.fetchUserOnce()
	}

	manageToken(result) {
		// if expire_in is define set timeout before refresh token
		if(result[this.options.expireInKey])
			this.setRefreshInterval(result[this.options.expireInKey] * 1000) // convert second in ms

		if (this.options.tokenRequired) {
			const token = this.options.tokenType
				? this.options.tokenType + ' ' + result[this.options.accessTokenKey]
				: result[this.options.accessTokenKey]

			this.$auth.setToken(this.name, token)
			this._setToken(token)

			if (this.options.refreshToken) {
				this.$auth.setRefreshToken(
					this.name,
					result[this.options.refreshTokenKey]
				)
			}
		}
	}

	// duration should be in ms
	setRefreshInterval($duration) {
		if($duration <= 0)
			return

		if(this.refreshInterval)
			clearTimeout(this.refreshInterval)

		// Set interval
		this.refreshInterval = setTimeout(() => {
			this.refresh()
		}, $duration)
	}

	async login(endpoint) {
		if (!this.options.endpoints.login) {
			return
		}

		// Ditch any leftover local tokens before attempting to log in
		await this._logoutLocally()

		const result = await this.$auth.request(
			endpoint,
			this.options.endpoints.login
		)

		this.manageToken(result)

		return this.fetchUser()
	}

	async fetchUser(endpoint) {
		// Set timeout before refresh token
		await this.refresh()

		// User endpoint is disabled.
		if (!this.options.endpoints.user) {
			this.$auth.setUser({})
			return
		}

		// Token is required but not available
		if (this.options.tokenRequired && !this.$auth.getToken(this.name)) {
			return
		}

		// Try to fetch user and then set
		const user = await this.$auth.requestWith(
			this.name,
			endpoint,
			this.options.endpoints.user
		)
		this.$auth.setUser(user)
	}

	async logout(endpoint) {
		// Only connect to logout endpoint if it's configured
		if (this.options.endpoints.logout) {
			await this.$auth
				.requestWith(this.name, endpoint, this.options.endpoints.logout)
				.catch(() => {})
		}

		// But logout locally regardless
		return this._logoutLocally()
	}

	async _logoutLocally() {
		if (this.options.tokenRequired) {
			this._clearToken()
		}

		return this.$auth.reset()
	}

	async refresh() {
		let refreshToken = this.$auth.getRefreshToken(this.name)

		// Token is required but refreshToken not available
		if (this.options.tokenRequired && !refreshToken)
			return

		const result = await this.$auth.request(
			{
				data: {
					refresh_token: refreshToken
				}
			},
			this.options.endpoints.refreshToken
		)

		this.manageToken(result)

		return Promise.resolve()
	}
}
