<template>
  <div class="content__inner">
    <TheTitle title="Lost password" />

    <p v-if="sent">We have e-mailed your password reset link!</p>

    <FormBase
      :errors="error"
      :loading="isloading"
      save-label="Reset password"
      @submit="reset"
      @cancel="$router.push({ name: 'login' })"
    >
      <template #content>
        <TextField
          v-model="email"
          name="email"
          label="Enter your account e-mail:"
          type="email"
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
      sent: false,
      email: null,
      error: null,
      isloading: false,
    }
  },
  validations: {
    email: {
      required,
    },
  },
  methods: {
    async reset() {
      this.error = null
      this.sent = false

      this.$v.$touch()
      if (this.$v.$invalid) return

      this.isloading = true

      let data = {
        email: this.email,
        url: process.env.APP_URL + '/reset-password',
      }

      await this.$axios
        .$post('/api/password/email', data)
        .then(() => {
          this.sent = true
        })
        .catch(() => {
          // console.log(error.response.data)
        })
        .finally(() => {
          this.isloading = false
        })
    },
  },
}
</script>
