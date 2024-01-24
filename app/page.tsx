
import ShopItem from '@/components/ShopItem';
import Search from '@/components/Search';
import PaginationButton from '../components/pager/Pagination';
import {postPerPage} from "@/data/perPage"
import Image from 'next/image';
import { getAuthSession } from '@/lib/nextauth';
import { trpc } from '@/trpc/client';
import edamame from '../public/edamame.png';

interface HomeProps {
  searchParams: {
    [key: string]: string | undefined;
  };
}

async function fetchAllData({ keyword, large_area,large_service_area, genre,offset,  }
  : {keyword: string | undefined
     large_area: string | undefined
     large_service_area: string | undefined
     genre: string | undefined
     limit: number
     offset: number
     userId: string | undefined
 
     }
     
    ) {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}api/search?keyword=${keyword}&large_service_area=${large_service_area}
      &large_area=${large_area}&genre=${genre}&start=${offset}`, {
    method: "GET",
    headers: {
      "Content-Type" : "application/json",
  },
  });

  const data = await res.json();
  return data;
  
}
// const res = await fetch(`${process.env.NEXT_PUBLIC_URL}api/search?keyword=${keyword}
// &large_service_area=${large_service_area}&genre=${genre}&start=${offset}`, {


export default async function Home({ searchParams }: HomeProps) {
  const { keyword, large_area,large_service_area, genre, page, perPage,  } = searchParams;
  const user = await getAuthSession()

  const limit = typeof perPage === "string" ? parseInt(perPage) : postPerPage

  const currentPage = typeof page === "string" ? (parseInt(page) - 1) * limit : 0
  //start位置
  const offset = currentPage + 1

  const userId = user?.id
 
  // start プロパティの型を number | undefined に設定

  const shops = await fetchAllData({
    keyword,
    large_service_area,
    large_area,
    genre,
    limit,
    offset,
    userId: user?.id
  });
  const {like, } = await trpc.like.getLikes({
    userId: user?.id,
  })
  const newShops = await Promise.all(
    shops.results.shop.map(async (shop: any) => {
      const userLike = userId
        ? like.find((like) => like.userId === userId && shop.id === like.postId)
        : null;
  
      return {
        ...shop,
        hasPostLiked: !!userLike,
        postLikeId: userLike ? userLike.id : null,
        like,
        
      };
    })
  );


    

  const total = shops.total
  const pageCount = Math.ceil(total / limit)

  
  return (
    <div className="	">
           

     <Search
      keyword={keyword} 
      large_area={large_area}
      genre={genre}
      large_service_area={large_service_area}
      offset={offset}
        />
       <div className="text-center bg-gray-800 text-white p-8">
    <h1 className="font-bold text-3xl">プライベートな空間を提供するお店を検索！</h1>
</div>
     <div className=' flex justify-center  space-x-5 mt-5  '>
              <p className=' '>検索結果</p>
              <p className=' text-red-600 font-bold '>{total}</p>
              <p>件</p>
              
              <p>{page} / {pageCount}</p>
              </div>
              {(total === 0 && (page === undefined || parseInt(page) !== 1)) ? (
  <p className=' mt-12 text-xl text-red-500 text-center font-semibold'>地域を選択してください。</p>
) : null}
      {total === 0 && page && parseInt(page) === 1 ? (
        <p className=' mt-3 text-center font-semibold'>検索結果がありません。条件を変えて検索して下さい。</p>
      ) : (
        <div className="grid grid-cols-1 sm:gap-3 md:grid-cols-2 lg:grid-cols-3     ">
          {newShops.map((shop: any) => (
                   <ShopItem key={shop.id} shop={ shop } userId={userId} />  ))}

        </div>
      )}
       {total !== 0   ? (
        <PaginationButton
          pageCount={pageCount}
          displayPerPage={postPerPage}
           /> 
      ):(
        <div className=' w-[70%] ml-[50%]'>
        <Image 
          src={edamame}
          alt=''
          
          className=' opacity-30'
          
        />
        </div>

      )}
     
    </div>
  );
}

