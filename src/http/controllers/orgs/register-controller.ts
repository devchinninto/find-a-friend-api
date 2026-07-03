import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { registerUseCase } from '@/use-cases/orgs/register.js'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    title: z.string(),
    primary_contact: z.string(),
    email: z.email(),
    password: z.string(),
    description: z.string().nullable(),
    cep: z.string(),
    phone: z.string(),
  })

  const { title, primary_contact, email, password, description, cep, phone } =
    registerBodySchema.parse(request.body)

  try {
    await registerUseCase({
      title,
      primary_contact,
      email,
      password,
      description,
      cep,
      phone,
    })
  } catch (error) {
    return reply.status(409).send()
  }

  return reply.status(201).send()
}
