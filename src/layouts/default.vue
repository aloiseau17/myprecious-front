<template>
	<div class="app default-page">
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
.default-page {
	.app {
		position: relative;
		z-index: 0;
	}

	.content {
		$list_padding: 10px;
		$max_item_width: 300px;

		// position: relative;
		// z-index: -2;

		&__title {
			text-align: center;
			margin: 25px auto 35px;
		}

		&__list {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: flex-start;

			padding: 0 $list_padding;
			margin: 0 auto 35px;
			list-style: none;

			@function content_max_width($number) {
				@return calc(#{$number} * #{$max_item_width} + 2 * #{$list_padding});
			}

			@media screen and (min-width: 992px) and (max-width: content_max_width(5)) {
				max-width: content_max_width(4);
			}

			@media screen and (min-width: content_max_width(5)) and (max-width: content_max_width(6)) {
				max-width: content_max_width(5);
			}

			@media screen and (min-width: content_max_width(6)) {
				max-width: content_max_width(6);
			}

			&__item {
				width: 50%;
				max-width: $max_item_width;

				@include mq('tablet') {
					flex: 1 0 25%;
				}
			}
		}
	}
}
</style>
