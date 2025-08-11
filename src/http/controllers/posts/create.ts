import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { PrismaPostsRepository } from "../../../repositories/prisma/prisma-posts-repository";
import { CreatePostUseCase } from "../../../use-cases/posts/register-posts-use-case";


export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    title: z.string(),
    created_at: z.string().transform((str) => new Date(str)),
    content: z.string(),
    userId: z.string(),
  });

  const {
    title,
    content,
    created_at,
    userId,
  } = createBodySchema.parse(request.body);

  try {
    const prismaPostsRepository = new PrismaPostsRepository()
    const createPostsUseCase = new CreatePostUseCase(prismaPostsRepository)
    await createPostsUseCase.execute({
        title,
        content,
        created_at,
        userId,
    })
  } catch (error) {
    throw error
  }

  return reply.status(201).send('Post criado com sucesso!');
};