<template>
  <div class="content__inner">
    <div class="back-btn__wrapper">
      <nuxt-link :to="lastPage" class="back-btn">
        <img src="/images/back.svg" alt="Back button" />
      </nuxt-link>
    </div>

    <the-title title="My account" />

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
import TheTitle from '~/components/UI/TheTitle'

export default {
  components: {
    'email-form': EmailForm,
    'password-form': PasswordForm,
    'the-title': TheTitle,
  },
  layout: 'form',
  computed: {
    lastPage() {
      return this.$store.getters['navigation/getSavedPage']
    },
  },
}
</script>

<style scoped lang="scss">
@import '~assets/scss/pages/Settings_Account.scss';
</style>
