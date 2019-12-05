<template>
	<section class="home container">
		<h1 class="default">
			<img
				class="logo"
				src="~/static/images/logo.svg"
				alt="My Precious - movie library"
				width="243"
				height="50"
			/>
		</h1>
		<p>Personnal movies library</p>
		<p>Manage your movies as fantastic or bad.</p>
		<p>You can save movie you want to buy and them who you already own.</p>
		<div class="home__btn">
			<nuxt-link class="btn" to="/movies/add">
				Add movie
			</nuxt-link>
		</div>
	</section>
</template>

<style>
.home {
	padding: 25vh 0;
	text-align: center;
}
</style>
