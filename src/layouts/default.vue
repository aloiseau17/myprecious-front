<template>
	<div class="app">
		<main-menu />
		<nuxt/>
	</div>
</template>

<script>
import MainMenu from '~/components/Navigation/MainMenu'

export default {
	components: { MainMenu }
}
</script>
