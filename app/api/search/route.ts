import { NextRequest,NextResponse } from "next/server";
export async function GET(req: NextRequest, res: NextResponse, ) {
    
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;

    const baseUrl = "https://webservice.recruit.co.jp/hotpepper/gourmet/v1/";
    const format = "json";
    //取得開始位置
    const offset = req.nextUrl.searchParams.get("start");
    //大分類
    const large_service_area = req.nextUrl.searchParams.get("large_service_area") || "SS40"
    //キーワード
    const keyword = req.nextUrl.searchParams.get("keyword") || null
    //ジャンル
    const genre = req.nextUrl.searchParams.get("genre") || null

const response = await fetch(
`${baseUrl}?key=${apiKey}&large_service_area=${large_service_area}
&genre=${genre}&format=${format}&keyword=${keyword}&count=10&start=${offset}`
);


const data = await response.json();
const { results } = data;


//全データ数
const total = results.results_available


return NextResponse.json({
    results,
    keyword,
    large_service_area,
    genre,
    total,
    offset,
  }, {
    status: 200,
    headers: {
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Origin": "https://hotpepperapi1201.vercel.app/", 
    "Access-Control-Allow-Methods": "GET,OPTIONS,POST",
    },
  });}