import AuthorDetail from "@/components/author/AuthorDetail"
import { trpc } from "@/trpc/client"
import AuthorSearch from "@/components/author/AuthorSearch"
interface AuthorPageProps {
    params: {
        userId: string
    },
    searchParams: {
        [key: string]: string | undefined;
      };
}
async function fetchAllData({  large_service_area  }
    : {
       large_service_area: string | undefined
       }  ) {

    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}api/like?large_service_area=${large_service_area}`
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



const AuthorDetailPage = async ({params,searchParams}: AuthorPageProps) => {
    const { userId } = params
    const {  large_service_area  } = searchParams;


    const likes = await fetchAllData({large_service_area: large_service_area})


    const user = await trpc.user.getUserByIdLike({
        userId
    })

    if(!user){
        return <div className=" text-center">ユーザーは存在しません</div>
    }

    return (<div>
    <AuthorSearch large_service_area={large_service_area} />

    <AuthorDetail user={user} likes={likes} large_service_area={large_service_area} />
    </div>)
}

export default AuthorDetailPage