import type { FastifyReply, FastifyRequest } from "fastify";
import { PrismaUsersRepository } from "../../../repositories/prisma/prisma-users-repository";
import { ResourceNotFoundError } from "../../../errors/resource-not-found-error";
import { GetUserUseCase } from "../../../use-cases/users/get-user-use-case";


export async function get(request: FastifyRequest, reply: FastifyReply) {
    try {
        const prismaUsersRepository = new PrismaUsersRepository()
        const getUserUseCase = new GetUserUseCase(prismaUsersRepository)
        const user = await getUserUseCase.execute()   

        return reply.status(200).send( user );
    } catch (error) {
        if(error instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: error.message})
        }
        throw new Error
    }

  };