export const state = () => ({
  previousQuery: null,
  previousPath: '/',
})

export const mutations = {
  setPreviousRouteData(state, data) {
    state.previousQuery = data.query
    state.previousPath = data.path
  },
}

export const actions = {
  savePage({ commit }, data) {
    commit('setPreviousRouteData', data)
  },
  resetPage({ commit }) {
    commit('setPreviousRouteData', {
      query: null,
      previousPath: '/',
    })
  },
}

export const getters = {
  getSavedPage(state) {
    return {
      path: state.previousPath,
      query: state.previousQuery,
    }
  },
}
