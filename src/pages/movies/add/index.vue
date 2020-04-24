<template>
  <div>
    <TheTitle title="Add movie" />

    <FormBase
      :errors="errors"
      :loading="loading"
      save-label="Add movie"
      column
      @submit="addMovie"
      @cancel="$router.back()"
    >
      <template #content>
        <FormColumn auto-width>
          <EditPoster :movie-poster="poster_link" @updateFile="newFile" />
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
              v-model="actor"
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
import EditPoster from '~/components/Movies/EditPoster'
import GetMoviesData from '~/mixins/getMoviesData'
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
  layout: 'form',
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
      this.poster_link = null
    },
  },
}
</script>
