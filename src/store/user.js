export const actions = {
	async updateSettings({}, data) {
		await this.$axios
			.$patch('/api/user-options', data)
			.catch(error => console.log(error))
	}
}
