import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'

import { rolesSchema } from '../../../../../../packages/auth/src/roles'

export async function getMembership(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/organizations/:slug/membership',
      {
        schema: {
          tags: ['Organizations'],
          summary: 'Get membership of on organization',
          security: [{ bearerAuth: [] }],
          params: z.object({
            slug: z.string(),
          }),
          response: {
            200: z.object({
              membership: z.object({
                role: rolesSchema,
                id: z.string().uuid(),
                organizationId: z.string(),
              }),
            }),
          },
        },
      },

      async (request) => {
        const { slug } = request.params

        const { membership } = await request.getUserMembership(slug)

        return {
          membership: {
            role: membership.role,
            id: membership.id,
            organizationId: membership.organizationId,
          },
        }
      },
    )
}
