const webpack = require('webpack')
const appName = 'CGI Unify360'
const appDescription = 'Hybrid IT Management Platform'

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: `${appName}`,
    titleTemplate: `%s — ${appName}`,
    meta: [
      {
        charset: 'utf-8',
      },
      {
        name: 'viewport', content: 'width=device-width, initial-scale=1',
      },
      {
        hid: 'description', name: 'description', content: appDescription,
      },
    ],
    link: [
      {
        rel: 'icon', type: 'image/x-icon', href: '/favicon.ico',
      },
    ],
  },
  /*
  ** Global CSS
  */
  css: [
    '~assets/css/main.css',
    'element-ui/lib/theme-chalk/index.css',
  ],
  /*
  ** Customize the progress-bar color
  */
  loading: {
    color: '#3B8070',
  },
  srcDir: 'client/',
  buildDir: 'build/client/',
  rootDir: './',
  dev: (process.env.NODE_ENV !== 'production'),
  plugins: [
    '~plugins/element',
    {
      src: '~/plugins/client-only',
      ssr: false,
    },
  ],
  modules: [
    ['@nuxtjs/axios',
      {
        // browserBaseURL: process.env.API_URL_BROWSER, // This does not work.
        requestInterceptor: (config, {
          store,
        }) => {
          console.log('@nuxtjs/axios requestInterceptor') // Not really useful either.

          return config
        },
      }],
    // No need to add @nuxtjs/proxy, axios nuxt module already loads it
  ],
  axios: {
    debug: (process.env.NODE_ENV !== 'production'),
    // browserBaseURL: 'http://foo.dev.local:9098/', // This does not work.
  },
  /*
   ** Build configuration
   */
  build: {
    vendor: [
      'element-ui',
    ],
    plugins: [
      new webpack.EnvironmentPlugin({ // Not really useful.
        NODE_ENV: 'development',
        API_URL: 'http://localhost:3000',
        API_URL_BROWSER: 'http://localhost:3000',
        API_HOST: 'localhost',
        HOST: 'localhost',
        API_PORT: 3000,
        PORT: 3000,
      }),
    ],
    extend (config, somethingElse) {
      /**
       * Export those as mixin instead
       * see: https://github.com/nuxt/nuxt.js/issues/1323#issuecomment-325797595
       */
      // config.resolve.alias['wip'] = '~/utils/wip' // Changed my mind, will use ssr:false only.
    },
  },
}
