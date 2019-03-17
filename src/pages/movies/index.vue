<template>
	<div>
		<h1>Movies seen</h1>
		
		<!-- Filters -->
		<filters @filter-movies="beforeFilterMovies"/>
		
		<ul v-if="movies.length">
			<li v-if="firstRewatch">
				<movie-item :movie="firstRewatch" />
			</li>
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
	async asyncData({ store, $axios }) {
		// Define parameters use for first movie catch
		// and then pagination and filter
		const defaultParams = {
			number: 10,
			seen: 1
		}

		// Require one fantastic movie
		await store.dispatch('movies/fetchFirstRandomFantasticMovies')

		let movies = await store.dispatch('movies/fetchMovies', {
			params: defaultParams,
			partial: true
		})

		store.dispatch('movies/syncNotIn', movies)

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
