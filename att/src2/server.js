import Hapi from 'hapi'
import routes from './routes'
var corsHeaders = require('hapi-cors-headers')

const server = new Hapi.Server()

server.connection({
  port: 8775
})

server.register(require('hapi-auth-jwt'), (err) => {
  if (!err) {
    console.log('done')
  }

  server.auth.strategy('token', 'jwt', {
    key: 'Ifyourserverisbehindareverseproxyyoumustwhitelisttheproxy'
  // verifyOptions: {
  //   algorithms: [ 'HS256' ]
  // }
  })

  routes.forEach((route) => {
    console.log(`attaching ${route.path}`)
    server.route(route)
  })
})

server.ext('onPreResponse', corsHeaders)

server.start(err => {
  if (err) {
    // Fancy error handling here
    console.error('Error was handled!')
    console.error(err)
  }

  console.log(`Server started at ${server.info.uri}`)
})
