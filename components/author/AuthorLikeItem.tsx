"use client"
import { Likes } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface AuthorLikeItemProps {
  like: Likes;
  likes: any;
}

const AuthorLikeItem = ({ like, likes }: AuthorLikeItemProps) => {

  const filteredShops = likes.results.shop.filter((shop: any) => shop.id === like.postId);

  return (
    <div>
      <div>
        {filteredShops.map((foundShop: any) => (
          <div key={foundShop.id}>
            <p>{foundShop.name}</p>
            <div>
              <Link href={foundShop.urls.pc}>
                <div className="aspect-[16/9] relative overflow-hidden rounded-md">
                  <Image
                    className="transition-all hover:scale-105 object-cover"
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
    </div>
  );
};

export default AuthorLikeItem;
