<template>
	<div :class="currentRoute" class="app default-page">
		<MainMenu />
		<div class="content">
			<nuxt />
		</div>
	</div>
</template>

<script>
import MainMenu from '~/components/Navigation/MainMenu'

export default {
	components: { MainMenu },
	data() {
		return {
			currentRoute: '',
		}
	},
	watch: {
		$route: {
			handler: function () {
				switch (this.$route.name) {
					case 'movies':
						this.currentRoute = 'seen'
						break
					case 'movies-to-see':
						this.currentRoute = 'see'
						break
					case 'movies-to-buy':
						this.currentRoute = 'buy'
						break
					case 'movies-own':
						this.currentRoute = 'own'
						break
					default:
						this.currentRoute = null
				}
			},
			immediate: true,
		},
	},
}
</script>

<style lang="scss">
.default-page {
	&.app {
		position: relative;
		z-index: 0;
		padding-bottom: $filter-height;

		@include mq('tablet') {
			padding-bottom: 0;
		}
	}

	.content {
		$list_padding: 10px;
		$max_item_width: 300px;

		// position: relative;
		// z-index: -2;

		&__title {
			margin: 50px auto 35px;
			text-align: center;
		}

		&__list {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: flex-start;
			margin: 0 auto 35px;

			padding: 0 $list_padding;
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
