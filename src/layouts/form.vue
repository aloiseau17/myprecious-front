<template>
	<div class="app form-page">
		<div class="content">
			<nuxt/>
		</div>
	</div>
</template>

<style lang="scss">
.form-page {
	.app {
		position: relative;
		z-index: 0;
	}

	.content {
		padding: 20px 30px;
		background-color: $third-color;
		min-height: 100vh;

		@include mq('laptop') {
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			height: 100vh;
		}

		&__title {
			text-align: center;
			margin: 25px auto 35px;
		}

		&__inner {
			max-width: 400px;
			margin: 0 auto;
		}

		&__title {
			margin: 0 0 20px;

			&-wrapper {
				text-align: center;
			}
		}
	}
}
</style>
