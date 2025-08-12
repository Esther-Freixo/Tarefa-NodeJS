import { FastifyInstance } from "fastify";
import { create } from "./create";
import { getAll } from "./getAll";
import { deletePost } from "./delete";
import { update } from "./update";
import { get } from "./get";
import { getByUserId } from "./get-by-userId";

export function postsRoutes(app: FastifyInstance) {
    app.post('/posts', create)

    app.get('/posts', getAll)
    app.get('/posts/:postId', get)
    app.get('/posts/user/:userId', getByUserId)
        
    app.delete('/posts/:postId', deletePost)
    
    app.patch('/posts/:postId', update)
}