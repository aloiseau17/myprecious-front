<template>
	<div>
		<h1>Movies own</h1>
		
		<!-- Filters -->
		<filters @filter-movies="filterMovies"/>
		
		<ul v-if="movies.length">
			<li
				v-for="movie in movies"
				:key="movie.id">
				<movie-item :movie="movie" />
			</li>
		</ul>
		
		<!-- No content -->
		<p v-if="!movies.length">
			No movies found.
		</p>
	</div>
</template>

<script>
import MovieItem from '~/components/Movies/MovieItem'
import Filters from '~/components/Movies/Filters'
import { mapState } from 'vuex'
import ManageMovieList from '~/mixins/manageMovieList'

export default {
	components: { MovieItem, Filters },
	mixins: [ManageMovieList],
	data() {
		return {
			defaultParams: {}
		}
	},
	computed: {
		...mapState('movies', ['movies', 'firstRewatch', 'currentPage', 'lastPage'])
	},
	async asyncData({ store, $axios, route }) {
		// get previous page data
		let savedPage = store.getters['navigation/getSavedPage']

		// Define parameters use for first movie catch
		// and then pagination and filter
		const defaultParams = {
			number: 10,
			possession_state: 'own'
		}

		let hasMovies = false

		// If last page is the current one
		// Then get existing movies to avoid new requests
		if (route.path === savedPage.path)
			hasMovies = store.getters['movies/hasMovies']

		// If there isn't movies, proceed fresh request
		if (!hasMovies)
			await store.dispatch('movies/fetchMovies', {
				params: defaultParams
			})

		return {
			defaultParams
		}
	}
}
</script>
