export const actions = {
	async updateSettings({}, data) {
		await this.$axios
			.$patch('/api/user-options', data)
			.catch(error => console.log(error))
	},
	async updateEmail({}, data) {
		return await this.$axios.$patch('/api/user-email', data).catch(error => {
			return error.response
		})
	},
	async updatePassword({}, data) {
		return await this.$axios.$patch('/api/user-password', data).catch(error => {
			return error.response
		})
	}
}
