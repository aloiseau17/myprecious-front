<template>
  <div>
    <div class="back-btn__wrapper">
      <nuxt-link :to="lastPage" class="back-btn">
        <img src="/images/back.svg" alt="Back button" />
      </nuxt-link>
    </div>

    <div class="content__title">
      <h1>Movie informations</h1>
    </div>

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

export default {
  layout: 'form',
  components: { Picto },
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
.movie {
  @include mq('tablet') {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  &__title {
    color: $light-base;
    font-weight: 600;
    font-size: 22px;
    text-transform: uppercase;
  }

  &__image {
    position: relative;
    display: inline-block;
    max-width: 150px;
    margin: 0 auto;

    &__wrapper {
      text-align: center;

      @include mq('tablet') {
        margin-right: 90px;
      }
    }

    .picto {
      width: 70px;
      height: 50px;

      &__wrapper {
        @include mq('laptop', 'bottom') {
          position: absolute;
          top: 0;
          left: 0;
          display: block;
          width: 100%;
          height: 100%;
          transform: translateY(10px);
        }
      }
    }
  }

  &__poster {
    display: block;
    max-width: 100%;
    height: auto;
  }

  &__picto {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 20px 0;
    padding: 0;
    list-style: none;

    @include mq('laptop') {
      display: block;
    }

    &__item {
      margin-right: 10px;

      @include mq('laptop') {
        margin-bottom: 8px;
      }
    }

    .picto {
      margin-right: 5px;

      @include mq('laptop') {
        vertical-align: bottom;
      }
    }
  }

  &__infos {
    padding: 0;
    font-weight: 300;
    list-style: none;

    strong {
      font-weight: 600;
    }

    &__item {
      margin-bottom: 5px;
    }
  }
}

.rewatch {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
}

.rating {
  position: absolute;
  right: 0;
  bottom: 0;

  &.fantastic {
    transform: translate(60%, 3px) rotate(25deg);
  }
  &.bad {
    transform: translate(45%, 13px) rotate(-5deg);
  }
}

.form__footer {
  @include mq('laptop') {
    text-align: left;
  }
}
</style>
