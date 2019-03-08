<template>
	<div>
		<h1>Movies own</h1>
		
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

export default {
	components: { MovieItem, Filters },
	data() {
		return {
			movies: [],
			currentPage: 1,
			defaultParams: {}
		}
	},
	asyncData({ $axios }) {
		// Define parameters use for first movie catch
		// and then pagination and filter
		const defaultParams = {
			number: 10,
			possession_state: 'own'
		}

		return $axios
			.$get('/api/movies/search', {
				params: defaultParams
			})
			.then(res => {
				return {
					currentPage: res.current_page,
					movies: res.data ? res.data : [],
					defaultParams
				}
			})
			.catch(error => console.log(error))
	},
	methods: {
		filterMovies(data) {
			// Combine default and filter parameters
			const params = Object.assign({}, this.defaultParams, data)

			return this.$axios
				.$get('/api/movies/search', {
					params: params
				})
				.then(res => {
					this.currentPage = res.current_page
					this.movies = res.data ? res.data : []
				})
				.catch(error => console.log(error))
		}
	}
}
</script>
