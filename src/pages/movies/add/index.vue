<template>
	<div>
		<div class="content__title-wrapper">
			<h1 class="content__title">
				Add movie
			</h1>
		</div>

		<ul v-if="errors">
			<li v-for="(error, key) in errors" :key="key">{{ key }}: {{ error }}</li>
		</ul>

		<form class="form form__column" @submit.prevent="addMovie">
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
							@select="getMovie"
						>
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
							placeholder="Peter Jackson"
						/>
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
							placeholder="Fantasy"
						/>
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
							placeholder="Gollum"
						/>
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
							placeholder="162"
						/>
					</div>

					<edit-poster :movie-poster="poster_link" @updateFile="newFile" />
				</fieldset>
			</div>

			<div class="form__right">
				<fieldset>
					<legend>Status</legend>

					<div class="form__group btn-select__wrapper">
						<button
							:class="{ active: possessionState === 'own' }"
							class="btn-select"
							type="button"
							@click="possessionSelect('own')"
						>
							Owned
						</button>
						<button
							:class="{ active: possessionState === 'to_own' }"
							class="btn-select"
							type="button"
							@click="possessionSelect('to_own')"
						>
							To Own
						</button>
						<input
							id="own"
							v-model="possessionState"
							class="btn-select__input"
							name="possession_state"
							value="own"
							type="radio"
						/>
						<input
							id="to_own"
							v-model="possessionState"
							class="btn-select__input"
							name="possession_state"
							value="to_own"
							type="radio"
						/>
					</div>

					<div class="form__group__radio">
						<input
							id="seen"
							v-model="seen"
							:value="true"
							name="see"
							type="radio"
						/>
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
							type="radio"
						/>
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
							type="radio"
						/>
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
							type="radio"
						/>
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
							type="radio"
						/>
						<label for="bad">
							Bad
						</label>
					</div>
				</fieldset>

				<div class="form__footer">
					<button
						:disable="loading"
						:class="{ loading: loading }"
						class="btn"
						type="submit"
					>
						Add movie
						<div v-if="loading" class="lds-dual-ring" />
					</button>
					<a class="form__cancel" @click.prevent="$router.back()">
						cancel
					</a>
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
		'edit-poster': EditPoster,
	},
	mixins: [GetMoviesData],
	data() {
		return {
			title: '',
			director: '',
			types: '',
			actor: '',
			duration: '',
			file: null,
			filePreview: null,
			poster_link: null,
			rating: 'empty',
			seen: false,
			possessionState: 'empty',
			errors: null,
			loading: false,
		}
	},
	watch: {
		title(newData) {
			// reset filePrewiew on movie change
			if (!newData) this.$emit('resetFilePreview', true)
		},
	},
	methods: {
		async addMovie() {
			if (this.loading) return

			this.loading = true

			var formData = new FormData()
			formData.append('title', this.title)
			formData.append('director', this.director)
			formData.append('types', this.types)
			formData.append('actor', this.actor)
			formData.append('duration', this.duration)
			formData.append('rating', this.rating)
			formData.append('possession_state', this.possessionState)
			formData.append('seen', this.seen)
			if (this.poster_link) formData.append('poster_link', this.poster_link)
			if (this.file) formData.append('file', this.file)

			await this.$axios
				.$post('/api/movies', formData)
				.then(() => {
					// reset movies list saved
					this.$store.dispatch('movies/resetMoviesList')
					// redirect to last page
					let destination = this.$store.getters['navigation/getSavedPage']
						? this.$store.getters['navigation/getSavedPage']['path']
						: '/movies'
					this.$router.push({
						path: destination,
					})
				})
				.catch((error) => {
					this.loading = false
					this.errors = error.response.data.errors
				})
		},
		newFile(file) {
			this.file = file
		},
		possessionSelect(value) {
			this.possessionState === value
				? (this.possessionState = 'empty')
				: (this.possessionState = value)
		},
	},
}
</script>
