<template>
	<div>
		<h3>Filtrez-nous !</h3>

		<form @submit.prevent="filter">
			<div>
				<label for="director">
					Director
				</label>
				<input
					id="director"
					v-model="filters.director"
					name="director"
					type="text">
			</div>

			<div>
				<label for="types">
					Types
				</label>
				<input
					id="types"
					v-model="filters.types"
					name="types"
					type="text">
			</div>

			<div>
				<p>Rating</p>
				<input
					id="fantastic"
					v-model="filters.rating"
					name="rating"
					value="fantastic"
					type="radio">
				<label for="fantastic">
					Fantastic
				</label>
				<input
					id="bad"
					v-model="filters.rating"
					name="rating"
					value="bad"
					type="radio">
				<label for="bad">
					Bad
				</label>
				<button 
					:checked="!filters.rating"
					type="button"
					@click="filters.rating = null">
					Clear
				</button>
			</div>

			<div>
				<label for="firstLetter">
					First letter
				</label>
				<input
					id="firstLetter"
					v-model="filters.first_letter"
					name="firstLetter"
					type="text">
			</div>

			<div>
				<input
					type="submit"
					value="Filter">
			</div>
		</form>
	</div>
</template>

<script>
export default {
	name: 'Filters',
	data() {
		return {
			filters: {
				rating: null,
				types: null,
				director: null,
				first_letter: null
			},
			errors: null
		}
	},
	methods: {
		filter() {
			// todo emit params
			let dataSent = Object.keys(this.filters)
				.filter(key => {
					return this.filters[key]
				})
				.reduce((obj, key) => {
					obj[key] = this.filters[key]
					return obj
				}, {})

			this.$emit('filter-movies', dataSent)
		}
	}
}
</script>
