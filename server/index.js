import Koa from 'koa'
import {
  Nuxt,
  Builder,
} from 'nuxt'
// import bunyan from 'bunyan'
// import koaBunyan from 'koa-bunyan'
// import koaBunyanLogger from 'koa-bunyan-logger'
import body from 'koa-body' // body parser
import compress from 'koa-compress' // HTTP compression
import session from 'koa-session' // session for flash messages
import compose from 'koa-compose'
import cors from '@koa/cors'
import hpi from './api'

async function start () {
  const app = new Koa()
  const host = process.env.HOST || '127.0.0.1'
  const port = process.env.PORT || 3000

  // Import and Set Nuxt.js options
  let config = require('../nuxt.config.js')
  config.dev = !(app.env === 'production')

  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  app.use(cors())

  app.use(async function contextStateSubapp (ctx, next) {
    // e.g. '/hpi/examples/activity'.split('/')   => ['', 'hpi', 'examples', 'activity']
    const subapp = ctx.url.split('/')[1] // subdomain = part after first '/' of hostname
    // use subdomain to determine which app to serve: www. as default, or admin. or api
    ctx.state.subapp = subapp
    // note: could use root part of path instead of sub-domains e.g. ctx.request.url.split('/')[1]
    await next()
  })

  app.use(async function maybeNuxtRender (ctx, next) {
    // console.log('maybeNuxtRender before next')
    await next()
    // console.log('maybeNuxtRender after next ctx.state.subapp', ctx.state.subapp)
    if (ctx.state.subapp !== 'hpi') {
      // console.log('maybeNuxtRender after next, NOT hpi')
      ctx.status = 200 // koa defaults to 404 when it sees that status is unset
      return new Promise((resolve, reject) => {
        ctx.res.on('close', resolve)
        ctx.res.on('finish', resolve)
        nuxt.render(ctx.req, ctx.res, promise => {
          // nuxt.render passes a rejected promise into callback on error.
          promise.then(resolve).catch(reject)
        })
      })
    }
  })

  // Add valid and beforeSave hooks here to ensure session is valid #TODO
  const SESSION_CONFIG = {
    key: 'hare:sess',
  }

  // session for flash messages (uses signed session cookies, with no server storage)
  app.use(session(SESSION_CONFIG, app))

  // return response time in X-Response-Time header
  app.use(async function responseTime (ctx, next) {
    const t1 = Date.now()
    // console.log('responseTime before next')
    await next()
    const t2 = Date.now()
    ctx.set('X-Response-Time', Math.ceil(t2 - t1) + 'ms')
    // console.log('responseTime after next')
  })

  // HTTP compression
  app.use(compress({}))

  // only search-index www subdomain
  app.use(async function addRobotsTagHeader (ctx, next) {
    // console.log('addRobotsTagHeader before next')
    await next()
    // console.log('addRobotsTagHeader after next')
    if (ctx.hostname.slice(0, 3) !== 'www') {
      ctx.response.set('X-Robots-Tag', 'noindex, nofollow')
    }
  })

  // parse request body into ctx.request.body
  app.use(body())

  app.use(async function composeSubapp (ctx, next) {
    if (ctx.state.subapp === 'hpi') {
      // console.log('composeSubapp')
      await compose(hpi.middleware)(ctx, next)
    } else {
      await next()
    }
  })

  app.listen(port, host)
  console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
}

start()
