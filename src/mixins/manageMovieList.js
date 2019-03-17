export default {
	data() {
		lastQueryParams: null
	},
	methods: {
		async filterMovies(data, partial = false) {
			// Combine default and filter parameters
			const params = Object.assign({}, this.defaultParams, data)
			this.lastQueryParams = params

			let movies = await this.$store.dispatch('movies/fetchMovies', {
				params,
				partial: partial
			})

			return movies
		},
		scroll() {
			window.onscroll = () => {
				let bottomOfWindow =
					document.documentElement.scrollTop + window.innerHeight ===
					document.documentElement.offsetHeight

				if (!bottomOfWindow) return

				let params = this.lastQueryParams
				if (!this.lastQueryParams) {
					params = this.lastQueryParams = this.defaultParams
				}

				this.$store.dispatch('movies/fetchNextPage', {
					params
				})
			}
		}
	},
	mounted() {
		this.scroll()
	}
}
