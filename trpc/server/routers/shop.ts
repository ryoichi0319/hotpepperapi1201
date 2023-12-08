import { publicProcedure, privateProcedure, router } from "../trpc";
import { z } from "zod"
import { TRPCError } from "@trpc/server";
import prisma from "@/lib/prisma"

export const shopRouter = router({


    createPostLike: privateProcedure
    .input(
        z.object({
            postId: z.string(),
        })
    )
    .mutation(async ({ input, ctx}) => {
        try{
            const { postId } = input
            const userId = ctx.user.id

            await prisma.likes.create({
                data: {
                    userId,
                    postId,
                    
                }
                
            })

        }catch(error){
            console.log(error)
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: "エラーが発生しました"
            })
        }
    }),

    deletePostLike: privateProcedure
    .input(
        z.object({
            postLikeId: z.string(),
        })
    )
    .mutation(async ({input}) => {
        try{
            const { postLikeId } = input
            await prisma.likes.delete({
                where: {
                    id: postLikeId,
                },
            })
        }catch(error){
            console.log(error)
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: "エラーが発生しました"
            })
        }
    })







})
