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
      <div className="container mx-auto flex bg-gray-800 items-center   justify-end  py-3">
        
        
       {user ? (
        <UserNavigation user={user} />
       ) : (
        <div className="flex items-center space-x-4  ">
            <Button asChild variant="ghost" className="font-bold bg-cyan-800 text-white">
                <Link href="/login">ログイン</Link>
            </Button>
            <Button asChild variant="ghost" className="font-bold bg-gray-600 text-white">
                <Link href="/signup">新規登録</Link>
            </Button>

        </div>
       )}

       </div>
        </header>
    )
}

export default Navigation