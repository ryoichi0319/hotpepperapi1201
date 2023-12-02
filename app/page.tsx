import Image from 'next/image'
import Link from 'next/link';
import ShopItem from './components/ShopItem';
import Search from './components/Search';
interface HomeProps {
  searchParams: {
    [key: string]: string | undefined;
  };
}

async function fetchAllData({ keyword, large_service_area, genre }
  : { keyword: string | undefined
  , large_service_area: string | undefined
     genre: string | undefined}) {
  const res = await fetch(`http://localhost:3000/api/search?keyword=${keyword}&large_service_area=${large_service_area}&genre=${genre}`, {
    cache: "no-store", //SSR
  });
  console.log(keyword)
  const data = await res.json();
  return data;
}


export default async function Home({searchParams}: HomeProps) {
  const { keyword, large_service_area, genre} = searchParams;
  const shops = await fetchAllData({ keyword ,large_service_area, genre});
  console.log(searchParams,"search")


  
  return (
    <div className=" ">
     <Search keyword={keyword} large_service_area={large_service_area} genre={genre} />
      {shops.results.shop.length === 0 ? (
        <p>データがありません</p>
      ) : (
        <div className="grid grid-cols-3 mt-12">
          {shops.results.shop.map((shop: any) => (
            <ShopItem key={shop.id} shop={shop} />
          ))}
        </div>
      )}
    </div>
  );
}


// async function getTotalDataCount()  {
//   const apiKey = process.env.API_KEY;
//   const baseUrl = "https://webservice.recruit.co.jp/hotpepper/gourmet/v1/";
//   const serviceAria = "X385"; // サービスエリアを指定
//   const serviceAriaOsaka = "SA23";

//   const format = "json";

//   const firstRes = await fetch(
//     `${baseUrl}?key=${apiKey}&service_area=${serviceAriaOsaka}&genre=G012&format=${format}`
//   );

//   const firstData = await firstRes.json();
//   const totalCount = firstData.results.results_available; // レスポンスによっては異なるプロパティを確認
//   console.log(totalCount,"tc")
//   return totalCount;
// }

