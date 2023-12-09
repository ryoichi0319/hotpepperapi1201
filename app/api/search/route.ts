


import { getAuthSession } from "@/lib/nextauth";
import { NextRequest,NextResponse } from "next/server";
export async function GET(req: NextRequest, res: NextResponse, ) {
    
    const apiKey = process.env.API_KEY;
    const baseUrl = "https://webservice.recruit.co.jp/hotpepper/gourmet/v1/";
    // const serviceAriaOsaka = "SA23";
    const format = "json";
    const offset = req.nextUrl.searchParams.get("start");
    const large_service_area = req.nextUrl.searchParams.get("large_service_area")
    const keyword = req.nextUrl.searchParams.get("keyword");
    const genre = req.nextUrl.searchParams.get("genre")
    console.log(genre,"genre1")

const response = await fetch(
`${baseUrl}?key=${apiKey}&large_service_area=${large_service_area}
&genre=${genre}&format=${format}&keyword=${keyword}&count=10&start=${offset}`
);

const data = await response.json();
const { results } = data;

// //ユーザー情報にlikesを追加
// const shopIds = results.shop.map((shop:any) => shop.id);
// const likes = await prisma.likes.findMany({
//    include:{
//     user:{
//         select:{
//             id:true,
//             name: true,
//         }
//     }
//    }
// }
// );



// results.shop.forEach((shop: any, index: number) => {
//     const userLike = userId ? likes.find((like) => like.userId === userId) : null;

//     // 新しいオブジェクトを作成
//     const status = {
//         hasPostLiked: !!userLike,
//         postLikeId: userLike ? userLike.id : null,
//     };

//     // results.shop の各店舗オブジェクトに shopsWithLikesStatus を追加
//     shop.shopsWithLikesStatus = status;
//     shop.likes = likes.filter((like) => like.postId === shop.id); // ショップごとにフィルタリング
// });


const total = results.results_available


return NextResponse.json({ results, keyword ,large_service_area,genre,total, offset,});
}