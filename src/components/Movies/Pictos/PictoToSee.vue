<template>
	<svg
		class="picto see"
		version="1.1"
		xmlns="http://www.w3.org/2000/svg"
		xmlns:xlink="http://www.w3.org/1999/xlink"
		x="0px"
		y="0px"
		width="20px"
		height="20px"
		viewBox="0 0 67.513 100"
		enable-background="new 0 0 67.513 100"
		xml:space="preserve"
	>
		<path
			class="picto__background"
			d="M65.623,46.529L8.99,1.121C7.459-0.106,5.011-0.346,3.244,0.502C1.474,1.352,0,3.14,0,5.102v89.797
			c0,1.951,1.462,3.732,3.218,4.587C3.927,99.83,4.863,100,5.623,100c1.121,0,2.321-0.369,3.235-1.086l56.677-44.389
			c1.228-0.961,1.968-2.43,1.978-3.986C67.522,48.98,66.839,47.504,65.623,46.529z"
		/>
	</svg>
</template>

<script>
export default {
	name: 'PictoToSee',
}
</script>

<style scoped lang="scss">
.picto {
	&.active.see &__background {
		fill: $see-color;
	}
}
</style>
