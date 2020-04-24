<template>
  <div class="app form-page">
    <MainMenu v-if="$auth.loggedIn" />
    <div class="content">
      <img
        v-if="!$auth.loggedIn"
        class="logo"
        src="~/static/images/logo.svg"
        alt="Logo My Precious"
        width="243"
        height="50"
      />
      <nuxt />
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
@import '~assets/scss/layout/layout-form.scss';
</style>
