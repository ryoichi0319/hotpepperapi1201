import { NextRequest,NextResponse } from "next/server";
export async function GET(req: NextRequest, res: NextResponse, ) {
    
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;

    const baseUrl = "https://webservice.recruit.co.jp/hotpepper/gourmet/v1/";
    const format = "json";

    const offset = req.nextUrl.searchParams.get("start");
    const large_service_area = req.nextUrl.searchParams.get("large_service_area") || null

    // const large_service_area = `&large_service_area=${req.nextUrl.searchParams.get("large_service_area")}` || ""
   

const response = await fetch(
`${baseUrl}?key=${apiKey}&large_service_area=${large_service_area}&format=${format}&count=100&start=${offset}&private_room=1`)


const data = await response.json();
const { results } = data;

const total = results.results_available

return NextResponse.json({
    results,
    total,
    large_service_area,
    offset
  }, {
    status: 200,
    headers: {
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Origin": "https://hotpepperapi1201.vercel.app/", 
    "Access-Control-Allow-Methods": "GET,OPTIONS,POST",
    },
  });}