<template>
	<div>
		<div class="content__title">
			<h1>Seen movies</h1>
		</div>
		
		<div v-if="movies.length">
			<ul
				class="content__list">
				<li
					v-if="firstRewatch"
					class="content__list__item">
					<movie-item 
						:movie="firstRewatch" 
						rewatch />
				</li>
				<li
					v-for="movie in movies"
					:key="movie.id"
					class="content__list__item">
					<movie-item :movie="movie" />
				</li>
			</ul>

			<!-- Filters -->
			<filters @filter-movies="beforeFilterMovies"/>
		</div>
		
		<!-- No content -->
		<no-movie v-if="!movies.length" />
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
			seen: 1
		}

		let hasMovies = false

		// If last page is the current one
		// Then get existing movies to avoid new requests
		if (route.path === savedPage.path)
			hasMovies = store.getters['movies/hasMovies']

		// If there isn't movies, proceed fresh request
		if (!hasMovies) {
			// Require one fantastic movie
			await store.dispatch('movies/fetchFirstRandomFantasticMovies')

			let movies = await store.dispatch('movies/fetchMovies', {
				params: defaultParams,
				partial: true
			})

			store.dispatch('movies/syncNotIn', movies)
		}

		return {
			defaultParams
		}
	},
	methods: {
		async beforeFilterMovies(data) {
			const resetFirstRewatch = Object.keys(data).length === 0

			if (resetFirstRewatch)
				await this.$store.dispatch('movies/fetchFirstRandomFantasticMovies')

			let movies = await this.filterMovies(data, resetFirstRewatch)

			if (resetFirstRewatch && movies)
				this.$store.dispatch('movies/syncNotIn', movies)
		}
	}
}
</script>
