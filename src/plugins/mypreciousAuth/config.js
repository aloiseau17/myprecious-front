export const CONFIG = {
	name: 'myprecious',
	options: {
		endpoints: {
			login: {
				url: '/api/login',
				method: 'post',
				propertyName: null
				// Default propertyName not required here to get url response data
				// if set only propertyName is return on $auth.request()
			},
			logout: {
				url: '/api/logout',
				method: 'post'
			},
			user: {
				url: '/api/user',
				method: 'get',
				propertyName: ''
			},
			refreshToken: {
				url: '/api/refresh-login',
				method: 'post'
			}
		},
		accessTokenKey: 'access_token',
		expireInKey: 'expires_in',
		globalToken: true,
		refreshToken: true,
		refreshTokenKey: 'refresh_token',
		tokenName: 'Authorization',
		tokenRequired: true,
		tokenType: 'Bearer'
	}
}
