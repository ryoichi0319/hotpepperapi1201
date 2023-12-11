interface FavoriteProps {
    userId: string | undefined
    newShops: any
}


const Favorite = ({userId, newShops}: FavoriteProps) =>{

    return(
        <div>
            
        {newShops.map((shop:any) =>shop.name)}
        </div>
    )

}
export default Favorite