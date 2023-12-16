"use client"
import { Likes } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface AuthorLikeItemProps {
  like: Likes;
  likes: any;
  large_service_area: string | undefined
}

const AuthorLikeItem = ({ like, likes, large_service_area }: AuthorLikeItemProps) => {

  const filteredShops = likes.results.shop
    .filter((shop:any) => shop.id === like.postId && shop.large_service_area.code === large_service_area)
    .filter(Boolean); // filterでundefined/nullを取り除く


    return (
      <div className="">
        {filteredShops.length > 0 && (
          <div className="">
            {filteredShops.map((foundShop:any) => (
              <div key={foundShop.id} className=" w-[405px] ">
                <p className="font-bold mb-4 text-center">{foundShop.name}</p>
                <div>
                  <Link href={foundShop.urls.pc}>
                    <div className="aspect-[16/9] overflow-hidden rounded-md">
                      <Image
                        className="transition-all hover:scale-105 object-cover mx-auto"
                        src={foundShop.photo.pc.m}
                        alt={foundShop.name}
                        width={250}
                        height={250}
                        priority
                       />
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
        {!filteredShops.length && <p className=" lg:text-slate-600 text-center  ">Likes from different regions</p>}
      </div>
    );
};

export default AuthorLikeItem;
