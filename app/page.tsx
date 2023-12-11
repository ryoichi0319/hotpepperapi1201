
import ShopItem from '@/components/ShopItem';
import Search from '@/components/Search';
import PaginationButton from '../components/pager/Pagination';
import {postPerPage} from "@/data/perPage"
import Image from 'next/image';
import { getAuthSession } from '@/lib/nextauth';
import { trpc } from '@/trpc/client';
import Link from 'next/link';

interface HomeProps {
  searchParams: {
    [key: string]: string | undefined;
  };
}

async function fetchAllData({ keyword, large_service_area, genre,offset,  }
  : {keyword: string | undefined
     large_service_area: string | undefined
     genre: string | undefined
     limit: number
     offset: number
     userId: string | undefined
 
     }
     
    ) {
  const res = await fetch(`https://hotpepperapi1201-ryoichi0319.vercel.app/api/search?keyword=${keyword}
  &large_service_area=${large_service_area}&genre=${genre}&start=${offset}`, {
    cache: "no-store", //SSR
    method: "GET",
    headers: {
      "Content-Type" : "application/json",
  },
  });
  const data = await res.json();
  return data;
  
}


export default async function Home({ searchParams }: HomeProps) {
  const { keyword, large_service_area, genre, page, perPage,  } = searchParams;
  const user = await getAuthSession()

  const limit = typeof perPage === "string" ? parseInt(perPage) : postPerPage

  const offset = typeof page === "string" ? (parseInt(page) - 1) * limit : 0
  const userId = user?.id
  
 

  // start プロパティの型を number | undefined に設定

  console.log(searchParams, "search");

  const shops = await fetchAllData({
    keyword,
    large_service_area,
    genre,
    limit,
    offset,
    userId: user?.id
  });
  const {like, likes } = await trpc.like.getLikes({
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


    
  
  
console.log(newShops,"newshops")

  const total = shops.total
  const pageCount = Math.ceil(total / limit)


  
  return (
    <div className=" ">
           

     <Search
      keyword={keyword} 
      large_service_area={large_service_area}
       genre={genre}
        offset={offset}
        />
        <div>
       
        </div>
     <div className=' flex   ml-10 space-x-5 mt-5'>
              <p className='  '>検索結果</p>
              <p className=' text-red-600 font-bold '>{total}</p>
              <p>件</p>
              
              <p>{page} / {pageCount}</p>
              </div>
      {total === 0 ? (
        <p>データがありません</p>
      ) : (
        <div className="grid grid-cols-1 sm:gap-3 md:grid-cols-2 lg:grid-cols-3     ">
          {newShops.map((shop: any) => (
                   <ShopItem key={shop.id} shop={ shop } userId={userId}/>  ))}

        </div>
      )}
       {shops.length !== 0 && (
        <PaginationButton
         pageCount={pageCount}
          displayPerPage={postPerPage}
           />
      )}
      {newShops.find((like) =>  like.hasPostLiked) ? newShops.map((shop:any) => shop.name) : null}
      <div>
      <footer className=' justify-end flex'>
            <a  
            href="http://webservice.recruit.co.jp/">
              <Image
              
                src="http://webservice.recruit.co.jp/banner/hotpepper-s.gif"
                alt="ホットペッパーグルメ Webサービス"
                width="135"
                height="17"
                title="ホットペッパーグルメ Webサービス"
              />
            </a>
          </footer>
      </div>
    </div>
  );
}





