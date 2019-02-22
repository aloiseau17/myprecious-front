<template>
	<form
		:class="{ 'form-group--error': $v.$error }"
		@submit.prevent="login">
		<div 
			v-if="error"
			class="error">
			{{ error }}
		</div>

		<div>
			<label for="email">
				Email
			</label>
			<input
				id="email"
				v-model.trim="username"
				name="email"
				type="text"
				@blur="$v.username.$touch()">
			<div
				v-if="$v.username.$dirty && !$v.username.required"
				class="error">
				Field is required
			</div>
		</div>

		<div>
			<label for="password">
				Password
			</label>
			<input
				id="password"
				v-model="password"
				name="password"
				type="password"
				@blur="$v.password.$touch()">
			<div
				v-if="$v.password.$dirty && !$v.password.required"
				class="error">
				Field is required
			</div>
		</div>
		<div>
			<input
				type="submit"
				value="Login">
			<div
				v-if="isloading"
				class="lds-dual-ring" />
		</div>
	</form>
</template>

<script>
import { required } from 'vuelidate/lib/validators'

export default {
	data() {
		return {
			username: null,
			password: null,
			error: null,
			isloading: false
		}
	},
	validations: {
		username: {
			required
		},
		password: {
			required
		}
	},
	methods: {
		async login(e) {
			this.error = null

			this.$v.$touch()

			if (this.$v.$invalid) return

			this.isloading = true

			return this.$auth
				.loginWith('myprecious', {
					data: {
						username: this.username,
						password: this.password
					}
				})
				.catch(e => {
					this.isloading = false
					this.error = e.response.data
				})
		}
	}
}
</script>

<style scoped>
.form-group--error {
	border: 1px red;
}
.error {
	color: red;
}
.lds-dual-ring {
	display: block;
	width: 64px;
	height: 64px;
}
.lds-dual-ring:after {
	content: ' ';
	display: block;
	width: 46px;
	height: 46px;
	margin: 1px;
	border-radius: 50%;
	border: 5px solid #000;
	border-color: #000 transparent #000 transparent;
	animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
</style>
