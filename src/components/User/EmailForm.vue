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
        <TextField v-model="email" name="email" label="Email" type="email" />
      </template>
    </FormBase>
  </div>
</template>

<script>
import { FormBase, TextField } from '~/components/UI/Form'

export default {
  name: 'EmailForm',
  components: {
    TextField,
    FormBase,
  },
  data() {
    return {
      email: this.$auth.$state.user.email,
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
        email: this.email,
      }
      let responseError = await this.$store.dispatch('user/updateEmail', data)

      this.loading = false

      if (responseError.data && responseError.data.errors) {
        this.message = responseError.data.message
        this.errors = responseError.data.errors
      } else {
        await this.$auth.fetchUser() // update auth store
      }
    },
  },
}
</script>
