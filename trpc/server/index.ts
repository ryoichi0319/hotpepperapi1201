import { router } from "@/trpc/server/trpc"
import { authRouter } from "@/trpc/server/routers/auth"
import { userRouter } from "./routers/user"
import { shopRouter } from "./routers/shop"
import { likeRouter } from "./routers/like"
//ルーターの作成
export const appRouter = router({
    auth: authRouter,
    user: userRouter,
    shop: shopRouter,
    like: likeRouter,
   
})

//ルーターの型定義
export type AppRouter = typeof appRouter

