<template>
	<div>
		<div v-if="errors">
			<ul>
				<li v-for="(errorLine, key) in errors" :key="key">
					{{ key }}
					<ul>
						<li v-for="(line, index) in errorLine" :key="index">
							{{ line }}
						</li>
					</ul>
				</li>
			</ul>
		</div>

		<form class="form" @submit.prevent="updateUserSettings">
			<div class="form__group">
				<label for="email">
					Email
				</label>
				<input v-model="email" type="email" />
			</div>

			<div class="form__footer">
				<button
					:disable="loading"
					:class="{ loading: loading }"
					class="btn"
					type="submit"
				>
					Update
					<div v-if="loading" class="lds-dual-ring" />
				</button>
			</div>
		</form>
	</div>
</template>

<script>
export default {
	name: 'EmailForm',
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

			if (responseError.data.errors) {
				this.message = responseError.data.message
				this.errors = responseError.data.errors
			} else {
				await this.$auth.fetchUser() // update auth store
			}
		},
	},
}
</script>
