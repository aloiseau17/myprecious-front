<template>
	<div>
		<div class="content__title">
			<h1>Update movie</h1>
		</div>

		<ul v-if="errors">
			<li
				v-for="(error, key) in errors"
				:key="key">
				{{ key }}: {{ error }}
			</li>
		</ul>

		<form
			class="form"
			@submit.prevent="updateMovie">
			
			<div class="form__column">
				<div>
					<edit-poster
						:movie-poster="poster_link"
						:movie-image="image"
						@updateFile="newFile" />
				</div>

				<div class="form__left">
					<fieldset>
						<legend>Movie</legend>

						<div class="form__group">
							<label for="title">Title</label>
							<el-autocomplete
								id="title"
								v-model="title"
								:fetch-suggestions="autocompleteTitle"
								autosize
								autocomplete
								clearable
								size="max"
								class="inline-input"
								placeholder="The lord of the ring"
								@select="getMovie">
								<template slot-scope="{ item }">
									<div class="value">{{ item.title }} (id: {{ item.id }})</div>
								</template>
							</el-autocomplete>
						</div>

						<div class="form__group">
							<label for="director">
								Director
							</label>
							<input
								id="director"
								v-model="director"
								name="director"
								type="text"
								placeholder="Peter Jackson">
						</div>

						<div class="form__group">
							<label for="types">
								Types
							</label>
							<input
								id="types"
								v-model="types"
								name="types"
								type="text"
								placeholder="Fantasy">
						</div>

						<div class="form__group">
							<label for="actor">
								Main actor
							</label>
							<input
								id="actor"
								v-model="actor"
								name="actor"
								type="text"
								placeholder="Gollum">
						</div>

						<div class="form__group">
							<label for="duration">
								Duration (min)
							</label>
							<input
								id="duration"
								v-model="duration"
								name="duration"
								type="text"
								placeholder="162">
						</div>
					</fieldset>
				</div>

				<div class="form__right">
					<fieldset>
						<legend>Status</legend>

						<div class="form__group btn-select__wrapper">
							<button
								:class="{active: possessionState === 'own'}"
								class="btn-select"
								type="button"
								@click="possessionSelect('own')">
								Owned
							</button>
							<button
								:class="{active: possessionState === 'to_own'}"
								class="btn-select"
								type="button"
								@click="possessionSelect('to_own')">
								To Own
							</button>
							<input
								id="own"
								v-model="possessionState"
								class="btn-select__input"
								name="possession_state"
								value="own"
								type="radio">
							<input
								id="to_own"
								v-model="possessionState"
								class="btn-select__input"
								name="possession_state"
								value="to_own"
								type="radio">
						</div>


						<div class="form__group__radio">
							<input
								id="seen"
								v-model="seen"
								:value="true"
								name="see"
								type="radio">
							<label for="seen">
								Seen
							</label>
						</div>
						<div class="form__group__radio">
							<input
								id="to_see"
								v-model="seen"
								:value="false"
								name="see"
								type="radio">
							<label for="to_see">
								To see
							</label>
						</div>
					</fieldset>

					<fieldset>
						<legend>Evaluation</legend>
						<div class="form__group__radio">
							<input
								id="fantastic"
								v-model="rating"
								name="rating"
								value="fantastic"
								type="radio">
							<label for="fantastic">
								Fantastic
							</label>
						</div>

						<div class="form__group__radio">
							<input
								id="rating-ok"
								v-model="rating"
								name="rating"
								value="empty"
								type="radio">
							<label for="rating-ok">
								Ok
							</label>
						</div>

						<div class="form__group__radio">
							<input
								id="bad"
								v-model="rating"
								name="rating"
								value="bad"
								type="radio">
							<label for="bad">
								Bad
							</label>
						</div>
					</fieldset>
				</div>
			</div>

			<div class="form__footer">
				<div v-if="!loading">
					<input
						class="btn"
						type="submit"
						value="Update">

					<nuxt-link
						:to="'/movies/' + movieId"
						class="form__cancel">
						cancel
					</nuxt-link>
				</div>
				<div v-else>
					loading
				</div>
			</div>
		</form>
	</div>
</template>

<script>
import EditPoster from '~/components/Movies/EditPoster'
import { Autocomplete } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import GetMoviesData from '~/mixins/getMoviesData'

export default {
	layout: 'form',
	components: {
		'el-autocomplete': Autocomplete,
		'edit-poster': EditPoster
	},
	mixins: [GetMoviesData],
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
			movieId: movie.id,
			title: movie.title,
			director: movie.director ? movie.director.name : null,
			types:
				movie.types.length > 0
					? movie.types.map(type => type.name).join(';')
					: null,
			image: movie.image,
			seen: movie.seen ? true : false,
			rating: movie.rating || 'empty',
			possessionState: movie.possession_state || 'empty',
			file: null,
			file_remove: null,
			poster_link: null,
			duration: movie.duration,
			actor: movie.actor
		}
	},
	methods: {
		async updateMovie() {
			var formData = new FormData()
			formData.append('title', this.title)
			formData.append('director', this.director)
			formData.append('types', this.types)
			formData.append('actor', this.actor)
			formData.append('duration', this.duration)
			formData.append('rating', this.rating)
			formData.append('possession_state', this.possessionState)
			formData.append('seen', this.seen)
			if (this.file_remove) formData.append('file_remove', this.file_remove)
			if (this.poster_link) formData.append('poster_link', this.poster_link)
			if (this.file) formData.append('file', this.file)
			// Require for laravel
			formData.append('_method', 'patch')

			await this.$axios
				.$post('/api/movies/' + this.$route.params.id, formData)
				.then(res => {
					// reset movies list saved
					this.$store.dispatch('movies/resetMoviesList')
					this.$router.push({ path: `/movies/${this.$route.params.id}` })
				})
				.catch(error => (this.loading = false))
		},
		newFile(file) {
			this.file = file
		},
		processFile(event) {
			this.file = event.target.files[0]
		}
	}
}
</script>

<style lang="scss">
.poster__wrapper {
	@include mq('laptop') {
		margin-right: 90px;
	}
}

.poster__preview {
	@include mq('laptop') {
		width: 200px;
	}
}

.poster__wrapper,
.poster__remove {
	@include mq('laptop') {
		display: block;
	}
}
</style>
