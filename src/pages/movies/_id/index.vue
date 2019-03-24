<template>
	<div>
		<h1>{{ movie.title }}</h1>
		<ul>
			<li v-if="movie.director > 0">
				Director: {{ movie.director.name }}
			</li>
			<li v-if="movie.types.length > 0">
				Types:
				<ul>
					<li
						v-for="type in movie.types"
						:key="type.id">
						{{ type.name }}
					</li>
				</ul>
			</li>
			<li v-if="movie.seen">Vu</li>
			<li v-if="movie.rating">{{ movie.rating }}</li>
			<li v-if="movie.possession_state">{{ movie.possession_state }}</li>
		</ul>
		<nuxt-link :to="'/movies/edit/' + movie.id">
			Edit
		</nuxt-link>
	</div>
</template>

<script>
export default {
	data() {
		return {
			movie: null
		}
	},
	async asyncData({ store, route, $axios }) {
		let movie = await $axios
			.$get('/api/movies/' + route.params.id)
			.then(res => {
				return res
			})
			.catch(error => console.log(error))

		return {
			movie
		}
	}
}
</script>
