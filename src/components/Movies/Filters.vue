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
	created() {
		// get previous page data
		let savedPage = this.$store.getters['navigation/getSavedPage']

		// Assign store value
		if (this.$route.path === savedPage.path) {
			let filterValues = this.$store.getters['filters/getValues']
			for (let value in filterValues) this.filters[value] = filterValues[value]
		}
	},
	methods: {
		filter() {
			let dataSent = Object.keys(this.filters)
				.filter(key => {
					// remove null
					return this.filters[key]
				})
				.reduce((obj, key) => {
					// assign this.filter values to dataSent object
					obj[key] = this.filters[key]
					return obj
				}, {})

			this.$store.dispatch('filters/saveValues', dataSent)
			this.$emit('filter-movies', dataSent)
		}
	}
}
</script>
