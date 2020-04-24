<template>
  <div>
    <TheTitle title="Update movie" />
    <FormBase
      :errors="errors"
      save-label="Update"
      column
      @submit="updateMovie"
      @cancel="$router.push({ name: 'movies-id', params: { id: movieId } })"
    >
      <template #content>
        <FormColumn auto-width>
          <EditPoster
            :movie-poster="poster_link"
            :movie-image="image"
            @updateFile="newFile"
          />
        </FormColumn>

        <FormColumn>
          <FieldsetBase legend="Movie">
            <AutocompleteField
              v-model="title"
              :fetch-suggestions="autocompleteTitle"
              :select="getMovie"
              required
              name="title"
              label="Title"
              placeholder="The lord of the ring"
            >
              <template slot-scope="{ item }">
                <div class="value">{{ item.title }} (id: {{ item.id }})</div>
              </template>
            </AutocompleteField>

            <TextField
              v-model="director"
              name="director"
              label="Director"
              placeholder="Peter Jackson"
            />

            <TextField
              v-model="types"
              name="types"
              label="Types"
              placeholder="Fantasy;Comedy"
            />

            <TextField
              v-model="types"
              name="actor"
              label="Main actor"
              placeholder="Gollum"
            />

            <TextField
              v-model="duration"
              name="duration"
              label="Duration (min)"
              placeholder="162"
            />
          </FieldsetBase>
        </FormColumn>

        <FormColumn>
          <FieldsetBase legend="Status">
            <RadioButtonField
              v-model="possessionState"
              name="possession_state"
              :items="[
                { label: 'Owned', value: 'own' },
                { label: 'To Own', value: 'to_own' },
              ]"
              @reset="possessionState = 'empty'"
            />

            <RadioField
              v-model="seen"
              name="seen"
              :items="[
                { label: 'Seen', value: true },
                { label: 'To see', value: false },
              ]"
            />
          </FieldsetBase>

          <FieldsetBase legend="Evaluation">
            <RadioField
              v-model="rating"
              name="rating"
              :items="[
                { label: 'Fantastic', value: 'fantastic' },
                { label: 'Ok', value: 'empty' },
                { label: 'Bad', value: 'bad' },
              ]"
            />
          </FieldsetBase>
        </FormColumn>
      </template>
    </FormBase>
  </div>
</template>

<script>
import GetMoviesData from '~/mixins/getMoviesData'

import EditPoster from '~/components/Movies/EditPoster'
import TheTitle from '~/components/UI/TheTitle'
import {
  AutocompleteField,
  FieldsetBase,
  FormBase,
  FormColumn,
  RadioButtonField,
  RadioField,
  TextField,
} from '~/components/UI/Form'

export default {
  layout: 'form',
  components: {
    EditPoster,
    TheTitle,
    TextField,
    FieldsetBase,
    AutocompleteField,
    RadioField,
    RadioButtonField,
    FormBase,
    FormColumn,
  },
  mixins: [GetMoviesData],
  async asyncData({ route, $axios }) {
    let movie = await $axios
      .$get('/api/movies/' + route.params.id)
      .then((res) => {
        return res
      })
      .catch((error) => console.log(error))

    return {
      movieId: movie.id,
      title: movie.title,
      director: movie.director ? movie.director.name : null,
      types:
        movie.types.length > 0
          ? movie.types.map((type) => type.name).join(';')
          : null,
      image: movie.image,
      seen: movie.seen ? true : false,
      rating: movie.rating || 'empty',
      possessionState: movie.possession_state || 'empty',
      file: null,
      file_remove: null,
      poster_link: null,
      duration: movie.duration,
      actor: movie.actor,
    }
  },
  data() {
    return {
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
        .then(() => {
          // reset movies list saved
          this.$store.dispatch('movies/resetMoviesList')
          this.$router.push({
            path: `/movies/${this.$route.params.id}`,
          })
        })
        .catch(() => (this.loading = false))
    },
    newFile(file) {
      if (!file) {
        this.file_remove = true
      }

      this.file = file
    },
    processFile(event) {
      this.file = event.target.files[0]
    },
    possessionSelect(value) {
      this.possessionState === value
        ? (this.possessionState = 'empty')
        : (this.possessionState = value)
    },
  },
}
</script>

<style lang="scss">
@import '~assets/scss/pages/Movies_Edit.scss';
</style>
