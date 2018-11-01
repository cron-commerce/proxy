import 'isomorphic-unfetch'
import * as Koa from 'koa'
import * as favicon from 'koa-favicon'
import * as logger from 'koa-logger'
import * as Router from 'koa-router'
import * as next from 'next'
import {resolve} from 'path'

import serveLiquid from './serve-liquid'

const port = parseInt(process.env.PORT || '3000', 10)
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({dev})
const handle = nextApp.getRequestHandler()

const serve = () => async (ctx: Koa.Context) => {
  await handle(ctx.req, ctx.res)
  ctx.respond = false
}

nextApp.prepare().then(() => {
  const app = new Koa()
  const router = new Router()

  router.get('/bundle/:handle', async ctx => {
    ctx.status = 200
    await nextApp.render(ctx.req, ctx.res, '/bundle', {...ctx.query, ...ctx.params})
    ctx.respond = false
  })

  app
  .use(favicon(resolve(__dirname, '../', 'static/favicon.ico')))
  .use(logger())
  .use(serveLiquid())
  .use(router.routes())
  .use(router.allowedMethods())
  .use(serve())

  app.listen(port)
})
