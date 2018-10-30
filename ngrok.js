const ngrok = require('ngrok')

ngrok.connect({
  addr: process.env.PORT,
  subdomain: 'cron-proxy',
}).then(url => {
  console.log(`Available at ${url}`)
})