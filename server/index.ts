import * as Koa from 'koa'
import * as logger from 'koa-logger'
import * as next from 'next'

import isProxyRequest from './is-proxy-request'

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({dev})
const handle = nextApp.getRequestHandler()

nextApp.prepare().then(() => {
  const app = new Koa()

  app.use(logger())

  app.use(async (ctx) => {
    if (isProxyRequest(ctx.req)) { ctx.type = 'application/liquid' }
    await handle(ctx.req, ctx.res)
    ctx.respond = false
  })

  app.listen(port)
})