import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { PrismaUsersRepository } from "../../../repositories/prisma/prisma-users-repository";
import { ResourceNotFoundError } from "../../../errors/resource-not-found-error";
import { DeleteUserUseCase } from "../../../use-cases/users/delete-user-use-case";


export async function deleteUser(request: FastifyRequest, reply: FastifyReply) {
    const getParamsSchema = z.object({
      userId: z.string().uuid(),
    });
  
    const { userId } = getParamsSchema.parse(request.params);
  
    try {
        const prismaUsersRepository = new PrismaUsersRepository()
        const deleteUserUseCase = new DeleteUserUseCase(prismaUsersRepository)
        const user = await deleteUserUseCase.execute({ userId })

        return reply.status(204).send({ user });
    } catch (error) {
        if(error instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: error.message})
        }
        throw new Error
    }

  };