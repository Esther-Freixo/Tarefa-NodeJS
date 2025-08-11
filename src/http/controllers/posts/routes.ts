import { FastifyInstance } from "fastify";
import { create } from "./create";
import { get } from "./get";
import { deletePost } from "./delete";

export function postsRoutes(app: FastifyInstance) {
    app.post('/posts', create)

    app.get('/posts', get)
    
    app.delete('/posts/:postId', deletePost)
    
}