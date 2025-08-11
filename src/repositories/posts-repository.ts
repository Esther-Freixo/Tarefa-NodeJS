import { Prisma, Post } from "@prisma/client";

export interface PostsRepository {
    create(data: Prisma.PostUncheckedCreateInput): Promise<Post>
    findAllPosts(): Promise<Post[] | null>
    delete(postId: string): Promise<Post | null>
    
}