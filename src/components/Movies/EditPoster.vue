<template>
  <div class="form__group poster__wrapper">
    <label class="poster__label">Poster</label>

    <div class="poster" @click="addFile">
      <input
        id="file"
        ref="poster-file"
        name="file"
        class="poster__file"
        type="file"
        @change="processFile($event)"
      />
      <transition mode="out-in">
        <img key="image_default" :src="previewSrc" class="poster__preview" />
      </transition>
      <!-- Edit icon -->
      <img src="/images/edit.svg" class="poster__edit" />
    </div>
    <p class="poster__remove" @click="removePoster">Remove poster</p>
  </div>
</template>

<script>
export default {
  name: 'EditPoster',
  props: {
    moviePoster: {
      type: String,
      default: null,
    },
    movieImage: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      file: null,
      filePreview: null,
    }
  },
  computed: {
    hasImage() {
      return this.filePreview || this.movieImage || this.moviePoster
        ? true
        : false
    },
    image() {
      return this.movieImage
        ? process.env.POSTER_STORAGE_URL + this.movieImage
        : '/images/poster_default.png'
    },
    previewSrc: function () {
      if (!this.hasImage) return '/images/poster_default.png'

      if (this.file && this.filePreview) return this.filePreview
      else if (this.moviePoster || (this.file && !this.filePreview))
        return this.moviePoster
      else if (this.movieImage) return this.image
      else return '/images/poster_default.png'
    },
  },
  created: function () {
    this.$parent.$on('resetFilePreview', this.resetFilePreview)
  },
  methods: {
    addFile() {
      this.$refs['poster-file'].click()
    },
    processFile(event) {
      this.file = event.target.files[0]
      this.$emit('updateFile', this.file)
      this.loadFilePreview()
    },
    async loadFilePreview() {
      if (!this.file) return null

      const reader = new FileReader()
      reader.onload = (e) => {
        this.filePreview = e.target.result
      }

      reader.readAsDataURL(this.file)
    },
    removePoster: function () {
      this.file = null
      this.filePreview = null
      this.$emit('updateFile', null)
    },
    resetFilePreview: function () {
      this.filePreview = null
      this.$emit('updateFile', null)
    },
  },
}
</script>

<style scope lang="scss">
@import '~assets/scss/components/EditPoster.scss';
</style>
