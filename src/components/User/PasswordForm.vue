<template>
	<div>
		<div v-if="errors">
			<ul>
				<li
					v-for="(errorLine, key) in errors"
					:key="key">
					{{ key }}
					<ul>
						<li
							v-for="(line, index) in errorLine"
							:key="index">
							{{ line }}
						</li>
					</ul>
				</li>
			</ul>
		</div>

		<form @submit.prevent="updateUserSettings">

			<div>
				<label for="old_password">
					Old password
				</label>
				<input
					id="old_password"
					v-model="old_password"
					type="password">
			</div>

			<div>
				<label for="password">
					New password
				</label>
				<input
					id="password"
					v-model="password"
					type="password">
			</div>


			<div>
				<label for="password_confirmation">
					Confirm password
				</label>
				<input
					id="password_confirmation"
					v-model="password_confirmation"
					type="password">
			</div>

			<div v-if="!loading">
				<input
					type="submit"
					value="Update">
			</div>
			<div v-else>
				loading
			</div>
		</form>

	</div>
</template>

<script>
export default {
	name: 'PasswordForm',
	data() {
		return {
			old_password: null,
			password: null,
			password_confirmation: null,
			loading: false,
			errors: null,
			message: null
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
				password_confirmation: this.password_confirmation
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
		}
	}
}
</script>
