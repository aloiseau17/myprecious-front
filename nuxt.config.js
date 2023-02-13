// Environement config
const dotEnvFilename = '.env.dev'

const pkg = require('./package')
const path = require('path')
require('dotenv').config({
  path: path.resolve(__dirname, dotEnvFilename),
}) // make .env available in nuxt-config.js

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
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        hid: 'description',
        name: 'description',
        content: pkg.description,
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: ['normalize.css', '@/assets/scss/main.scss'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~plugins/filters.js',
    '~/plugins/appHelpers/helpers',
    '~/plugins/theMovieDatabase/index',
    '~/plugins/Axios',
    { src: '~/plugins/Vuelidate', ssr: false },
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/style-resources',
  ],

  buildModules: [
    ['@nuxtjs/stylelint-module', { fix: true }],
    [
      '@nuxtjs/dotenv',
      {
        path: path.resolve(__dirname),
        filename: dotEnvFilename,
      },
    ],
  ],

  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL: process.env.API_URL,
    debug: true,
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
      home: '/movies',
    },
    defaultStrategy: 'myprecious',
    strategies: {
      local: false,
      resetOnError: true,
      myprecious: {
        _scheme: '~/plugins/mypreciousAuth/mypreciousScheme.js',
      },
    },
  },

  /*
   ** Global SASS variables, mixins, functions, ...
   */
  styleResources: {
    scss: [
      '@/assets/scss/abstracts/_variables.scss',
      '@/assets/scss/abstracts/_placeholders.scss',
      '@/assets/scss/abstracts/_mixins.scss',
    ],
  },

  /*
   ** Router configuration
   */
  router: {
    middleware: ['auth'],
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
          exclude: [path.resolve(__dirname, 'www'), /(node_modules)/],
        })
      }
    },
  },

  env: {
    APP_URL: process.env.APP_URL,
    APP_LANG: process.env.APP_LANG,
    API_URL: process.env.API_URL,
    POSTER_STORAGE_URL: process.env.POSTER_STORAGE_URL,
    TMDB_URL: process.env.TMDB_URL,
    TMDB_KEY: process.env.TMDB_KEY,
    TMDB_IMAGE_PATH: process.env.TMDB_IMAGE_PATH,
  },

  server: {
    host: '0.0.0.0',
  },
}
