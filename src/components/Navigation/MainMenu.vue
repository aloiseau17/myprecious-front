<template>
	<nav>
		<ul>
			<li>
				<nuxt-link to="/movies/to-buy">To Buy</nuxt-link>
			</li>
			<li>
				<nuxt-link to="/movies/own">Own</nuxt-link>
			</li>
			<li>
				<nuxt-link to="/movies/to-see">To see</nuxt-link>
			</li>
			<li>
				<nuxt-link to="/movies">Seen</nuxt-link>
			</li>
		</ul>
	</nav>
</template>

<script>
export default {
	name: 'MainMenu'
}
</script>
