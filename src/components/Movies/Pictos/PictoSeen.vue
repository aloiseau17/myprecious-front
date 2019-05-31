<template>
	<svg
		class="picto seen"
		version="1.1"
		xmlns="http://www.w3.org/2000/svg"
		xmlns:xlink="http://www.w3.org/1999/xlink"
		x="0px"
		y="0px"
		width="20px"
		height="20px"
		viewBox="0 0 122.163 100"
		enable-background="new 0 0 122.163 100"
		xml:space="preserve">
		<path
			class="picto__background"
			d="M34.521,100c-0.049,0-0.098,0-0.146-0.002c-2.133-0.041-4.148-0.98-5.553-2.588L1.867,66.535
			c-2.748-3.146-2.424-7.926,0.723-10.673c3.146-2.748,7.926-2.424,10.672,0.724l21.477,24.598l74.358-78.811
			c2.867-3.039,7.655-3.178,10.692-0.311c3.039,2.867,3.178,7.654,0.311,10.693L40.023,97.627C38.592,99.143,36.602,100,34.521,100z"
		/>
	</svg>
</template>

<script>
export default {
	name: 'PictoSeen'
}
</script>

<style scoped lang="scss">
.picto {
	&.active.seen &__background {
		fill: $seen-color;
	}
}
</style>
