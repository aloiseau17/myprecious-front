<template>
  <div class="app">
    <MainMenu v-if="$auth.loggedIn" />
    <div class="layout layout--light layout--centered">
      <div class="content">
        <nuxt />
      </div>
    </div>
  </div>
</template>

<script>
import MainMenu from '~/components/Navigation/MainMenu'

export default {
  components: { MainMenu },
}
</script>

<style lang="scss">
@import '~assets/scss/layout/light-centered.scss';
</style>
