import { FastifyInstance } from "fastify";
import { create } from "./create";
import { getAll } from "./getAll";
import { deletePost } from "./delete";
import { update } from "./update";
import { get } from "./get";

export function postsRoutes(app: FastifyInstance) {
    app.post('/posts', create)

    app.get('/posts', getAll)
    app.get('/posts/:postId', get)
    
    app.delete('/posts/:postId', deletePost)
    
    app.patch('/posts/:postId', update)
}