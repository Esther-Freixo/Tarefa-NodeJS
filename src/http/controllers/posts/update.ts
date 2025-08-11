import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { PrismaPostsRepository } from "../../../repositories/prisma/prisma-posts-repository";
import { ResourceNotFoundError } from "../../../errors/resource-not-found-error";
import { UpdatePostUseCase } from "../../../use-cases/posts/update-user-use-case";


export async function update(request: FastifyRequest, reply: FastifyReply) {
    const updateParamsSchema = z.object({
        postId: z.string().uuid(),
    });

    const updateBodySchema = z.object({
        title: z.string().optional(),
        content: z.string().optional(),
    })
    const { postId } = updateParamsSchema.parse(request.params);
    const { title, content } = updateBodySchema.parse(request.body);


    try {
        const prismapostsRepository = new PrismaPostsRepository()
        const updatePostUseCase = new UpdatePostUseCase(prismapostsRepository)
        const post = await updatePostUseCase.execute({
            postId, data: { title, content }
        })

        return reply.status(200).send({ post });
    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: error.message })
        }
        throw new Error
    }

};