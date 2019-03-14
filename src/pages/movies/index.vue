<template>
	<div>
		<h1>Movies seen</h1>
		
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
		
		<!-- Filters -->
		<filters @filter-movies="filterMovies"/>
	</div>
</template>

<script>
import MovieItem from '~/components/Movies/MovieItem'
import Filters from '~/components/Movies/Filters'
import { mapState } from 'vuex'

export default {
	components: { MovieItem, Filters },
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

		await store.dispatch('movies/fetchMovies', {
			params: defaultParams,
			partial: true
		})

		return {
			defaultParams
		}
	},
	methods: {
		async filterMovies(data) {
			// Combine default and filter parameters
			const params = Object.assign({}, this.defaultParams, data)
			const resetFirstRewatch = Object.keys(data).length === 0

			if (resetFirstRewatch)
				await this.$store.dispatch('movies/fetchFirstRandomFantasticMovies')

			this.$store.dispatch('movies/fetchMovies', {
				params,
				partial: resetFirstRewatch
			})
		}
	}
}
</script>
