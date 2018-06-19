import Koa from 'koa'
import Router from 'koa-router'
import xmlify from 'xmlify' // JS object to XML
import yaml from 'js-yaml' // JS object to YAML
import examples from './routes/examples'

const app = new Koa() // API app

const hpi = new Router({
  prefix: '/hpi',
})

hpi.use('', examples.routes(), examples.allowedMethods())

// content negotiation: api will respond with json, xml, or yaml
app.use(async function contentNegotiation (ctx, next) {
  await next()

  if (!ctx.body) return // no content to return

  // check Accept header for preferred response type
  const type = ctx.accepts('json', 'yaml', 'text') // Let's drop XML for now.

  switch (type) {
    case 'json':
    default:
      delete ctx.body.root // xml root element
      break // ... koa takes care of type
    case 'xml':
      try {
        const root = ctx.body.root // xml root element
        delete ctx.body.root
        ctx.body = xmlify(ctx.body, root)
        ctx.type = type // Only change type if xmlify did not throw
      } catch (e) {
        console.log(`Could not convert to XML, falling back to default`)
      }
      break
    case 'yaml':
    case 'text':
      delete ctx.body.root // xml root element
      ctx.type = 'yaml'
      ctx.body = yaml.dump(ctx.body)
      break
    case false:
      ctx.throw(406) // "Not acceptable" - can't furnish whatever was requested
      break
  }
})

// handle thrown or uncaught exceptions anywhere down the line
app.use(async function handleErrors (ctx, next) {
  try {
    await next()
  } catch (e) {
    ctx.status = e.status || 500
    switch (ctx.status) {
      case 204: // No Content
        break
      case 401: // Unauthorized
      case 403: // Forbidden
      case 404: // Not Found
      case 406: // Not Acceptable
      case 409: // Conflict
        ctx.body = {
          root: 'error',
          // ...e
        }
        break
      default:
      case 500: // Internal Server Error (for uncaught or programming errors)
        console.error(ctx.status, e.message)
        ctx.body = {
          root: 'error',
          // ...e
        }
        if (app.env !== 'production') ctx.body.stack = e.stack
        ctx.app.emit('error', e, ctx) // github.com/koajs/koa/wiki/Error-Handling
        break
    }
  }
})

// ------------ routing

app.use(hpi.routes())

export default app
