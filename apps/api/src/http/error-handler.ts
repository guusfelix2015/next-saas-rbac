import type { FastifyInstance } from 'fastify'
import { hasZodFastifySchemaValidationErrors } from 'fastify-type-provider-zod'
import { ZodError } from 'zod'

import { BadRequestError } from './routes/_errors/bad-request-error'
import { UnauthorizedError } from './routes/_errors/unauthorized-error'

interface ZodIssue {
  path: string[]
  message: string
}

type FastfyErrorHandler = FastifyInstance['errorHandler']

export const errorHandler: FastfyErrorHandler = (error, reques, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error',
      errors: error.flatten().fieldErrors,
    })
  }

  if (hasZodFastifySchemaValidationErrors(error)) {
    return reply.status(400).send({
      message: 'Validation error',
      errors: error.validation.reduce(
        (acc, issue) => {
          const issueParams = issue.params?.issue as ZodIssue | undefined

          if (issueParams && Array.isArray(issueParams.path)) {
            const path = issueParams.path.join('.')

            if (!acc[path]) {
              acc[path] = []
            }

            acc[path].push(issueParams.message)
          }

          return acc
        },
        {} as Record<string, string[]>,
      ),
    })
  }

  if (error instanceof BadRequestError) {
    return reply.status(400).send({
      message: error.message,
    })
  }

  if (error instanceof UnauthorizedError) {
    return reply.status(401).send({
      message: error.message,
    })
  }

  console.error(error)

  return reply.status(500).send({
    message: 'Internal server error',
  })
}
