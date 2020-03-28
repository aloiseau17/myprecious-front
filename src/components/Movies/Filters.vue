<template>
	<div class="filters__wrapper">
		<button
			:class="{ open: open }"
			class="filters__button"
			@click="open = true"
		>
			<img
				class="filters__button__mobile"
				src="/images/filter.png"
				alt="filter us"
				width="180"
				height="60"
			/>
			<img
				class="filters__button__laptop"
				src="/images/filter-laptop.png"
				alt="filter us"
				width="140"
				height="190"
			/>
		</button>

		<div :class="{ open: open }" class="filters">
			<div class="back-btn__wrapper">
				<div class="back-btn" @click="open = false">
					<img src="/images/back.svg" alt="Back button" />
				</div>
			</div>

			<form class="filters__inner" @submit.prevent="filter">
				<fieldset>
					<legend>By rating</legend>

					<div class="form__group__radio">
						<input
							id="fantastic"
							v-model="filters.rating"
							name="rating"
							value="fantastic"
							type="radio"
						/>
						<label for="fantastic">
							Fantastic
						</label>
					</div>

					<div class="form__group__radio">
						<input
							id="bad"
							v-model="filters.rating"
							name="rating"
							value="bad"
							type="radio"
						/>
						<label for="bad">
							Bad
						</label>
					</div>

					<div class="form__group__radio">
						<input
							id="empty"
							name="rating"
							value="empty"
							type="radio"
							@change="filters.rating = null"
						/>
						<label for="empty">
							All
						</label>
					</div>
				</fieldset>

				<fieldset>
					<legend>
						By type
					</legend>
					<input
						id="types"
						v-model="filters.types"
						name="types"
						type="text"
						placeholder="Fantasy"
					/>
				</fieldset>

				<fieldset>
					<legend>
						By director
					</legend>
					<input
						id="director"
						v-model="filters.director"
						name="director"
						type="text"
						placeholder="Peter Jackson"
					/>
				</fieldset>

				<fieldset>
					<legend>
						Movie begining with...
					</legend>
					<input
						id="firstLetter"
						v-model="filters.first_letter"
						name="firstLetter"
						type="text"
						placeholder="A"
					/>
				</fieldset>

				<div class="form__footer">
					<input class="btn" type="submit" value="Filter" />
					<a class="form__cancel" @click.prevent="open = false">
						cancel
					</a>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Filters',
	data() {
		return {
			filters: {
				rating: null,
				types: null,
				director: null,
				first_letter: null,
			},
			open: false,
			errors: null,
		}
	},
	computed: {
		noRating() {
			return !this.filters.rating ? 'empty' : null
		},
	},
	watch: {
		open(newVal) {
			if (newVal) document.documentElement.style.overflowY = 'hidden'
			else document.documentElement.style.overflowY = 'auto'
		},
	},
	created() {
		// get previous page data
		let savedPage = this.$store.getters['navigation/getSavedPage']

		// Assign store value
		if (this.$route.path === savedPage.path) {
			let filterValues = this.$store.getters['filters/getValues']
			for (let value in filterValues) this.filters[value] = filterValues[value]
		}
	},
	methods: {
		filter() {
			let dataSent = Object.keys(this.filters)
				.filter((key) => {
					// remove null
					return this.filters[key]
				})
				.reduce((obj, key) => {
					// assign this.filter values to dataSent object
					obj[key] = this.filters[key]
					return obj
				}, {})

			this.$store.dispatch('filters/saveValues', dataSent)
			this.$emit('filter-movies', dataSent)
			this.open = false
		},
	},
}
</script>

<style scoped lang="scss">
.filters {
	position: fixed;
	top: 0;
	left: 0;

	width: 100%;
	height: 100vh;
	max-height: 100vh;
	padding: 60px 35px;

	background-color: $third-color;
	overflow: auto;

	transform: translateY(100vh);
	transition: transform 0.5s ease-out;

	@include mq('tablet') {
		padding: 20px 35px;
	}

	@include mq('laptop') {
		padding: 150px calc((100% - 500px) / 2);
	}

	&__wrapper {
		position: relative;
		z-index: 300;
	}

	&.open {
		transform: translateY(0);
	}

	&__button {
		@extend %reset-button;

		position: fixed;
		left: 0;
		bottom: 0;

		height: $filter-height;
		width: 100%;
		background-color: $light-base;
		border-top: 4px solid $third-color;

		@include mq('laptop', 'bottom') {
			transition: transform 0.5s ease-out;
		}

		@include mq('laptop') {
			bottom: 20px;
			right: 40px;
			left: auto;
			width: auto;
			height: auto;
			background: transparent;
			border: none;
			transform: rotate(-15deg);
		}

		&__mobile {
			@include mq('laptop') {
				display: none;
			}
		}

		&__laptop {
			display: none;
			width: 110px;

			@include mq('laptop') {
				display: block;
				cursor: pointer;
			}
		}

		&.open {
			@include mq('laptop', 'bottom') {
				transform: translateY(-100vh);
			}
		}
	}
}
</style>
