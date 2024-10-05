import fastifyCors from '@fastify/cors'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'
import { fastify } from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'

import { createAccount } from './routes/auth/create-account'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Next.js SaaS API',
      description: 'Full stack Saas app with multi-tenamt & RBAC',
      version: '1.0.0',
    },
    servers: [],
  },
  transform: jsonSchemaTransform,
})

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifyCors)

app.register(fastifySwaggerUI, {
  routePrefix: '/docs',
})

app.register(createAccount)

app.listen({ port: 3333 }).then(() => {
  console.log('Server listening on port 3333')
})
