<template>
  <div class="content">
    <TheTitle title="Login" />

    <FormBase
      :errors="error"
      :loading="loading"
      save-label="Login"
      no-cancel
      @submit="login"
    >
      <template #content>
        <TextField
          v-model="username"
          name="email"
          placeholder="Email"
          type="email"
          autocomplete="username"
          required
        />

        <TextField
          v-model="password"
          name="password"
          placeholder="Password"
          type="password"
          autocomplete="current-password"
          required
        />
      </template>
    </FormBase>

    <small>
      <nuxt-link to="/lost-password">
        Lost password
      </nuxt-link>
    </small>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import TheTitle from '~/components/UI/TheTitle'
import { FormBase, TextField } from '~/components/UI/Form'

export default {
  layout: 'dark-centered',
  components: {
    TheTitle,
    FormBase,
    TextField,
  },
  data() {
    return {
      username: null,
      password: null,
      error: null,
      loading: false,
    }
  },
  validations: {
    username: {
      required,
    },
    password: {
      required,
    },
  },
  methods: {
    async login() {
      this.error = null

      this.$v.$touch()

      if (this.$v.$invalid) return

      this.loading = true

      return this.$auth
        .loginWith('myprecious', {
          data: {
            username: this.username,
            password: this.password,
          },
        })
        .catch((e) => {
          this.loading = false
          this.error = [e.response.data]
        })
    },
  },
}
</script>

<style lang="scss">
@import '~assets/scss/pages/login.scss';
</style>
