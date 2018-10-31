import 'isomorphic-unfetch'
import * as Koa from 'koa'
import * as logger from 'koa-logger'
import * as Router from 'koa-router'
import * as next from 'next'

import serveLiquid from './serve-liquid'

const port = parseInt(process.env.PORT || '3000', 10)
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({dev})
const handle = nextApp.getRequestHandler()

nextApp.prepare().then(() => {
  const app = new Koa()
  const router = new Router()

  router.get('/bundle/:subscribablePath', async ctx => {
    await nextApp.render(ctx.req, ctx.res, '/bundle', {...ctx.query, ...ctx.params})
    ctx.respond = false
  })

  router.get('*', async ctx => {
    await handle(ctx.req, ctx.res)
    ctx.respond = false
  })

  app
  .use(logger())
  .use(serveLiquid())
  .use(router.routes())
  .use(router.allowedMethods())

  app.listen(port)
})
