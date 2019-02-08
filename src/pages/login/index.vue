<template>
	<form @submit.prevent="login">
		<div 
			v-if="error"
			class="error">
			{{ error }}
		</div>
		<input
			v-model="username"
			type="text">
		<input
			v-model="password"
			type="password">
		<input
			type="submit"
			value="Login">
	</form>
</template>

<script>
export default {
	data() {
		return {
			username: null,
			password: null,
			error: null
		}
	},
	methods: {
		async login(e) {
			this.error = null

			return this.$auth
				.loginWith('myprecious', {
					data: {
						username: this.username,
						password: this.password
					}
				})
				.catch(e => (this.error = e.response.data))
		}
	}
}
</script>
