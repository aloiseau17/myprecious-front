<template>
	<div class="app__wrapper login-page">
		<div class="app">
			<div class="logo__wrapper">
				<img
					class="logo"
					src="~/static/images/logo.svg"
					alt="Logo My Precious"
					width="243"
					height="50"
				/>
			</div>
			<nuxt />
		</div>
	</div>
</template>

<style lang="scss">
.login-page {
	.app {
		display: flex;
		flex-direction: column;
		width: 100%;

		min-height: 100vh;
		padding: 40px;
		background-color: $third-color;

		&__wrapper {
			display: flex; // fix EI min-height flex bug
		}
	}

	.logo {
		margin-bottom: 70px;

		&__wrapper {
			text-align: center;
		}
	}
}
</style>
