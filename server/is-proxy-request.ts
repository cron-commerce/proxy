
import {IncomingMessage} from 'http'

export default (req: IncomingMessage) => {
  const url = req.url

  return url && /shop=/.test(url) &&
    /path_prefix=/.test(url) &&
    /timestamp=/.test(url) &&
    /signature=/.test(url)
}
