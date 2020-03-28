<template>
	<component :is="'picto-' + type" :class="{ active: active }" />
</template>

<script>
import PictoOwn from '~/components/Movies/Pictos/PictoOwn'
import PictoBuy from '~/components/Movies/Pictos/PictoBuy'
import PictoToSee from '~/components/Movies/Pictos/PictoToSee'
import PictoSeen from '~/components/Movies/Pictos/PictoSeen'
import PictoFantastic from '~/components/Movies/Pictos/PictoFantastic'
import PictoBad from '~/components/Movies/Pictos/PictoBad'

export default {
	name: 'Picto',
	components: {
		PictoOwn,
		'picto-to_own': PictoBuy,
		PictoToSee,
		PictoSeen,
		PictoFantastic,
		PictoBad,
	},
	props: {
		type: {
			type: String,
			required: true,
		},
		active: {
			type: Boolean,
			default: true,
		},
	},
}
</script>

<style scoped lang="scss">
.picto {
	fill: $third-color;

	&__background {
		transition: fill 0.3s linear;
	}
}
</style>
