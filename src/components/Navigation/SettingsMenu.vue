<template>
	<nav>
		<ul>
			<li>
				<nuxt-link to="/settings">Settings</nuxt-link>
			</li>
			<li>
				<nuxt-link to="/settings/account">My account</nuxt-link>
			</li>
			<li>
				<nuxt-link
					event=""
					to="/"
					@click.native="logout">
					Log out
				</nuxt-link>
			</li>
		</ul>
	</nav>
</template>

<script>
export default {
	name: 'SettingsMenu',
	methods: {
		logout() {
			this.$auth.logout()
		}
	}
}
</script>
