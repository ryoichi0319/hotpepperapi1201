"use client"

import Image from "next/image";
import Link from "next/link";
import ShopLikeDetail from "./ShopLikeDetail";
import React from "react";



interface ShopItemProps {
  shop: any
  userId: string | undefined;
}


const ShopItem = ({  shop, userId }: ShopItemProps) => {
  return (
    <div className=" shadow-md rounded-md  mx-2 ">

      <ul className="list-none  mx-1">
        <li
          key={shop.id}
          className="bg-white py-10 px-6 my-5 mx-5  "
        >
          <div>
            <Link href={shop.urls.pc}>
              <div className="aspect-[16/9] relative overflow-hidden rounded-md">
              <Image
                className="   transition-all hover:scale-105 object-cover "
                src={shop.photo.pc.m}
                alt={shop.name}
                width={250}
                height={250}
                priority
              />
              </div>
            </Link>
            </div>

          <div className="mt-2">
            <h3 className="text-lg font-semibold mb-2 mt-3">
              <a href={shop.urls.pc}>{shop.name}</a>
            </h3>
            <p className="text-gray-600">{shop.catch}</p>
            <p className="text-gray-700">{shop.address}</p>
            <p className="text-gray-700 font-bold">営業時間: </p>
            <p className=" text-gray-600">{shop.open}</p>
            <div>
              <div>
            <ShopLikeDetail userId={userId} hasPostLiked={shop.hasPostLiked} postLikeId={shop.postLikeId} id={shop.id} like={shop.like}/>
            </div>
            </div>
            
          </div>
        </li>
      </ul>

    </div>
    
  );
};

export default ShopItem;

