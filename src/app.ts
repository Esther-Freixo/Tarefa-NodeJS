import { PrismaClient } from '@prisma/client';
import fastify from 'fastify'
import { userRoutes } from './http/controllers/users/routes';
import { ZodError } from 'zod';
import { postsRoutes } from './http/controllers/posts/routes';

export const app = fastify();
export const prisma = new PrismaClient();


app.register(userRoutes);
app.register(postsRoutes);

app.setErrorHandler((error, resquest, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({ message: 'Validation error', issues: error.format() })
  }

  return reply.status(500).send({ message: "Internal server error" })
})