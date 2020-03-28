<template>
	<div>
		<div class="content__title">
			<h1>Seen movies</h1>
		</div>

		<div v-if="movies.length">
			<ul class="content__list">
				<li v-for="movie in movies" :key="movie.id" class="content__list__item">
					<MovieItem :movie="movie" />
				</li>
			</ul>

			<!-- Filters -->
			<Filters @filter-movies="beforeFilterMovies" />
		</div>

		<!-- No content -->
		<NoMovie v-if="!movies.length" />
	</div>
</template>

<script>
import MovieItem from '~/components/Movies/MovieItem'
import NoMovie from '~/components/Movies/NoMovie'
import Filters from '~/components/Movies/Filters'
import { mapState } from 'vuex'
import ManageMovieList from '~/mixins/manageMovieList'

export default {
	components: { MovieItem, Filters, NoMovie },
	mixins: [ManageMovieList],
	async asyncData({ store, route }) {
		// get previous page data
		let savedPage = store.getters['navigation/getSavedPage']

		// Define parameters use for first movie catch
		// and then pagination and filter
		const defaultParams = {
			number: 10,
			seen: 1,
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
				newFirstRandom: true,
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
		...mapState('movies', ['currentPage', 'lastPage']),
		movies() {
			return this.$store.getters['movies/getMovies'](true)
		},
	},
	methods: {
		async beforeFilterMovies(data) {
			const resetFirstRewatch = Object.keys(data).length === 0
			await this.filterMovies(data, resetFirstRewatch)
		},
	},
}
</script>
