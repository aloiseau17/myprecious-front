<template>
  <nuxt-link :to="'/movies/' + movie.id" class="movie">
    <div class="movie__image">
      <img
        :src="image"
        class="movie__poster"
        alt="Movie poster"
        width="230"
        height="310"
      />
      <div v-if="movie.rating">
        <Picto :type="movie.rating" :class="movie.rating" class="rating" />
      </div>
    </div>
    <Rewatch v-if="rewatch" />
    <div class="movie__content">
      <h2 class="movie__title">
        {{ movie.title }}
      </h2>
      <ul class="movie__picto">
        <li v-if="movie.seen" class="movie__picto__item">
          <Picto type="seen" />
        </li>
        <li v-if="!movie.seen" class="movie__picto__item">
          <Picto type="to-see" />
        </li>
        <li v-if="movie.possession_state" class="movie__picto__item">
          <Picto :type="movie.possession_state" />
        </li>
      </ul>
    </div>
  </nuxt-link>
</template>

<script>
import Picto from '~/components/Movies/Picto'
import Rewatch from '~/components/Movies/Pictos/Rewatch'

export default {
  name: 'MovieItem',
  components: { Picto, Rewatch },
  props: {
    movie: {
      type: Object,
      required: true,
    },
    rewatch: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    image() {
      return this.movie.image
        ? process.env.POSTER_STORAGE_URL + this.movie.image
        : '/images/poster_default.png'
    },
  },
}
</script>

<style scoped lang="scss">
@import '~assets/scss/components/MovieItem.scss';
</style>
