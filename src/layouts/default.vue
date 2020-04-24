<template>
  <div :class="currentRoute" class="app default-page">
    <MainMenu />
    <div class="content">
      <nuxt />
    </div>
  </div>
</template>

<script>
import MainMenu from '~/components/Navigation/MainMenu'

export default {
  components: { MainMenu },
  data() {
    return {
      currentRoute: '',
    }
  },
  watch: {
    $route: {
      handler: function () {
        switch (this.$route.name) {
          case 'movies':
            this.currentRoute = 'seen'
            break
          case 'movies-to-see':
            this.currentRoute = 'see'
            break
          case 'movies-to-buy':
            this.currentRoute = 'buy'
            break
          case 'movies-own':
            this.currentRoute = 'own'
            break
          default:
            this.currentRoute = null
        }
      },
      immediate: true,
    },
  },
}
</script>

<style lang="scss">
@import '~assets/scss/layout/layout-default.scss';
</style>
