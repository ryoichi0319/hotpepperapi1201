"use client"
import { HeartIcon, HeartFilledIcon } from "@radix-ui/react-icons"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { trpc } from "@/trpc/react"
import { motion } from "framer-motion";

import { cn } from "@/lib/utils"

  
  
  interface ShopLikeDetailProps {
   userId: string | undefined
   id: string | undefined
   hasPostLiked: boolean
   postLikeId: string | undefined
   like: any
        
  }

 const ShopLikeDetail =  ({like,id,hasPostLiked,postLikeId,  userId}: ShopLikeDetailProps) => {
    const filterLike = like.filter((like:any) => like.postId === id)
    const router = useRouter()
    const [has, setHasPostLiked] = useState<boolean>(hasPostLiked)
    const [likePostCount, setLikePostCount] = useState<number>(filterLike.length)


    
    
      //いいね追加
      const { mutate: createPostLike, isLoading: createPostLikeLoading} =
      trpc.shop.createPostLike.useMutation({
          onSuccess: () =>{
              router.refresh()
          },
          onError: (error) => {
              console.error(error)
  
              if(likePostCount > 0){
  
                  setHasPostLiked(false)
                  setLikePostCount(likePostCount - 1)
  
              }
          },
  
      })
      //いいね削除
      const {mutate: deletePostLike , isLoading: deletePostLikeLoading } = 
      trpc.shop.deletePostLike.useMutation({
          onSuccess: () => {
              router.refresh()
          },
          onError: (error) =>{
              console.error(error)
              setHasPostLiked(true)
              setLikePostCount(likePostCount + 1)
          }
         
       })
       
       
       const handleCreatePostLike = () => {

        if (userId === undefined) {
            // ユーザーIDがundefinedの場合はログインページにリダイレクト
            
            router.push("/login");
            return;
          }
     
        if (!id) {
            return;
        }

          
          setHasPostLiked(true)
          setLikePostCount(likePostCount + 1)
  
          createPostLike({
              postId: id,
          })
       }
       const handleDeletePostLike = () =>{

    if (!id || !postLikeId) {
              return
          }
          if(likePostCount > 0){
              setHasPostLiked(false)
              setLikePostCount(likePostCount - 1)
          }
  
          deletePostLike({
              postLikeId: postLikeId,
              
          })
       }
 

      

   
       return(
        <div className=" flex justify-end items-center mt-3">
      
            {hasPostLiked ? (
                 <motion.div
                 animate={{
                   scale: [1, 2, 2, 1, 1],
                   rotate: [0, 0, 180, 270, 0],
                   borderRadius: ["20%", "20%", "50%", "50%", "20%"],
                 }}
               >
                
                <button
                   className="hover:bg-gray-100 p-2 rounded-full"
                   disabled={createPostLikeLoading || deletePostLikeLoading}
                   onClick={handleDeletePostLike}
                   >
                    <HeartFilledIcon className=" w-5 h-5 text-pink-500" />
                   </button> 
                   </motion.div>
   
            ): (
               
                <motion.div
                animate={{
                  scale: [2, 1, 1, 1, 1],
                }}
                transition={{
                  type: "spring", // アニメーションの種類
                  stiffness: 100, // バネの硬さ
                  damping: 10, // バネの減衰
                }}
              >
                <button
                  className={cn("p-2 transition-all duration-300", userId && "hover:bg-gray-100 rounded-full")}
                  disabled={createPostLikeLoading || deletePostLikeLoading}
                  onClick={handleCreatePostLike}
                >
                  <HeartIcon className="w-5 h-5" />
                </button>
              </motion.div>

                
            )}
{ filterLike.length > 0 && <div className=" pr-1">{filterLike.length}</div>}



                
        </div>

     )
} 
export default ShopLikeDetail