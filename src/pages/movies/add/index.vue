<template>
	<div>
		<h1>Add movie</h1>

		<ul v-if="errors">
			<li
				v-for="(error, key) in errors"
				:key="key">
				{{ key }}: {{ error }}
			</li>
		</ul>

		<form @submit.prevent="addMovie">

			<el-autocomplete
				v-model="title"
				:fetch-suggestions="autocompleteTitle"
				autosize
				autocomplete
				clearable
				size="max"
				class="inline-input"
				placeholder="Entrez quelque chose"
				@select="getMovie">
				<template slot-scope="{ item }">
					<div class="value">{{ item.title }} (id: {{ item.id }})</div>
				</template>
			</el-autocomplete>

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
				<label for="actor">
					Main actor
				</label>
				<input
					id="actor"
					v-model="actor"
					name="actor"
					type="text">
			</div>

			<div>
				<label for="duration">
					Duration (min)
				</label>
				<input
					id="duration"
					v-model="duration"
					name="duration"
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
					name="rating"
					value="fantastic"
					type="radio">
				<label for="fantastic">
					Fantastic
				</label>
				<input
					id="bad"
					v-model="rating"
					name="rating"
					value="bad"
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
					name="possession_state"
					value="own"
					type="radio">
				<label for="own">
					Own
				</label>
				<input
					id="to_own"
					v-model="possessionState"
					name="possession_state"
					value="to_own"
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
					value="seen"
					type="checkbox">
				<label for="seen">
					Seen
				</label>
			</div>

			<div>
				<input
					type="submit"
					value="Add movie">
			</div>
		</form>
	</div>
</template>

<script>
import { Autocomplete } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import GetMoviesData from '~/mixins/getMoviesData'

export default {
	components: {
		'el-autocomplete': Autocomplete
	},
	mixins: [GetMoviesData],
	data() {
		return {
			title: '',
			director: '',
			types: '',
			actor: '',
			duration: '',
			image: '',
			rating: 'empty',
			seen: false,
			possessionState: 'empty',
			errors: null
		}
	},
	methods: {
		async addMovie() {
			await this.$axios
				.$post('/api/movies', {
					title: this.title,
					director: this.director,
					types: this.types,
					image: this.image,
					actor: this.actor,
					duration: this.duration,
					seen: this.seen,
					rating: this.rating,
					possession_state: this.possessionState
				})
				.then(data => console.log(data))
				.catch(error => (this.errors = error.response.data.errors))
		}
	}
}
</script>
