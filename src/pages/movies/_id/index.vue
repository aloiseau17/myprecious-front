<template>
  <div>
    <div class="back-btn__wrapper">
      <nuxt-link :to="lastPage" class="back-btn">
        <img src="/images/back.svg" alt="Back button" />
      </nuxt-link>
    </div>

    <TheTitle title="Movie informations" />

    <div class="movie">
      <div class="movie__image__wrapper">
        <div class="movie__image">
          <img
            :src="image"
            class="movie__poster"
            alt="Movie poster"
            width="230"
            height="310"
          />
          <div v-if="movie.rating">
            <div class="picto__wrapper">
              <Picto
                :type="movie.rating"
                :class="movie.rating"
                class="rating"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="movie__infos__wrapper">
        <ul class="movie__picto">
          <li v-if="movie.seen" class="movie__picto__item">
            <Picto type="seen" /> Seen
          </li>
          <li v-if="movie.possession_state" class="movie__picto__item">
            <Picto :type="movie.possession_state" />
            {{ movie.possessionState === 'own' ? 'Own' : 'To own' }}
          </li>
        </ul>

        <h2 class="movie__title">
          {{ movie.title }}
        </h2>

        <ul class="movie__infos">
          <li v-if="movie.director" class="movie__infos__item movie__director">
            By <strong>{{ movie.director.name }}</strong>
          </li>
          <li
            v-if="movie.types.length > 0"
            class="movie__infos__item movie__types"
          >
            Types:
            <strong v-for="(type, index) in movie.types" :key="type.id">
              {{ type.name | coma(index, movie.types.length) }}
            </strong>
          </li>
          <li v-if="movie.actor" class="movie__infos__item movie__director">
            With <strong>{{ movie.actor }}</strong>
          </li>
          <li v-if="movie.duration" class="movie__infos__item movie__director">
            Duration <strong>{{ movie.duration }}m</strong>
          </li>
        </ul>

        <div class="form__footer">
          <nuxt-link :to="'/movies/edit/' + movie.id" class="btn">
            Edit
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Picto from '~/components/Movies/Picto'
import TheTitle from '~/components/UI/TheTitle'

export default {
  components: { Picto, TheTitle },
  layout: 'form',
  async asyncData({ route, $axios }) {
    let movie = await $axios
      .$get('/api/movies/' + route.params.id)
      .then((res) => {
        return res
      })
      .catch((error) => console.log(error))

    return {
      movie,
    }
  },
  data() {
    return {
      movie: null,
    }
  },
  computed: {
    image() {
      return this.movie.image
        ? process.env.POSTER_STORAGE_URL + this.movie.image
        : '/images/poster_default.png'
    },
    lastPage() {
      return this.$store.getters['navigation/getSavedPage']
    },
  },
}
</script>

<style scoped lang="scss">
@import '~assets/scss/pages/Movies_Id.scss';
</style>
