<template>
	<div class="app form-page">
		<main-menu />
		<div class="content">
			<nuxt/>
		</div>
	</div>
</template>

<script>
import MainMenu from '~/components/Navigation/MainMenu'

export default {
	components: { MainMenu }
}
</script>

<style lang="scss">
.form-page {
	min-height: 100vh;
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: strech;
	align-items: strech;

	.app {
		position: relative;
		z-index: 0;
	}

	.main-menu {
		@include mq('laptop', 'bottom') {
			display: none;
		}

		.menu-burger__pages {
			background-color: #fff;
		}
	}

	.content {
		flex: 1 1 auto;

		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;

		padding: 20px 30px;
		background-color: $third-color;

		&__title {
			text-align: center;
			margin: 0 0 20px;

			@include mq('laptop') {
				margin-bottom: 120px;
			}

			&-wrapper {
				text-align: center;
			}
		}

		&__inner {
			width: 80%;
			max-width: 400px;
			margin: 0 auto;
		}
	}
}
</style>
