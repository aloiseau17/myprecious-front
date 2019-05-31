<template>
	<svg
		class="picto own"
		version="1.1"
		xmlns="http://www.w3.org/2000/svg"
		xmlns:xlink="http://www.w3.org/1999/xlink"
		x="0px"
		y="0px"
		width="20px"
		height="20px"
		viewBox="0 0 100 100"
		enable-background="new 0 0 100 100"
		xml:space="preserve">
		<path
			class="picto__background"
			d="M49.998,0C22.385,0,0,22.386,0,50c0,27.613,22.385,50,49.998,50C77.613,100,100,77.613,100,50
			C100,22.386,77.613,0,49.998,0z M49.998,84.665c-19.139,0-34.664-15.521-34.664-34.665s15.525-34.667,34.664-34.667
			c19.146,0,34.664,15.522,34.664,34.667S69.145,84.665,49.998,84.665z"
		/>
	</svg>
</template>

<script>
export default {
	name: 'PictoOwn'
}
</script>

<style scoped lang="scss">
.picto {
	&.active.own &__background {
		fill: $own-color;
	}
}
</style>
