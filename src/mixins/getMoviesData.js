export default {
	methods: {
		async autocompleteTitle(queryString, cb) {
			if (!queryString) cb([])

			if (!this.title) return

			await this.$tmdb.find(queryString).then((data) => {
				cb(data.results.splice(0, 5))
			})
		},
		async getMovie(item) {
			await this.$tmdb.show(item.id, 'credits').then((data) => {
				let director = data.credits.crew.find((item) => item.job === 'Director')

				this.title = data.title

				this.director = director ? director.name : ''

				this.actor = data.credits.cast[0] ? data.credits.cast[0].name : ''

				this.duration = data.runtime ? data.runtime : ''

				this.poster_link = process.env.TMDB_IMAGE_PATH + data.poster_path

				let typeList = data.genres.reduce((list, genre) => {
					return [...list, genre.name]
				}, [])
				if (typeList.length !== 0) this.types = typeList.join(';')
			})
		},
	},
}
