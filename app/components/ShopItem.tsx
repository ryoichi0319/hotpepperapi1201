import Image from "next/image";
import Link from "next/link";

interface ShopItemProps {
  shop: any;
}

const ShopItem = ({  shop }: ShopItemProps) => {
  return (
    <div className=" shadow-md rounded-md  mx-2 my-2">
      <ul className="list-none  mx-1 ">
        <li
          key={shop.id}
          className="bg-white py-10 px-2 my-5 mx-5   "
        >
            <Link href={shop.urls.pc}>
              <Image
                className="aspect-[16/9] rounded-md"
                src={shop.photo.pc.m}
                alt={shop.name}
                width={250}
                height={250}
                priority
              />
            </Link>

          <div className="mt-2 ">
            <h3 className="text-lg font-semibold">
              <a href={shop.urls.pc}>{shop.name}</a>
            </h3>
            <p className="text-gray-600">{shop.catch}</p>
            <p className="text-gray-700">{shop.address}</p>
            <p className="text-gray-900">営業時間: </p>
            <p>{shop.open}</p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default ShopItem;
