import fastify from 'fastify'
import { env } from '@/env/index.js'

const app = fastify()

app
  .listen({
    host: '0.0.0.0',
    port: env.PORT,
  })
  .then(() => {
    console.log('🚀 Server running!')
  })
