import { NextRequest,NextResponse } from "next/server";
export  async function GET(req: NextRequest, res: NextResponse){

    const apiKey = process.env.API_KEY;
    const baseUrl = "https://webservice.recruit.co.jp/hotpepper/gourmet/v1/";
    const serviceAria = "X385"; // サービスエリアを指定
    const serviceAriaOsaka = "SA23";
    const format = "json";

    
  
    const keyword = req.nextUrl.searchParams.get("keyword");
    console.log(keyword,"key1")

const response = await fetch(
    `${baseUrl}?key=${apiKey}&service_area=${serviceAriaOsaka}&genre=G012&format=${format}&keyword=${keyword}&count=100`
);

const data = await response.json();
const { results } = data;

return NextResponse.json({ results, keyword });
}

