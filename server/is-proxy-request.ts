
import {IncomingMessage} from 'http'

export default (req: IncomingMessage) => (
  /shop=/.test(req.url) && 
  /path_prefix=/.test(req.url) && 
  /timestamp=/.test(req.url) && 
  /signature=/.test(req.url)
)