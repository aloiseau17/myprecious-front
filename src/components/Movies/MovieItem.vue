<template>
	<nuxt-link :to="'/movies/' + movie.id" class="movie">
		<div class="movie__image">
			<img
				:src="image"
				class="movie__poster"
				alt="Movie poster"
				width="230"
				height="310"
			/>
			<div v-if="movie.rating">
				<Picto :type="movie.rating" :class="movie.rating" class="rating" />
			</div>
		</div>
		<Rewatch v-if="rewatch" />
		<div class="movie__content">
			<h2 class="movie__title">
				{{ movie.title }}
			</h2>
			<ul class="movie__picto">
				<li v-if="movie.seen" class="movie__picto__item">
					<Picto type="seen" />
				</li>
				<li v-if="!movie.seen" class="movie__picto__item">
					<Picto type="to-see" />
				</li>
				<li v-if="movie.possession_state" class="movie__picto__item">
					<Picto :type="movie.possession_state" />
				</li>
			</ul>
		</div>
	</nuxt-link>
</template>

<script>
import Picto from '~/components/Movies/Picto'
import Rewatch from '~/components/Movies/Pictos/Rewatch'

export default {
	name: 'MovieItem',
	components: { Picto, Rewatch },
	props: {
		movie: {
			type: Object,
			required: true,
		},
		rewatch: {
			type: Boolean,
			default: false,
		},
	},
	computed: {
		image() {
			return this.movie.image
				? process.env.POSTER_STORAGE_URL + this.movie.image
				: '/images/poster_default.png'
		},
	},
}
</script>

<style scoped lang="scss">
.movie {
	@extend %reset-link;
	position: relative;
	display: block;
	margin-bottom: 10px;
	padding: 20% 20px 0;

	@include mq('laptop') {
		padding-left: 30px;
		padding-right: 30px;

		transition: transform 0.3s;

		@include on-event {
			transform: scale(1.05);
		}
	}

	&__title {
		color: $second-color;
		font-size: 16px;
		text-transform: uppercase;
		font-weight: 600;
	}

	&__content {
		padding-left: 8px;
		border-left: 3px solid $second-color;
	}

	&__image {
		position: relative;
		text-align: center;
	}

	&__poster {
		display: block;
		max-width: 100%;
		height: auto;
	}

	&__picto {
		display: flex;
		padding: 0;
		margin: 0;
		list-style: none;

		&__item {
			margin-right: 10px;
		}
	}
}

.rewatch {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: auto;
}

.rating {
	position: absolute;
	bottom: 0;
	right: 0;

	&.fantastic {
		transform: translate(60%, 3px) rotate(25deg);
	}
	&.bad {
		transform: translate(45%, 13px) rotate(-5deg);
	}
}
</style>
