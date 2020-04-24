<template>
  <div class="filters__wrapper">
    <button
      :class="{ open: open }"
      class="filters__button"
      @click="open = true"
    >
      <img
        class="filters__button__mobile"
        src="/images/filter.png"
        alt="filter us"
        width="180"
        height="60"
      />
      <img
        class="filters__button__laptop"
        src="/images/filter-laptop.png"
        alt="filter us"
        width="140"
        height="190"
      />
    </button>

    <div :class="{ open: open }" class="filters">
      <div class="back-btn__wrapper">
        <div class="back-btn" @click="open = false">
          <img src="/images/back.svg" alt="Back button" />
        </div>
      </div>

      <FormBase
        class="filters__inner"
        :errors="errors"
        save-label="Filter"
        cancel-label="cancel"
        @submit="filter"
        @cancel="open = false"
      >
        <template #content>
          <FieldsetBase legend="By rating">
            <RadioField
              v-model="filters.rating"
              name="rating"
              :items="[
                { label: 'Fantastic', value: 'fantastic' },
                { label: 'Bad', value: 'bad' },
                { label: 'All', value: null },
              ]"
            />
          </FieldsetBase>

          <FieldsetBase legend="By type">
            <TextField
              v-model="filters.types"
              name="types"
              placeholder="Fantasy"
            />
          </FieldsetBase>

          <FieldsetBase legend="By director">
            <TextField
              v-model="filters.director"
              name="director"
              placeholder="Peter Jackson"
            />
          </FieldsetBase>

          <FieldsetBase legend=" Movie begining with...">
            <TextField
              v-model="filters.first_letter"
              name="firstLetter"
              placeholder="A"
            />
          </FieldsetBase>
        </template>
      </FormBase>
    </div>
  </div>
</template>

<script>
import {
  FieldsetBase,
  FormBase,
  RadioField,
  TextField,
} from '~/components/UI/Form'

export default {
  name: 'Filters',
  components: {
    FieldsetBase,
    FormBase,
    RadioField,
    TextField,
  },
  data() {
    return {
      filters: {
        rating: null,
        types: null,
        director: null,
        first_letter: null,
      },
      open: false,
      errors: null,
    }
  },
  computed: {
    noRating() {
      return !this.filters.rating ? 'empty' : null
    },
  },
  watch: {
    open(newVal) {
      if (newVal) document.documentElement.style.overflowY = 'hidden'
      else document.documentElement.style.overflowY = 'auto'
    },
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
        .filter((key) => {
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
      this.open = false
    },
  },
}
</script>

<style scoped lang="scss">
@import '~assets/scss/components/Filters.scss';
</style>
