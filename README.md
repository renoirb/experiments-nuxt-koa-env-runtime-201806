# Nuxt.js with Koa and pass process environment variables

**STATUS** In progress

To better understand how `process.env` works when we run Nuxt `nuxt start` after `nuxt build`.


## Steps

```terminal
npm i
npm run build
npm i --production
node_modules/.bin/cross-env NODE_ENV=production HOST=example.local PORT=9091 node_modules/.bin/nuxt start
```


## Link trail

* https://nuxtjs.org/api/configuration-env/#the-env-property
* https://github.com/kentcdodds/cross-env
* https://nuxtjs.org/faq/host-port/
* https://webpack.js.org/plugins/environment-plugin/
* https://axios.nuxtjs.org/options.html
* https://github.com/nuxt-community/koa-template/blob/master/template/server/index.js#L28
* https://github.com/clarkdo/hare/blob/dev/server/app.js#L85
* https://github.com/nuxt/nuxt.js/blob/1.x/examples/with-feathers/src/index.js#L6
* https://github.com/nuxt/nuxt.js/blob/1.x/examples/with-feathers/src/app.js#L17
* https://github.com/nuxt/nuxt.js/blob/1.x/examples/with-feathers/src/middleware/nuxt.js#L17
