<template>
  <div class="content__inner">
    <div class="content__title">
      <h1>Lost password</h1>
    </div>

    <p v-if="sent">
      We have e-mailed your password reset link!
    </p>

    <form
      :class="{ 'form--error': $v.$error }"
      class="form"
      @submit.prevent="reset"
    >
      <div v-if="error" class="errors">
        {{ error }}
      </div>

      <div class="form__group">
        <label for="email">Enter your account e-mail:</label>
        <input
          id="email"
          v-model.trim="email"
          name="email"
          type="text"
          placehold="you@email.com"
          @blur="$v.email.$touch()"
        />
        />
        <div v-if="$v.email.$dirty && !$v.email.required" class="error">
          Field is required
        </div>
      </div>

      <div class="form__footer">
        <button
          :disable="isloading"
          :class="{ loading: isloading }"
          class="btn"
          type="submit"
        >
          Reset password
          <div v-if="isloading" class="lds-dual-ring" />
        </button>
        <nuxt-link to="/login" class="form__cancel">
          cancel
        </nuxt-link>
      </div>
    </form>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'

export default {
  auth: false,
  layout: 'form',
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
          this.isloading = false
          this.sent = true
        })
        .catch(() => {
          // console.log(error.response.data)
        })
    },
  },
}
</script>
