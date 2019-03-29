export const state = () => ({
	rating: null,
	types: null,
	director: null,
	first_letter: null
})

export const mutations = {
	setValues(state, data) {
		for (let value in data) state[value] = data[value]
	}
}

export const actions = {
	saveValues({ commit }, data) {
		commit('setValues', data)
	}
}

export const getters = {
	getValues(state) {
		return {
			rating: state.rating,
			types: state.types,
			director: state.director,
			first_letter: state.first_letter
		}
	}
}
