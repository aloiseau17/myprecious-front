export const state = () => ({
	currentPage: 0,
	defaultParams: {
		not_in: []
	},
	firstRewatch: null,
	lastPage: 1,
	movies: []
})

export const mutations = {
	setCurrentPage(state, page) {
		state.currentPage = page
	},
	setFirstRewatch(state, movie) {
		if (movie) state.defaultParams.not_in.push(movie.id)
		else state.defaultParams.not_in = []

		state.firstRewatch = movie
	},
	setLastPage(state, last) {
		state.lastPage = last
	},
	setMovies(state, data) {
		if (data.push) state.movies = state.movies.concat(data.movies)
		else state.movies = data.movies
	},
	setNotInDefaultParameter(state, ids) {
		state.defaultParams.not_in = ids
	}
}

export const actions = {
	syncNotIn({ commit, state }, movies) {
		// Merge current not in with movies ids
		let ids = state.defaultParams.not_in
		ids = ids.concat(movies.map(movie => movie.id))

		commit('setNotInDefaultParameter', ids)
	},
	async fetchFirstRandomFantasticMovies({ commit }) {
		await this.$axios
			.$get('/api/movies/search', {
				params: {
					number: 1,
					seen: 1,
					rating: 'fantastic',
					random: '1'
				}
			})
			.then(res => {
				if (!res.data) return

				commit('setFirstRewatch', res.data[0])
			})
			.catch(error => console.log(error))
	},
	async fetchMovies({ commit, state }, data) {
		let params = Object.assign({}, data.params)

		if (data.partial) params.number = params.number - 1
		// if partial include firstRewatch in total
		else commit('setFirstRewatch', null) // reset

		params = Object.assign({}, state.defaultParams, params)

		return await this.$axios
			.$get('/api/movies/search', {
				params
			})
			.then(res => {
				if (!data.partial) commit('setCurrentPage', 1)
				else commit('setCurrentPage', 0)

				if (!res.data) {
					commit('setLastPage', 1)
					commit('setMovies', {
						movies: []
					})
				} else {
					commit('setLastPage', res.last_page)

					commit('setMovies', {
						movies: res.data
					})
				}

				return res.data
			})
			.catch(error => console.log(error))
	},
	async fetchNextPage({ commit, state }, data) {
		let params = Object.assign({}, data.params)
		params = Object.assign({}, state.defaultParams, params)

		if (state.currentPage >= state.lastPage) return

		params.page = state.currentPage + 1

		await this.$axios
			.$get('/api/movies/search', {
				params
			})
			.then(res => {
				if (!res.data) return

				commit('setCurrentPage', res.current_page)
				commit('setLastPage', res.last_page)
				commit('setMovies', {
					movies: res.data,
					push: true
				})
			})
			.catch(error => console.log(error))
	},
	async filterMovies({ commit }, params) {
		await this.$axios
			.$get('/api/movies/search', {
				params
			})
			.then(res => {
				commit('setFirstRewatch', null) // no firstRewatch on filter
				commit('setCurrentPage', res.current_page)
				commit('setLastPage', res.last_page)
				commit('setMovies', res.data)
			})
			.catch(error => console.log(error))
	}
}

export const getters = {
	getFirstRewatch(state) {
		return state.firstRewatch
	},
	getMovies(state) {
		return state.movies
	}
}
