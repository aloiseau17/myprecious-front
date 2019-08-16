# Myprecious

![Logo MyPrecious](https://myprecious.audreyloiseau.fr/images/logo.svg)

> My Precious is a personnal movies library project - this repo is the front application used with [MyPrecious API](https://github.com/aloiseau17/myprecious-back) developped with NuxtJS

## Features
- connection process (login, reset password, manage token with Auth Module)
- MyPrecious API calls (store/edit/find movies)
- [The Movie Database API](https://developers.themoviedb.org/3) calls to get movies informations
- add custom movie poster

## Getting Started

Install dependencies:

`$ yarn install`

Create `.env.dev` file base on `.env-sample`.

```bash
# serve with hot reload at localhost:3000
$ yarn run dev

# generate static project
$ yarn run generate
```

## Requirements
For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).

## Todo list

- allow movie deletion
- add vuelidate support
- setup tests

## Special thanks
Special thanks to [Christel Droit](https://christeldroit.fr/web-design/my-precious/) for her advices and her contribution to MyPrecious. We worked together on the UX and she designs the logo and application interface.