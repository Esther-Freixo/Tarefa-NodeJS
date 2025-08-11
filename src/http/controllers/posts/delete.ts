import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { ResourceNotFoundError } from "../../../errors/resource-not-found-error";
import { PrismaPostsRepository } from "../../../repositories/prisma/prisma-posts-repository";
import { DeletePostUseCase } from "../../../use-cases/posts/delete-posts-use-case";


export async function deletePost(request: FastifyRequest, reply: FastifyReply) {
    const getParamsSchema = z.object({
      postId: z.string().uuid(),
    });
  
    const { postId } = getParamsSchema.parse(request.params);
  
    try {
        const prismaPostsRepository = new PrismaPostsRepository()
        const deletePostUseCase = new DeletePostUseCase(prismaPostsRepository)
        const post = await deletePostUseCase.execute({ postId })

        return reply.status(204).send({ post });
    } catch (error) {
        if(error instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: error.message})
        }
        throw new Error
    }

  };