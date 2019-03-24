<template>
	<nuxt-link
		:to="'/movies/' + movie.id"
		class="item">
		<p>Title: {{ movie.title }}</p>
		<p v-if="movie.seen">Seen</p>
		<p v-if="movie.possession_state">Possession: {{ movie.possession_state }}</p>
		<p v-if="movie.rating">Rating: {{ movie.rating }}</p>
	</nuxt-link>
</template>

<script>
export default {
	name: 'MovieItem',
	props: {
		movie: {
			type: Object,
			required: true
		}
	}
}
</script>

<style>
.item {
	display: block;
	height: 250px;
	border: 1px solid red;
	margin-bottom: 25px;
}
</style>
