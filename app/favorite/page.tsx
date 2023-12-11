import Favorite from "@/components/Favorite";
import { getAuthSession } from "@/lib/nextauth";
import { trpc } from '@/trpc/client';

interface FavoriteButtonProps {
  newShops:any
}

const FavoriteButton = async ({newShops}:FavoriteButtonProps) => {
    const user = await getAuthSession()
    
      const {like, likes } = await trpc.like.getLikes({
        userId: user?.id,
      })
      console.log(newShops)
      
    const userId = user?.id
    return(
        <div>
        
            <Favorite  userId={userId} newShops={newShops}/>
        </div>
    )
}
export default FavoriteButton