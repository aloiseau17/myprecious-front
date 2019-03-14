export const state = () => ({
	currentPage: 1,
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
		state.firstRewatch = movie

		if (movie) state.defaultParams.not_in = [movie.id]
		else state.defaultParams.not_in = []
	},
	setLastPage(state, last) {
		state.lastPage = last
	},
	setMovies(state, movies) {
		state.movies = movies
	},
	setNotInDefaultParameter(state, id) {
		state.defaultParams.not_in.push(state.firstRewatch.id)
	}
}

export const actions = {
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
		data.params = Object.assign({}, state.defaultParams, data.params)

		if (data.partial) data.params.number--
		// if partial include firstRewatch in total
		else commit('setFirstRewatch', null) // reset

		await this.$axios
			.$get('/api/movies/search', {
				params: data.params
			})
			.then(res => {
				if (!res.data) {
					commit('setCurrentPage', 1)
					commit('setLastPage', 1)
					commit('setMovies', [])
				} else {
					commit('setCurrentPage', res.current_page)
					commit('setLastPage', res.last_page)
					commit('setMovies', res.data)
				}
			})
			.catch(error => console.log(error))
	},
	async filterMovies({ commit }, params) {
		await this.$axios
			.$get('/api/movies/search', {
				params
			})
			.then(res => {
				commit('setFirstRewatch', []) // no firstRewatch on filter
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
