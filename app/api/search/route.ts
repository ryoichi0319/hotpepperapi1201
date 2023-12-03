import { NextRequest,NextResponse } from "next/server";
export  async function GET(req: NextRequest, res: NextResponse){

    const apiKey = process.env.API_KEY;
    const baseUrl = "https://webservice.recruit.co.jp/hotpepper/gourmet/v1/";
    // const serviceAriaOsaka = "SA23";
    const format = "json";

    const offset = req.nextUrl.searchParams.get("start");
    
    const large_service_area = req.nextUrl.searchParams.get("large_service_area")
    const keyword = req.nextUrl.searchParams.get("keyword");
    const genre = req.nextUrl.searchParams.get("genre")
    console.log(large_service_area,"large_service_area1")
    console.log(keyword,"key1")
    console.log(genre,"genre1")

const response = await fetch(
`${baseUrl}?key=${apiKey}&large_service_area=${large_service_area}
&genre=${genre}&format=${format}&keyword=${keyword}&count=10&start=${offset}`
);

const data = await response.json();
const { results } = data;
const total = results.results_available
console.log(results.results_available,"results_available")

return NextResponse.json({ results, keyword ,large_service_area,genre,total, offset});
}

