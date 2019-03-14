<template>
	<div>
		<h1>Movies to see</h1>
		
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
			seen: 0
		}

		await store.dispatch('movies/fetchMovies', {
			params: defaultParams
		})

		return {
			defaultParams
		}
	},
	methods: {
		filterMovies(data) {
			// Combine default and filter parameters
			const params = Object.assign({}, this.defaultParams, data)

			this.$store.dispatch('movies/fetchMovies', {
				params
			})
		}
	}
}
</script>
