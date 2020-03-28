// ================================
// Create repository to acces to The movie database api
// url : https://developers.themoviedb.org/3/
// ================================

import axios from 'axios'
import createRepository from './api/Repository.js'

export default (ctx, inject) => {
	let instance = axios.create({
		baseURL: process.env.TMDB_URL,
	})

	const tmdb = createRepository(instance)

	inject('tmdb', tmdb)
}
