import AuthorDetail from "@/components/author/AuthorDetail"
import { trpc } from "@/trpc/client"
import PaginationButton from "@/components/pager/Pagination"
import AuthorSearch from "@/components/author/AuthorSearch"

interface AuthorPageProps {
    params: {
        userId: string
    },
    searchParams: {
        [key: string]: string | undefined;
      };
}
async function fetchAllData({  large_service_area ,offset }
    : {
       large_service_area: string | undefined
       offset : number
       limit: number

       }  ) {

        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}api/like?large_service_area=${large_service_area}&start=${offset}&band=1`
        , {
        cache: "no-store", //SSR

      method: "GET",
      headers: {
        "Content-Type" : "application/json",
        
    },
    });
    const data = await res.json();
    return data;
    
  }
//   const res = await fetch(`${process.env.NEXT_PUBLIC_URL}api/like?large_service_area=${large_service_area}`




const AuthorDetailPage = async ({params,searchParams}: AuthorPageProps) => {
    const { userId } = params
    const {  large_service_area,page,perPage   } = searchParams;
    const postPerPage = 100

    const limit = typeof perPage === "string" ? parseInt(perPage) : postPerPage

    const currentPage = typeof page === "string" ? (parseInt(page) - 1) * limit : 0
    //start位置
    const offset = currentPage + 1
    const fetchData = await fetchAllData({large_service_area: large_service_area, limit, offset})


    const user = await trpc.user.getUserByIdLike({
        
        userId,
    })
 

    if(!user){
        return <div className=" text-center">ユーザーは存在しません</div>
    }


    const total = fetchData.total
  const pageCount = Math.ceil(total / limit)
    

    return (<div>
    <AuthorSearch large_service_area={large_service_area} userId={userId} />
   
      {total === 0 ? (
        <p className=' mt-3 text-center font-semibold'>検索結果がありません。条件を変えて検索して下さい。</p>
      ) : (

    <AuthorDetail user={user} fetchData={fetchData} large_service_area={large_service_area} />
      )}
       {fetchData.length !== 0 && (
    <PaginationButton  pageCount={pageCount}
          displayPerPage={postPerPage}/>
       )}
    </div>)
}

export default AuthorDetailPage