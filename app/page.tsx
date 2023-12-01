import Image from 'next/image'
import Link from 'next/link';
import ShopItem from './components/ShopItem';
import Search from './components/Search';
interface HomeProps {
  searchParams: {
    [key: string]: string | undefined;
  };
}

async function fetchAllData({ keyword }: { keyword: string | undefined}) {
  const res = await fetch(`http://localhost:3000/api/search?keyword=${keyword}`, {
    cache: "no-store", //SSR
  });
  console.log(keyword)
  const data = await res.json();
  return data;
}


export default async function Home({searchParams}: HomeProps) {
  const { keyword } = searchParams;
  const shops = await fetchAllData({ keyword });
  console.log(shops,"shops")
 
  console.log(searchParams,"search")
  
  return (
    <div className="">
      <Search keyword={keyword}  />
      <div className=" grid grid-cols-3">
        {shops.results.shop.map((shop: any) => (
          <ShopItem key={shop.id}  shop={shop}/>
        ))}
      </div>
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

//   return totalCount;
// }

