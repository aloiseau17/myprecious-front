<template>
	<div class="app">
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
.app {
	position: relative;
	z-index: 0;
}
.content {
	position: relative;
	z-index: -2;
}
</style>
