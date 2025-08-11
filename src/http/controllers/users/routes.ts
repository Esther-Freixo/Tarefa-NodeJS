import { FastifyInstance } from "fastify";
import { register } from "./register";
import { get } from "./get";

export function userRoutes(app: FastifyInstance) {
    app.post('/users', register)
    app.get('/users', get)

}