<template>
	<div class="content__inner">
		<div class="content__title">
			<h1>Reset password</h1>
		</div>

		<form
			:class="{ 'form--error': $v.$error }"
			class="form"
			@submit.prevent="reset"
		>
			<div v-if="error" class="errors">
				{{ error }}
			</div>

			<input id="token" v-model="token" name="token" type="hidden" />

			<div class="form__group">
				<label for="email">Mail</label>
				<input
					id="email"
					v-model.trim="email"
					name="email"
					type="text"
					placehold="you@email.com"
					@blur="$v.email.$touch()"
				/>
				<div v-if="$v.email.$dirty && !$v.email.required" class="error">
					Field is required
				</div>
			</div>

			<div class="form__group">
				<label for="password">New password</label>
				<input
					id="password"
					v-model.trim="password"
					name="password"
					type="passwor"
					@blur="$v.password.$touch()"
				/>
				<div v-if="$v.password.$dirty && !$v.password.required" class="error">
					Field is required
				</div>
			</div>

			<div class="form__footer">
				<button
					:disable="isloading"
					:class="{ loading: isloading }"
					class="btn"
					type="submit"
				>
					Reset password
					<div v-if="isloading" class="lds-dual-ring" />
				</button>
				<nuxt-link to="/login" class="form__cancel">
					cancel
				</nuxt-link>
			</div>
		</form>
	</div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'

export default {
	auth: false,
	layout: 'form',
	data() {
		return {
			email: null,
			password: null,
			token: this.$route.params.token,
			error: null,
			isloading: false,
		}
	},
	validations: {
		email: {
			required,
		},
		password: {
			required,
		},
	},
	methods: {
		async reset() {
			this.error = null

			this.$v.$touch()
			if (this.$v.$invalid) return

			this.isloading = true

			let data = {
				email: this.email,
				password: this.password,
				password_confirmation: this.password, // automatically
				token: this.token,
			}

			await this.$axios
				.$post('/api/password/reset', data)
				.then(() => {
					this.isloading = false
					this.$router.push({
						path: '/login',
					})
				})
				.catch((error) => {
					console.log(error.response.data)
				})
		},
	},
}
</script>
