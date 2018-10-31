import {Context} from 'koa'

import isProxyRequest from './is-proxy-request'

export default () => (ctx: Context, next: () => any) => {
  if (isProxyRequest(ctx.req)) {
    ctx.type = 'application/liquid'
  }
  return next()
}
