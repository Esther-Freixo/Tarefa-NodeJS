import { FastifyInstance } from "fastify";
import { register } from "./register";
import { get } from "./get";
import { deleteUser } from "./delete";

export function userRoutes(app: FastifyInstance) {
    app.post('/users', register)

    app.get('/users', get)

    app.delete('/users/:userId', deleteUser)

}