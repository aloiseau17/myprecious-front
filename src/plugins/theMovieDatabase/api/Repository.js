export default axios => ({
	// ================================
	// Retrieve movie by its id
	// Extend response with more data in extendResponse
	// ================================
	show(id, extendResponse = null) {
		return axios
			.get(`/movie/${id}`, {
				params: {
					api_key: process.env.TMDB_KEY,
					language: process.env.APP_LANG,
					append_to_response: extendResponse
				}
			})
			.then(res => res.data)
			.catch(error => console.log(error.response))
	},

	// ================================
	// Retrieve movies list according to string query
	// ================================
	find(queryString) {
		return axios
			.get('/search/movie', {
				params: {
					api_key: process.env.TMDB_KEY,
					language: process.env.APP_LANG,
					query: queryString
				}
			})
			.then(res => res.data)
			.catch(error => console.log(error.response))
	}
})
