<template>
	<nav class="main-menu">
		<SettingsMenu />
		<ul class="main-menu__pages">
			<li class="main-menu__item">
				<!-- ============= To Buy ============= -->
				<nuxt-link to="/movies/to-buy">
					<svg
						class="picto buy"
						version="1.1"
						xmlns="http://www.w3.org/2000/svg"
						xmlns:xlink="http://www.w3.org/1999/xlink"
						x="0px"
						y="0px"
						width="20px"
						height="20px"
						viewBox="0 0 52.5 100"
						enable-background="new 0 0 52.5 100"
						xml:space="preserve"
					>
						<path
							class="picto__background"
							d="M32.984,86.823c-0.42,0.104-0.732,0.313-0.732,0.835l0.104,10.359c0,1.356-0.627,1.982-1.879,1.982H21.92
							c-1.254,0-1.881-0.626-1.881-1.982l0.105-10.15c0-0.521-0.314-0.835-0.834-0.939C7.516,85.049,0.627,77.951,0.627,67.827v-4.802
							c0-1.252,0.729-1.982,1.982-1.982h15.344c1.252,0,1.982,0.417,1.982,1.043v1.148c0,3.549,1.984,7.41,6.992,7.41
							c4.594,0,5.951-3.34,5.951-5.322c0-6.889-16.701-6.68-25.053-12.943C3.652,49.248,0,43.299,0,35.158
							c0-11.273,6.992-19.623,19.518-21.815c0.418-0.104,0.73-0.313,0.73-0.835L20.145,1.982C20.145,0.626,20.771,0,22.023,0h8.348
							c1.256,0,1.881,0.626,1.881,1.982l-0.105,10.213c0,0.521,0.314,0.834,0.838,0.939c12.209,1.982,19.203,9.602,19.203,20.354v3.965
							c0,1.253-0.73,1.984-1.982,1.984H34.861c-1.252,0-1.982-0.313-1.982-0.836v-0.834c0-3.862-1.775-8.246-7.098-8.246
							c-3.758,0-6.471,2.191-6.471,5.01c0,5.637,10.959,6.055,19.725,9.812C48.639,48.518,52.5,55.615,52.5,64.383
							C52.5,76.281,45.611,84.632,32.984,86.823z"
						/>
					</svg>
					<span class="main-menu__item__label">To buy</span>
				</nuxt-link>
			</li>
			<!-- ============= Own ============= -->
			<li class="main-menu__item">
				<nuxt-link to="/movies/own">
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
						xml:space="preserve"
					>
						<path
							class="picto__background"
							d="M49.998,0C22.385,0,0,22.386,0,50c0,27.613,22.385,50,49.998,50C77.613,100,100,77.613,100,50
							C100,22.386,77.613,0,49.998,0z M49.998,84.665c-19.139,0-34.664-15.521-34.664-34.665s15.525-34.667,34.664-34.667
							c19.146,0,34.664,15.522,34.664,34.667S69.145,84.665,49.998,84.665z"
						/>
					</svg>
					<span class="main-menu__item__label">Own</span>
				</nuxt-link>
			</li>
			<!-- ============= To See ============= -->
			<li class="main-menu__item">
				<nuxt-link to="/movies/to-see">
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
					<span class="main-menu__item__label">To see</span>
				</nuxt-link>
			</li>
			<!-- ============= Seen ============= -->
			<li class="main-menu__item">
				<nuxt-link to="/movies">
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
						xml:space="preserve"
					>
						<path
							class="picto__background"
							d="M34.521,100c-0.049,0-0.098,0-0.146-0.002c-2.133-0.041-4.148-0.98-5.553-2.588L1.867,66.535
							c-2.748-3.146-2.424-7.926,0.723-10.673c3.146-2.748,7.926-2.424,10.672,0.724l21.477,24.598l74.358-78.811
							c2.867-3.039,7.655-3.178,10.692-0.311c3.039,2.867,3.178,7.654,0.311,10.693L40.023,97.627C38.592,99.143,36.602,100,34.521,100z"
						/>
					</svg>
					<span class="main-menu__item__label">Seen</span>
				</nuxt-link>
			</li>
			<!-- ============= Add ============= -->
			<li class="main-menu__item highlight add-button">
				<nuxt-link to="/movies/add">
					<svg
						class="picto add"
						version="1.1"
						xmlns="http://www.w3.org/2000/svg"
						xmlns:xlink="http://www.w3.org/1999/xlink"
						x="0px"
						y="0px"
						width="20px"
						height="20px"
						viewBox="0 0 115 115"
						enable-background="new 0 0 115 115"
						xml:space="preserve"
					>
						<circle fill="#CD8010" cx="57.5" cy="57.5" r="57.479" />
						<path
							fill="#FFFFFF"
							d="M90.892,51.935H63.065V24.108c0-3.649-2.959-6.608-6.608-6.608c-3.65,0-6.609,2.959-6.609,6.608v27.826
							H24.109c-3.65,0-6.609,2.959-6.609,6.608c0,3.65,2.958,6.609,6.609,6.609h25.739v25.739c0,3.649,2.959,6.608,6.609,6.608
							c3.649,0,6.608-2.959,6.608-6.608V65.152h27.826c3.649,0,6.608-2.959,6.608-6.609C97.5,54.894,94.541,51.935,90.892,51.935z"
						/>
					</svg>
					<span class="main-menu__item__label">Add movie</span>
				</nuxt-link>
			</li>
		</ul>
		<nuxt-link class="logo__wrapper" to="/movies">
			<img
				class="logo"
				src="~/static/images/logo.svg"
				alt="My Precious - movie library"
				width="226"
				height="40"
			/>
		</nuxt-link>
	</nav>
</template>

<script>
import SettingsMenu from '~/components/Navigation/SettingsMenu'

export default {
	name: 'MainMenu',
	components: { SettingsMenu }
}
</script>

<style scoped lang="scss">
.main-menu {
	display: flex;
	width: 100%;
	height: $menu_height;

	transition: border-color 0.3s;

	border-top: 6px solid $main-color;

	&.buy {
		border-color: $buy-color;
	}

	&.own {
		border-color: $own-color;
	}

	&.see {
		border-color: $see-color;
	}

	&.seen {
		border-color: $seen-color;
	}

	@include box-shadow('bottom', false);

	@include mq('laptop') {
		position: relative;
		flex-direction: row-reverse;
		border-top: none;
		height: $menu_height_md;
		background-color: $light-base;
		z-index: 100;
	}

	&__pages {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;

		flex: 1;

		padding: 0;
		margin: 0;
		list-style: none;

		@include mq('laptop') {
			justify-content: flex-end;
			background: $light-base;
		}
	}

	&__item {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;

		width: 20%;
		height: 100%;
		padding: 0;

		a {
			@extend %reset-link;
		}

		&:not(.highlight) {
			@include box-shadow('left', true);

			@include mq('laptop') {
				padding: 0 15px;
				box-shadow: none;
			}
		}

		@include mq('laptop') {
			width: auto;

			@include on-event {
				$picto_selector: '.picto__background';
				.buy {
					#{$picto_selector} {
						fill: $buy-color;
					}
				}
				.own {
					#{$picto_selector} {
						fill: $own-color;
					}
				}
				.see {
					#{$picto_selector} {
						fill: $see-color;
					}
				}
				.seen {
					#{$picto_selector} {
						fill: $seen-color;
					}
				}
			}
		}

		&__label {
			display: none;
			vertical-align: middle;

			font-size: 16px;
			font-weight: 300;
			text-transform: uppercase;

			@include mq('laptop') {
				display: inline-block;
			}
		}
	}
}

.highlight {
	@include mq('laptop') {
		padding: 0 30px;
		transition: background-color 0.3s;
		@include box-shadow('right', true);
	}
}

.add-button {
	@include mq('laptop') {
		@include on-event {
			background-color: $third-color;

			a,
			span {
				cursor: pointer;
				color: $light-base;
			}
		}
	}
}

.logo {
	min-height: 40px;
	height: 100%;

	&__wrapper {
		display: none;

		@include mq('laptop') {
			display: block;
			padding: 10px 20px;
		}
	}
}

.picto {
	vertical-align: middle;

	&__background {
		transition: fill 0.3s linear;
		fill: $third-color;

		@include when-inside('.nuxt-link-exact-active .buy') {
			fill: $buy-color;
		}

		@include when-inside('.nuxt-link-exact-active .own') {
			fill: $own-color;
		}

		@include when-inside('.nuxt-link-exact-active .see') {
			fill: $see-color;
		}

		@include when-inside('.nuxt-link-exact-active .seen') {
			fill: $seen-color;
		}
	}
}
</style>
