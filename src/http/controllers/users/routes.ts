import { FastifyInstance } from "fastify";
import { register } from "./register";
import { getAll } from "./getAll";
import { deleteUser } from "./delete";
import { update } from "./update";
import { get } from "./get";

export function userRoutes(app: FastifyInstance) {
    app.post('/users', register)

    app.get('/users', getAll)
    app.get('/users/:userId', get)

    app.delete('/users/:userId', deleteUser)

    app.patch('/users/:userId', update)

}