export const state = () => ({
	rating: null,
	types: null,
	director: null,
	first_letter: null,
})

export const mutations = {
	setValues(state, data) {
		state['rating'] = data['rating'] ? data['rating'] : null
		state['types'] = data['types'] ? data['types'] : null
		state['director'] = data['director'] ? data['director'] : null
	},
}

export const actions = {
	saveValues({ commit }, data) {
		commit('setValues', data)
	},
}

export const getters = {
	getValues(state) {
		return {
			rating: state.rating,
			types: state.types,
			director: state.director,
			first_letter: state.first_letter,
		}
	},
}
