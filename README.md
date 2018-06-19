# Reworking [clarkdo/hare](https://github.com/clarkdo/hare) to improve support process.env after build

> Nuxt.js with Koa and pass process environment variables

Started off from [nuxt-community/koa-template](https://github.com/nuxt-community/koa-template),
then reviewing [clarkdo/hare](https://github.com/clarkdo/hare) setup in relation to [clarkdo/hare#339](https://github.com/clarkdo/hare/pull/339)

Objective is to be able to run `yarn build`, and be able to run Koa/Nuxt with different `baseURL`, `browserBaseURL`
and that [@nuxtjs/axios](https://github.com/nuxt-community/axios-module) picks up the preference.


## Build Setup

``` bash
# install dependencies
$ yarn

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start
```

*Note: 
For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).

