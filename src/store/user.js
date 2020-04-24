export const actions = {
  async updateSettings(context, data) {
    return await this.$axios
      .$patch('/api/user-options', data)
      .catch((error) => {
        return error.response
      })
  },
  async updateEmail(context, data) {
    return await this.$axios.$patch('/api/user-email', data).catch((error) => {
      return error.response
    })
  },
  async updatePassword(context, data) {
    return await this.$axios
      .$patch('/api/user-password', data)
      .catch((error) => {
        return error.response
      })
  },
}
