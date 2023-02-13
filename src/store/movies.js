export const state = () => ({
  currentPage: 0,
  defaultParams: {},
  firstRewatch: null,
  lastPage: 1,
  movies: [],
})

export const mutations = {
  setCurrentPage(state, page) {
    state.currentPage = page
  },
  setFirstRewatch(state, movie) {
    state.defaultParams.not_in = [] // reset not_in
    if (movie) state.defaultParams.not_in = [movie.id] // only set this id as not in

    state.firstRewatch = movie
  },
  setLastPage(state, last) {
    state.lastPage = last
  },
  setMovies(state, data) {
    if (data.push) state.movies = state.movies.concat(data.movies)
    else state.movies = data.movies
  },
}

export const actions = {
  async fetchFirstRandomFantasticMovies({ commit }) {
    // empty movies list before fetch one fantasticMovie
    // prevent duplicate key
    commit('setMovies', {
      movies: [],
    })

    await this.$axios
      .$get('/api/movies/search', {
        params: {
          number: 1,
          seen: 1,
          rating: 'fantastic',
          random: '1',
        },
      })
      .then((res) => {
        if (!res.data) return

        commit('setFirstRewatch', res.data[0])
      })
      .catch((error) => console.log(error))
  },
  async fetchMovies({ commit, dispatch, state }, data) {
    let params = Object.assign({}, data.params)

    // if newFirstRandom : include firstRewatch in total
    if (data.newFirstRandom) {
      await dispatch('fetchFirstRandomFantasticMovies')
      params.number = params.number - 1
    } else commit('setFirstRewatch', null) // reset

    params = await dispatch('setDefaultParams', {
      params,
      defaultParams: state.defaultParams,
    })

    return await this.$axios
      .$get('/api/movies/search', {
        params,
      })
      .then((res) => {
        commit('setCurrentPage', 1)

        if (!res.data) {
          commit('setLastPage', 1)
          commit('setMovies', {
            movies: [],
          })
        } else {
          commit('setLastPage', res.last_page)
          commit('setMovies', {
            movies: res.data,
          })
        }
        return res.data
      })
      .catch((error) => console.log(error))
  },
  async fetchNextPage({ commit, dispatch, state }, data) {
    let params = Object.assign({}, data.params)
    params = await dispatch('setDefaultParams', {
      params,
      defaultParams: state.defaultParams,
    })

    if (state.currentPage >= state.lastPage) return

    params.page = state.currentPage + 1

    await this.$axios
      .$get('/api/movies/search', {
        params,
      })
      .then((res) => {
        if (!res.data) return

        commit('setCurrentPage', res.current_page)
        commit('setLastPage', res.last_page)
        commit('setMovies', {
          movies: res.data,
          push: true,
        })
      })
      .catch((error) => console.log(error))
  },
  async filterMovies({ commit }, params) {
    await this.$axios
      .$get('/api/movies/search', {
        params,
      })
      .then((res) => {
        commit('setFirstRewatch', null) // no firstRewatch on filter
        commit('setCurrentPage', res.current_page)
        commit('setLastPage', res.last_page)
        commit('setMovies', res.data)
      })
      .catch((error) => console.log(error))
  },
  resetMoviesList({ commit }) {
    commit('setCurrentPage', 0)
    commit('setLastPage', 1)
    commit('setMovies', {
      movies: [],
    })
  },
  setDefaultParams(context, data) {
    data.params = Object.assign({}, data.defaultParams, data.params)

    if (!data.params.order)
      data.params.order = this.$auth.$state.user.user_options
        ? this.$auth.$state.user.user_options.list_order
        : null
    if (!data.params.order_by)
      data.params.order_by = this.$auth.$state.user.user_options
        ? this.$auth.$state.user.user_options.list_order_by
        : null

    return data.params
  },
}

export const getters = {
  hasMovies(state) {
    return state.movies.length > 0
  },
  getFirstRewatch(state) {
    return state.firstRewatch
  },
  getMovies:
    (state) =>
    (withRewatch = false) => {
      return withRewatch && state.firstRewatch
        ? [state.firstRewatch, ...state.movies]
        : state.movies
    },
}
