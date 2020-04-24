<template>
  <div>
    <TheTitle title="Movies to buy" />

    <ul v-if="movies.length" class="content__list">
      <li v-for="movie in movies" :key="movie.id" class="content__list__item">
        <MovieItem :movie="movie" />
      </li>
    </ul>

    <!-- No content -->
    <p v-if="!movies.length">
      No movies found.
    </p>

    <!-- Filters -->
    <Filters @filter-movies="filterMovies" />
  </div>
</template>

<script>
import MovieItem from '~/components/Movies/MovieItem'
import Filters from '~/components/Movies/Filters'
import { mapState } from 'vuex'
import ManageMovieList from '~/mixins/manageMovieList'
import TheTitle from '~/components/UI/TheTitle'

export default {
  components: { MovieItem, Filters, TheTitle },
  mixins: [ManageMovieList],
  async asyncData({ store, route }) {
    // get previous page data
    let savedPage = store.getters['navigation/getSavedPage']

    // Define parameters use for first movie catch
    // and then pagination and filter
    const defaultParams = {
      number: 10,
      possession_state: 'to_own',
    }

    let hasMovies = false

    // If last page is the current one
    // Then get existing movies to avoid new requests
    if (route.path === savedPage.path)
      hasMovies = store.getters['movies/hasMovies']

    // If there isn't movies, proceed fresh request
    if (!hasMovies)
      await store.dispatch('movies/fetchMovies', {
        params: defaultParams,
      })

    return {
      defaultParams,
    }
  },
  data() {
    return {
      defaultParams: {},
    }
  },
  computed: {
    ...mapState('movies', [
      'movies',
      'firstRewatch',
      'currentPage',
      'lastPage',
    ]),
  },
}
</script>
