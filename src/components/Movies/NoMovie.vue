<template>
  <div class="no-movie">
    <p>This's quite empty here...</p>
    <img
      src="/images/add_first.svg"
      alt="Come on, add your movie"
      width="200px"
    />
    <div class="no-movie__btn">
      <nuxt-link to="/movies/add" class="btn">
        Add movie
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NoMovie',
}
</script>

<style scoped lang="scss">
@import '~assets/scss/components/NoMovie.scss';
</style>
