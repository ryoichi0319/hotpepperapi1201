"use client"
// Import necessary modules
import { useRef, useTransition, useCallback, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PrefCategory } from "@/data/prefecture";


const AuthorSearch = ({ large_service_area,userId }: any) => {
  const large_service_areaRef = useRef<HTMLSelectElement | null>(large_service_area);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Page transition management hook
  const [isPending, startTransition] = useTransition();
  // Handle keyword change


  // Handle large service area change
  useEffect(() => {
    if (large_service_areaRef.current && large_service_area) {
      large_service_areaRef.current.value = large_service_area;
    }
  }, [large_service_area]);

  // Create query string
  const createQueryString = useCallback(
    (params: Record<string, string | undefined>) => {
      const newSearchParams = new URLSearchParams(searchParams?.toString());

      for (const [key, value] of Object.entries(params)) {
        if (value === null) {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, String(value));
        }
      }
      return newSearchParams.toString();
    },
    [searchParams]
  );
  // Handle form submission
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (large_service_areaRef.current) {
        startTransition(() => {
        router.push(
  `${process.env.NEXT_PUBLIC_URL}${pathname}?${createQueryString({
    large_service_area: large_service_areaRef.current?.value,
          })}`
        );
      });}
  };




  return (
    <div className=" bg-gray-800 pr-5 text-center  w-full z-10">
      <form onSubmit={onSubmit} className="flex flex-col lg:flex-row pb-5 items-center justify-end gap-4 ">
       
        <div className="md:flex flex-col md:flex-row space-x-7 md:space-x-0  items-center gap-4">
          <label className="text-white mr-11 lg:mr-0">地域</label>
          <select className="p-2 border rounded w-64" ref={large_service_areaRef}>
            {PrefCategory.map((category, index) => (
              <option key={index} value={category.large_service_area_code}>
                {category.category_name}
              </option>
            ))}
          </select>
        </div>
        <button
  type="submit"
  disabled={isPending}
  className="p-2  w-28 mt-5 lg:mt-0 bg-orange-500 text-white rounded cursor-pointer hover:bg-orange-300 transition-all duration-300"
>
  {isPending ? "検索中..." : "検索"}
</button>
      </form>
    </div>
  );
};

export default AuthorSearch;