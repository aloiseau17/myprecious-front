<template>
  <div class="content">
    <div class="title__wrapper">
      <h1>Login</h1>
    </div>

    <form
      :class="{ 'form--error': $v.$error }"
      class="form"
      @submit.prevent="login"
    >
      <div v-if="error" class="errors">
        {{ error }}
      </div>

      <div class="form__group">
        <input
          id="email"
          v-model.trim="username"
          name="email"
          type="text"
          placeholder="Email"
          @blur="$v.username.$touch()"
        />
        <div v-if="$v.username.$dirty && !$v.username.required" class="error">
          Field is required
        </div>
      </div>

      <div class="form__group">
        <input
          id="password"
          v-model="password"
          name="password"
          type="password"
          placeholder="Password"
          @blur="$v.password.$touch()"
        />
        <div v-if="$v.password.$dirty && !$v.password.required" class="error">
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
          Login
          <div v-if="isloading" class="lds-dual-ring" />
        </button>
      </div>
    </form>

    <small>
      <nuxt-link to="/lost-password">Lost password</nuxt-link>
    </small>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'

export default {
  layout: 'login',
  data() {
    return {
      username: null,
      password: null,
      error: null,
      isloading: false,
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

      this.isloading = true

      return this.$auth
        .loginWith('myprecious', {
          data: {
            username: this.username,
            password: this.password,
          },
        })
        .catch((e) => {
          this.isloading = false
          this.error = e.response.data
        })
    },
  },
}
</script>

<style scoped lang="scss">
.content {
  display: flex;
  flex: 1;
  flex-direction: column;
  color: red;

  @include mq('tablet') {
    width: 300px;
    margin: 0 auto;
  }
}

form {
  flex: 1 0 auto;
  margin-bottom: 20px;

  @include mq('tablet') {
    flex: none;
  }
}

small {
  font-size: 11px;

  @include mq('tablet') {
    font-size: 14px;
  }
}
</style>
