<template>
	<div>
		<h1>Update movie</h1>

		<ul v-if="errors">
			<li
				v-for="(error, key) in errors"
				:key="key">
				{{ key }}: {{ error }}
			</li>
		</ul>

		<form @submit.prevent="updateMovie">

			<div>
				<label for="title">
					Title
				</label>
				<input
					id="title"
					v-model="title"
					name="title"
					type="text">
			</div>

			<div>
				<label for="director">
					Director
				</label>
				<input
					id="director"
					v-model="director"
					name="director"
					type="text">
			</div>

			<div>
				<label for="types">
					Types
				</label>
				<input
					id="types"
					v-model="types"
					name="types"
					type="text">
			</div>

			<div>
				<label for="image">
					Image
				</label>
				<input
					id="image"
					v-model="image"
					name="image"
					type="text">
			</div>

			<div>
				<p>Rating</p>
				<input
					id="fantastic"
					v-model="rating"
					value="fantastic"
					name="rating"
					type="radio">
				<label for="fantastic">
					Fantastic
				</label>
				<input
					id="bad"
					v-model="rating"
					value="bad"
					name="rating"
					type="radio">
				<label for="bad">
					Bad
				</label>
				<button 
					type="button"
					@click="rating = 'empty'">
					Clear
				</button>
			</div>

			<div>
				<p>Possession state</p>
				<input
					id="own"
					v-model="possessionState"
					value="own"
					name="possession_state"
					type="radio">
				<label for="own">
					Own
				</label>
				<input
					id="to_own"
					v-model="possessionState"
					value="to_own"
					name="possession_state"
					type="radio">
				<label for="to_own">
					To own
				</label>
				<button 
					type="button"
					@click="possessionState = 'empty'">
					Clear
				</button>
			</div>

			<div>
				<p>See state</p>
				<input
					id="seen"
					v-model="seen"
					name="seen"
					type="checkbox">
				<label for="seen">
					Seen
				</label>
			</div>

			<div v-if="!loading">
				<input
					type="submit"
					value="Update">
			</div>
			<div v-else>
				loading
			</div>
		</form>
	</div>
</template>

<script>
export default {
	data() {
		return {
			errors: null,
			loading: false
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
			title: movie.title,
			director: movie.director ? movie.director.name : null,
			types:
				movie.types.length > 0
					? movie.types.map(type => type.name).join(';')
					: null,
			image: movie.image,
			seen: movie.seen,
			rating: movie.rating || 'empty',
			possessionState: movie.possession_state || 'empty'
		}
	},
	methods: {
		async updateMovie() {
			this.loading = true

			await this.$axios
				.$patch('/api/movies/' + this.$route.params.id, {
					title: this.title,
					director: this.director,
					types: this.types,
					image: this.image,
					seen: this.seen,
					rating: this.rating,
					possession_state: this.possessionState
				})
				.then(res => {
					this.$router.push({ path: `/movies/${this.$route.params.id}` })
				})
				.catch(error => (this.loading = false))
		}
	}
}
</script>
