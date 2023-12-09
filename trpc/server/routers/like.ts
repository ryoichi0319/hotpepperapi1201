import { publicProcedure, privateProcedure, router } from '../trpc';
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import prisma from "@/lib/prisma"

export const likeRouter = router({
    getLikes: publicProcedure
      .input(
        z.object({
          userId: z.string().optional(),
        })
      )
      .query(async ({ input }) => {
        try {
          const { userId } = input;
          const likes = await prisma.likes.findMany({
            orderBy: {
              updatedAt: "desc",
            },
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                },
              },
            },
          });
  
          const postsWithLikesStatus = likes.map((like) => {
            const userLike = userId
              ? likes.find((like) => like.userId === userId)
              : null;
  
            return {
              ...like,
              hasPostLiked: !!userLike,
              postLikeId: userLike ? userLike.id : null,
            };
          });
  
          return { likes, like:postsWithLikesStatus };
        } catch (error) {
          console.log(error);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "投稿一覧取得に失敗しました",
          });
        }
      }),
  });



