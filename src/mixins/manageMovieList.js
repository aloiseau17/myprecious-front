export default {
	methods: {
		async filterMovies(data, newFirstRandom = false) {
			// Combine default and filter parameters
			const params = Object.assign({}, this.defaultParams, data)

			let movies = await this.$store.dispatch('movies/fetchMovies', {
				params,
				newFirstRandom
			})

			return movies
		},
		scroll() {
			window.onscroll = () => {
				let bottomOfWindow =
					document.documentElement.scrollTop + window.innerHeight ===
					document.documentElement.offsetHeight

				if (!bottomOfWindow) return

				let filterValues = this.$store.getters['filters/getValues']
				let params = Object.assign({}, this.defaultParams, filterValues)

				this.$store.dispatch('movies/fetchNextPage', {
					params
				})
			}
		}
	},
	mounted() {
		this.scroll()
	},
	beforeRouteLeave(to, from, next) {
		// called when the route that renders this component is about to
		// be navigated away from.
		// has access to `this` component instance.
		this.$store.dispatch('navigation/savePage', {
			path: from.path,
			query: this.lastQueryParams
		})
		next()
	}
}
