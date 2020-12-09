<template>
  <div class="content__inner">
    <TheTitle title="Reset password" />

    <FormBase
      :errors="error"
      :loading="isloading"
      save-label="Reset password"
      @submit="reset"
      @cancel="$router.push({ name: 'login' })"
    >
      <template #content>
        <input id="token" v-model="token" name="token" type="hidden" />

        <TextField
          v-model="email"
          name="email"
          label="Mail"
          type="email"
          required
        />

        <TextField
          v-model="password"
          name="password"
          label="New password"
          type="password"
          required
        />
      </template>
    </FormBase>
  </div>
</template>

<script>
import { FormBase, TextField } from '~/components/UI/Form'
import { required } from 'vuelidate/lib/validators'
import TheTitle from '~/components/UI/TheTitle'

export default {
  auth: 'guest',
  components: {
    TheTitle,
    FormBase,
    TextField,
  },
  layout: 'dark-centered',
  data() {
    return {
      email: null,
      password: null,
      token: this.$route.params.token,
      error: null,
      isloading: false,
    }
  },
  validations: {
    email: {
      required,
    },
    password: {
      required,
    },
  },
  methods: {
    async reset() {
      this.error = null

      this.$v.$touch()
      if (this.$v.$invalid) return

      this.isloading = true

      let data = {
        email: this.email,
        password: this.password,
        password_confirmation: this.password, // automatically
        token: this.token,
      }

      await this.$axios
        .$post('/api/password/reset', data)
        .then(() => {
          this.$router.push({
            path: '/login',
          })
        })
        .catch((error) => {
          if (error.response.data && error.response.data.message) {
            this.error = [error.response.data.message]
          }
          console.og(error.response.data)
        })
        .finally(() => {
          this.isloading = false
        })
    },
  },
}
</script>
