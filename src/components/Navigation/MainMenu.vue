<template>
	<nav>
		<settings-menu />
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
import SettingsMenu from '~/components/Navigation/SettingsMenu'
export default {
	name: 'MainMenu',
	components: { SettingsMenu }
}
</script>
