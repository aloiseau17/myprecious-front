<template>
	<div>
		<h1>Movies to buy</h1>
		
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

export default {
	components: { MovieItem },
	data() {
		return {
			movies: [],
			currentPage: 1
		}
	},
	asyncData({ params, $axios }) {
		return $axios
			.$get('/api/movies/search', {
				params: {
					number: 10,
					possession_state: 'to_own'
				}
			})
			.then(res => {
				return {
					currentPage: res.current_page,
					movies: res.data ? res.data : []
				}
			})
			.catch(error => console.log(error))
	}
}
</script>
