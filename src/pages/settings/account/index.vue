<template>
  <div class="content__inner">
    <div class="back-btn__wrapper">
      <nuxt-link :to="lastPage" class="back-btn">
        <img src="/images/back.svg" alt="Back button" />
      </nuxt-link>
    </div>

    <div class="content__title-wrapper">
      <h1 class="content__title">
        My account
      </h1>
    </div>

    <div class="settings__block">
      <email-form />
    </div>

    <div class="settings__block">
      <password-form />
    </div>
  </div>
</template>

<script>
import EmailForm from '~/components/User/EmailForm'
import PasswordForm from '~/components/User/PasswordForm'
export default {
  layout: 'form',
  components: {
    'email-form': EmailForm,
    'password-form': PasswordForm,
  },
  computed: {
    lastPage() {
      return this.$store.getters['navigation/getSavedPage']
    },
  },
}
</script>

<style scoped lang="scss">
.settings {
  &__block {
    margin-bottom: 35px;
  }
}
</style>
