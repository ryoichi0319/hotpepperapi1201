"use client"

import { Button } from "@/components/ui/button"
import { User } from "@prisma/client"
import UserNavigation from "./UserNavigation"
import Link from "next/link"

type NavigationProps = {
    user: User | null
}

const Navigation = ({user}: NavigationProps) =>{
    return (
        <header className=" ">
      <div className="container mx-auto flex bg-gray-800 items-center justify-between py-3">
        <Link href={"/"}>
      <button className=" bg-slate-400 hover:bg-slate-300 text-white font-bold py-2 px-4 rounded-full">
        Home
      </button>
      </Link>
        
        
       {user ? (
        <UserNavigation user={user} />
       ) : (
        <div className="flex items-center space-x-4  ">

            <Button asChild  className="font-bold bg-cyan-600 hover:bg-cyan-500 text-white">
                <Link href="/login">ログイン</Link>
            </Button>
            <Button asChild  className="font-bold bg-gray-600 hover:bg-gray-500 text-white">
                <Link href="/signup">新規登録</Link>
            </Button>

        </div>
       )}

       </div>
        </header>
    )
}

export default Navigation