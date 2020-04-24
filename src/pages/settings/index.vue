<template>
  <div>
    <div class="back-btn__wrapper">
      <nuxt-link :to="lastPage" class="back-btn">
        <img src="/images/back.svg" alt="Back button" />
      </nuxt-link>
    </div>

    <TheTitle title="Manage settings" />

    <FormBase
      :errors="errors"
      :loading="loading"
      save-label="Update"
      @submit="updateUserSettings"
      @cancel="$router.push(lastPage)"
    >
      <template #content>
        <SelectField
          v-model="orderSelected"
          name="order"
          required
          :items="orderChoices"
        />
      </template>
    </FormBase>
  </div>
</template>

<script>
import TheTitle from '~/components/UI/TheTitle'
import { FormBase, SelectField } from '~/components/UI/Form'

export default {
  components: {
    TheTitle,
    FormBase,
    SelectField,
  },
  layout: 'form',
  data() {
    return {
      errors: null,
      loading: false,
      orderSelected: null,
      orderChoices: [
        {
          label: 'Most recent first',
          value: 'created_at__desc',
        },
        {
          label: 'Older first',
          value: 'created_at__asc',
        },
        {
          label: 'Alphabetical order',
          value: 'title__asc',
        },
        {
          label: 'Alphabetical order (reverse)',
          value: 'title__desc',
        },
      ],
    }
  },
  computed: {
    lastPage() {
      return this.$store.getters['navigation/getSavedPage']
    },
    user() {
      return this.$auth.$state.user
    },
  },
  mounted() {
    this.setCurrentOrder()
  },
  methods: {
    setCurrentOrder() {
      const { list_order_by, list_order } = this.user.user_options

      this.orderSelected =
        list_order_by && list_order
          ? `${list_order_by}__${list_order}`.toLowerCase()
          : 'created_at__desc'
    },
    async updateUserSettings() {
      this.loading = true
      this.errors = null

      const newData = this.orderSelected.split('__')

      const responseError = await this.$store.dispatch('user/updateSettings', {
        list_order_by: newData[0],
        list_order: newData[1],
      })

      if (responseError.data && responseError.data.errors) {
        this.message = responseError.data.message
        this.errors = responseError.data.errors
        this.loading = false
      } else {
        await this.$auth.fetchUser() // update auth store
        // reset movies list saved
        this.$store.dispatch('movies/resetMoviesList')
        // redirect to last page
        this.$router.push({
          path: this.$store.getters['navigation/getSavedPage']['path'],
        })
      }
    },
  },
}
</script>
