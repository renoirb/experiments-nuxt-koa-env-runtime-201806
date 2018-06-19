const webpack = require('webpack')

module.exports = {
  srcDir: 'client/',
  buildDir: 'dist/client/',
  rootDir: './',
  dev: (process.env.NODE_ENV !== 'production'),
  modules: [
    '@nuxtjs/axios',
    // No need to add @nuxtjs/proxy, axios nuxt module already loads it
  ],
  axios: {
    debug: (process.env.NODE_ENV !== 'production'),
  },
  build: {
    vendor: [
      'axios',
    ],
    plugins: [
      new webpack.EnvironmentPlugin({
        NODE_ENV: 'development',
        DEBUG: '*',
        API_URL: 'http://localhost:3000',
        API_URL_BROWSER: 'http://localhost:3000',
        API_HOST: 'localhost',
        HOST: 'localhost',
        API_PORT: 3000,
        PORT: 3000,
      }),
    ],
  },
}
