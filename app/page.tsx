
import ShopItem from './components/ShopItem';
import Search from './components/Search';
import PaginationButton from './components/pager/Pagination';
import {postPerPage} from "@/data/perPage"
interface HomeProps {
  searchParams: {
    [key: string]: string | undefined;
  };
}

async function fetchAllData({ keyword, large_service_area, genre,offset  }
  : {keyword: string | undefined
     large_service_area: string | undefined
     genre: string | undefined
     limit: number
     offset: number
    }) {
  const res = await fetch(`http://localhost:3000/api/search?keyword=${keyword}&large_service_area=${large_service_area}&genre=${genre}&start=${offset}`, {
    cache: "no-store", //SSR
  });
  console.log(keyword,"keyword")
  
  const data = await res.json();
  return data;
}


export default async function Home({ searchParams }: HomeProps) {
  const { keyword, large_service_area, genre, page, perPage,  } = searchParams;

  const limit = typeof perPage === "string" ? parseInt(perPage) : postPerPage

  console.log(limit,"limit")
  const offset = typeof page === "string" ? (parseInt(page) - 1) * limit : 0
  
  


  // start プロパティの型を number | undefined に設定

  console.log(searchParams, "search");
  const shops = await fetchAllData({
    keyword,
    large_service_area,
    genre,
    limit,
    offset,
   
  });
  const total = shops.total
  const pageCount = Math.ceil(total / limit)

  
  return (
    <div className=" ">
     <Search keyword={keyword} large_service_area={large_service_area} genre={genre} />
      {total === 0 ? (
        <p>データがありません</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  sm:gap-3 lg:mt-12   ">
          {shops.results.shop.map((shop: any) => (
            <ShopItem key={shop.id} shop={shop} />
          ))}
        </div>
      )}
       {shops.length !== 0 && (
        <PaginationButton pageCount={pageCount} displayPerPage={postPerPage} />
      )}
    </div>
  );
}



