<template>
  <div>
    <FormBase
      :errors="errors"
      :loading="loading"
      save-label="Update"
      no-cancel
      @submit="updateUserSettings"
    >
      <template #content>
        <TextField
          v-model="old_password"
          name="old_password"
          label="Old password"
          type="password"
          required
        />

        <TextField
          v-model="password"
          name="new_password"
          label="New password"
          type="password"
          required
        />

        <TextField
          v-model="password_confirmation"
          name="password_confirmation"
          label="Confirm password"
          type="password"
          required
        />
      </template>
    </FormBase>
  </div>
</template>

<script>
import { FormBase, TextField } from '~/components/UI/Form'

export default {
  name: 'PasswordForm',
  components: {
    FormBase,
    TextField,
  },
  data() {
    return {
      old_password: null,
      password: null,
      password_confirmation: null,
      loading: false,
      errors: null,
      message: null,
    }
  },
  methods: {
    async updateUserSettings() {
      this.loading = true
      this.message = null
      this.errors = null

      let data = {
        old_password: this.old_password,
        password: this.password,
        password_confirmation: this.password_confirmation,
      }
      let responseError = await this.$store.dispatch(
        'user/updatePassword',
        data
      )

      this.loading = false

      if (responseError && responseError.data.errors) {
        this.message = responseError.data.message
        this.errors = responseError.data.errors
      }
    },
  },
}
</script>
