import { prisma } from '../../app';
import { Prisma } from "@prisma/client";
import { PostsRepository } from "../posts-repository";

export class PrismaPostsRepository implements PostsRepository {


    async create(data: Prisma.PostUncheckedCreateInput) {
        const posts = await prisma.post.create({ data });
        return posts;
    }
}