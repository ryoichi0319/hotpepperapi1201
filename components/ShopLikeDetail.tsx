"use client"
import { HeartIcon, HeartFilledIcon } from "@radix-ui/react-icons"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { trpc } from "@/trpc/react"

import { cn } from "@/lib/utils"

  
  
  interface ShopLikeDetailProps {
    shop: any 
    userId: string | undefined
        
  }

 const ShopLikeDetail =  ({shop,  userId}: ShopLikeDetailProps) => {
    const filterLike = shop.like.filter((like:any) => like.postId === shop.id)
    const router = useRouter()
    const [hasPostLiked, setHasPostLiked] = useState<boolean>(shop.hasPostLiked)
    const [likePostCount, setLikePostCount] = useState<number>(filterLike.length)

    console.log(shop.hasPostLiked,"shophaspostliked")
    console.log(hasPostLiked,"haspostlied")


    

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
        if (!shop.id) {
            return;
        }
          
          setHasPostLiked(true)
          setLikePostCount(likePostCount + 1)
  
          createPostLike({
              postId: shop.id,
          })
       }
       const handleDeletePostLike = () =>{

    if (!shop.id || !shop.postLikeId) {
              return
          }
          if(likePostCount > 0){
              setHasPostLiked(false)
              setLikePostCount(likePostCount - 1)
          }
  
          deletePostLike({
              postLikeId: shop.postLikeId,
              
          })
       }

   
       return(
        <div className=" flex items-center">

            {hasPostLiked ? (
                
                <button
                   className="hover:bg-gray-100 p-2 rounded-full"
                   disabled={createPostLikeLoading || deletePostLikeLoading}
                   onClick={handleDeletePostLike}
                   >
                    <HeartFilledIcon className=" w-5 h-5 text-pink-500" />
                   </button>    
            ): (
                <button 
                    className={cn("p-2", userId && "hover:bg-gray-100 rounded-full")}
                    disabled={
                     createPostLikeLoading || deletePostLikeLoading || !userId
                    }
                    onClick={handleCreatePostLike}
                    >
                        <HeartIcon className=" w-5 h-5" />
                    
                </button>
            )}
            {likePostCount > 0 && <div className=" pr-1">{likePostCount}</div>}
        </div>
     )
} 
export default ShopLikeDetail