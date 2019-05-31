export const state = () => ({
	previousQuery: null,
	previousPath: '/movies'
})

export const mutations = {
	setPreviousRouteData(state, data) {
		state.previousQuery = data.query
		state.previousPath = data.path
	}
}

export const actions = {
	savePage({ commit }, data) {
		commit('setPreviousRouteData', data)
	}
}

export const getters = {
	getSavedPage(state) {
		return {
			path: state.previousPath,
			query: state.previousQuery
		}
	}
}
