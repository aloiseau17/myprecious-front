export const actions = {
	async updateSettings({ $axios }, data) {
		await $axios
			.$patch('/api/user-options', data)
			.catch(error => console.log(error))
	},
	async updateEmail({ $axios }, data) {
		return await $axios.$patch('/api/user-email', data).catch(error => {
			return error.response
		})
	},
	async updatePassword({ $axios }, data) {
		return await $axios.$patch('/api/user-password', data).catch(error => {
			return error.response
		})
	}
}
