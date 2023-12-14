"use client"

import { User, Likes} from "@prisma/client"
import Image from "next/image"
import AuthorLikeItem from "./AuthorLikeItem"

interface AuthorDetailProps{
    user: User & {
        likes: Likes[]
    }
    likes: any
    large_service_area: string | undefined
}

const AuthorDetail = ({user,likes,large_service_area}: AuthorDetailProps) => {
    
   
    return(
        <div>
            <div className=" flex justify-center mb-5 mt-12">
                <div className=" relative w-28 h-28 flex-shrink-0">
                    <Image
                       src={user.image || "/default.png"}
                       className=" rounded-full object-cover"
                       alt={user.name || "avatar"}
                       fill
                       />
                </div>
            </div>
            <div className=" space-y-5 break-words whitespace-pre-wrap mb-5">
                <div className=" font-bold text-xl text-center">{user.name}</div>
                <div className=" leading-relaxed">{user.introduction}</div>
            </div>

            <div>
                <div className=" mb-5">
                    <div className=" font-bold mb-1">TOTAL　 ❤️　{user.likes.length}</div>
                </div>

                {user.likes.length === 0 ? (
                    <div className=" text-center text-sm text-gray-500" >
                        いいねはありません
                    </div>
                ): (
                    <div className=" grid grid-cols-1 sm:grid-cols-3 gap-5 break-words">
                        {user.likes.map((like) => (
                            <AuthorLikeItem key={like.id} like={like} likes={likes}/>
                        ))}

                    </div>
                )}
            </div>

        </div>
    )
}
export default AuthorDetail

