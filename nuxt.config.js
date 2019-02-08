// Environement config
const dotEnvFilename = '.env.dev'

const pkg = require('./package')
const path = require('path')
require('dotenv').config({ path: dotEnvFilename }) // make .env available in nuxt-config.js

module.exports = {
	mode: 'spa',
	srcDir: 'src',
	buildDir: 'www',

	/*
	** Headers of the page
	*/
	head: {
		title: pkg.name,
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: pkg.description }
		],
		link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
	},

	/*
	** Customize the progress-bar color
	*/
	loading: { color: '#fff' },

	/*
	** Global CSS
	*/
	css: [],

	/*
	** Plugins to load before mounting the App
	*/
	plugins: [],

	/*
	** Nuxt.js modules
	*/
	modules: [
		// Doc: https://github.com/nuxt-community/axios-module#usage
		'@nuxtjs/axios',
		'@nuxtjs/auth',
		[
			'@nuxtjs/dotenv',
			{
				filename: dotEnvFilename
			}
		]
	],
	/*
	** Axios module configuration
	*/
	axios: {
		// See https://github.com/nuxt-community/axios-module#options
		baseURL: process.env.API_URL, // TODO env
		debug: true
	},

	/*
	** Authentification module configuration
	*/
	auth: {
		cookie: false,
		redirect: {
			login: '/login',
			logout: '/',
			callback: '/login',
			home: '/'
		},
		defaultStrategy: 'myprecious',
		strategies: {
			local: false,
			resetOnError: true,
			myprecious: {
				_scheme: '~/plugins/mypreciousAuth/mypreciousScheme.js'
			}
		}
	},

	/*
	** Router configuration
	*/
	router: {
		middleware: ['auth']
	},

	/*
	** Build configuration
	*/
	build: {
		/*
		** You can extend webpack config here
		*/
		extend(config, ctx) {
			// Run ESLint on save
			if (ctx.isDev && ctx.isClient) {
				config.module.rules.push({
					enforce: 'pre',
					test: /\.(js|vue)$/,
					loader: 'eslint-loader',
					exclude: [path.resolve(__dirname, 'www'), /(node_modules)/]
				})
			}
		}
	},
	env: {
		API_URL: process.env.API_URL
	}
}
