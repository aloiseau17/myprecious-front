<template>
	<div class="error-page">
		<div class="error-page__content">
			<svg
				class="error-page__icon"
				xmlns="http://www.w3.org/2000/svg"
				width="90"
				height="90"
				fill="#DBE1EC"
				viewBox="0 0 48 48"
			>
				<path
					d="M22 30h4v4h-4zm0-16h4v12h-4zm1.99-10C12.94 4 4 12.95 4 24s8.94 20 19.99 20S44 35.05 44 24 35.04 4 23.99 4zM24 40c-8.84 0-16-7.16-16-16S15.16 8 24 8s16 7.16 16 16-7.16 16-16 16z"
				/>
			</svg>

			<div class="error-page__title">
				{{ message }}
			</div>

			<p v-if="statusCode === 404">
				<nuxt-link class="btn" to="/">
					Homepage
				</nuxt-link>
			</p>
		</div>
	</div>
</template>

<script>
export default {
	layout: 'form',
	name: 'NuxtError',
	props: {
		error: {
			type: Object,
			default: null
		}
	},
	computed: {
		statusCode() {
			return (this.error && this.error.statusCode) || 500
		},
		message() {
			return this.error.message || `<%= messages.client_error %>`
		}
	},
	head() {
		return {
			title: this.message,
			meta: [
				{
					name: 'viewport',
					content:
						'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no'
				}
			]
		}
	}
}
</script>

<style scoped lang="scss">
.error-page {
	padding: 1rem;
	text-align: center;

	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;

	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;

	&__icon {
		display: block;
		margin: 0 auto;
		margin-bottom: 30px;
	}

	&__title {
		color: $text-color;
		font-weight: 300;
		font-size: 24px;
		text-transform: uppercase;
		text-align: center;

		display: inline-block;
		margin: 0 auto;

		@include mq('laptop') {
			font-size: 29px;
		}
	}
}
</style>
