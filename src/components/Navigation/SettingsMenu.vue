<template>
	<nav class="menu-burger">
		<div :class="{ 'is-active': opened }" class="burger" @click="toggleMenu">
			<span class="line" />
			<span class="line" />
			<span class="line" />
		</div>
		<div
			:class="{ 'is-active': opened }"
			class="highlight main-menu__item__label"
			@click="toggleMenu"
		>
			<svg
				class="picto"
				version="1.1"
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				x="0px"
				y="0px"
				width="20"
				height="10"
				viewBox="0 0 46.7 26.5"
				style="enable-background: new 0 0 46.7 26.5;"
				xml:space="preserve"
			>
				<polygon class="picto__background" points="0,0 46.7,0 23.3,26.5 " />
			</svg>
			<span>Menu</span>
		</div>
		<ul :class="menuState" class="menu-burger__pages">
			<li class="menu-burger__item" @click="opened = false">
				<img
					class="logo"
					src="~/static/images/logo.svg"
					alt="My Precious - movie library"
					width="243"
					height="50"
				/>
			</li>
			<li class="menu-burger__item" @click="opened = false">
				<nuxt-link to="/settings">
					Settings
				</nuxt-link>
			</li>
			<li class="menu-burger__item" @click="opened = false">
				<nuxt-link to="/settings/account">
					My account
				</nuxt-link>
			</li>
			<li class="menu-burger__item" @click="opened = false">
				<nuxt-link class="btn" event="" to="/" @click.native="logout">
					Log out
				</nuxt-link>
			</li>
		</ul>
	</nav>
</template>

<script>
export default {
	name: 'SettingsMenu',
	data() {
		return {
			opened: false,
		}
	},
	computed: {
		menuState() {
			return {
				opened: this.opened,
				closed: !this.opened,
			}
		},
	},
	methods: {
		logout() {
			this.$auth.logout()
		},
		toggleMenu() {
			// console.log(window.innerWidth)
			if (window.innerWidth < 992) this.opened = !this.opened
		},
	},
}
</script>

<style scoped lang="scss">
.closed {
	transform: translateY(-110%);

	@include mq('laptop') {
		transform: translateY(calc(-100% + -#{$menu_height_md}));
	}
}

.menu-burger {
	width: 52px;
	@include box-shadow('left', true);

	@include mq('laptop') {
		position: relative;
		width: auto;
		box-shadow: none;
		cursor: pointer;

		@include on-event {
			.menu-burger__pages {
				transform: translateY(0);
			}
			.picto {
				transform: rotate(180deg);
			}
		}

		.is-active {
			.picto {
				transform: rotate(180deg);
			}
		}
	}

	&__pages {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 350;
		display: block;
		width: 100%;
		height: 100vh;
		margin: 0;

		padding: 100px 40px 40px;
		list-style: none;

		background-color: $third-color;
		transition: transform 0.3s ease-in-out;

		@include mq('laptop') {
			top: $menu_height_md;
			right: 0;
			left: auto;

			z-index: -1;
			width: 250px;
			height: auto;

			padding: 15px;
		}
	}

	&__item {
		margin-bottom: 30px;
		text-align: center;

		@include mq('laptop') {
			margin-bottom: 20px;
		}
	}

	.main-menu__item__label {
		display: none;

		@include mq('laptop') {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 100%;
			padding: 20px;
			background: $light-base;

			.picto {
				display: inline-block;
				margin-right: 5px;
				transition: transform 0.3s;

				&__background {
					fill: $third-color;
				}
			}
		}
	}

	a {
		font-weight: 300;
		font-size: 22px;
		text-transform: uppercase;

		@include on-event {
			text-decoration: none;
		}

		@include mq('laptop') {
			font-size: 18px;
		}

		&:not(.btn) {
			padding-top: 7px;
			border-top: 6px solid transparent;
			transition: border 0.3s linear;

			&.nuxt-link-exact-active {
				border-color: $second-color;
			}

			@include mq('laptop') {
				border-width: 3px;

				@include on-event {
					border-color: $second-color;
				}
			}
		}
	}
}

.burger {
	position: absolute;
	top: 0;
	left: 0;
	z-index: 150;
	padding: 12px;

	@include mq('laptop') {
		display: none;
	}

	.line {
		display: block;
		width: 22px;
		height: 3px;

		margin: 5px auto;
		background-color: $second-color;
		transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;

		@include mq('laptop') {
			display: none;
		}
	}

	&:hover {
		cursor: pointer;
	}
	// 50px 5px
	&.is-active {
		z-index: 400;

		.line:nth-child(1) {
			transform: translateY(7px) rotate(45deg) scale(1.6);
		}

		.line:nth-child(2) {
			opacity: 0;
		}

		.line:nth-child(3) {
			transform: translateY(-9px) rotate(-45deg) scale(1.6);
		}
	}
}

.logo {
	margin-bottom: 20%;

	@include mq('laptop') {
		@include when-inside('.menu-burger') {
			display: none;
		}
	}
}

.highlight {
	@include mq('laptop') {
		@include box-shadow('right', true);
	}
}
</style>
