"use client"
import { Likes } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface AuthorLikeItemProps {
  like:any
}

const AuthorLikeItem = ({ like,   }: AuthorLikeItemProps) => {

    return (
      <div className=" shadow-md rounded-md  mx-2 ">

      <ul className="list-none  mx-1">
        <li
          key={like.id}
          className="bg-white py-10 px-6 my-5 mx-5  "
        >
          <div>
            <Link href={like.urls.pc}>
              <div className="aspect-[16/9] relative overflow-hidden rounded-md">
              <Image
                className="   transition-all hover:scale-105 object-cover "
                src={like.photo.pc.m}
                alt={like.name}
                width={250}
                height={250}
                priority
              />
              </div>
            </Link>
            </div>

          <div className="mt-2">
            <h3 className="text-lg font-semibold mb-2 mt-3">
              <a href={like.urls.pc}>{like.name}</a>
            </h3>
            <p className="text-gray-600">{like.catch}</p>
            <p className="text-gray-700">{like.address}</p>
            <p className="text-gray-700 font-bold">営業時間: </p>
            <p className=" text-gray-600">{like.open}</p>
            <div>
              <div>
            {/* <likeLikeDetail userId={userId} hasPostLiked={like.hasPostLiked} postLikeId={like.postLikeId} id={like.id} like={like.like}/> */}
            </div>
            </div>
            
          </div>
        </li>
      </ul>

    </div>
    );
};

export default AuthorLikeItem;
