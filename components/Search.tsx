"use client"
// Import necessary modules
import { useRef, useTransition, useCallback, useEffect,useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { LargeCategory, PrefCategory } from "@/data/prefecture";
import { GenreCategory } from "@/data/genre";

const Search = ({ keyword, large_area,large_service_area, genre, }: any) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const large_areaRef = useRef<HTMLSelectElement | null>(large_area);
  const large_service_areaRef = useRef<HTMLSelectElement | null>(large_service_area);
  const genreRef = useRef<HTMLSelectElement | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selectedRegion, setSelectedRegion] = useState('');


  // Page transition management hook
  const [isPending, startTransition] = useTransition();
  // Handle keyword change
  useEffect(() => {
    if (inputRef.current && keyword) {
      inputRef.current.value = keyword;
    }
  }, [keyword]);

  // Handle large service area change
  useEffect(() => {
    if (large_areaRef.current && large_area) {
      large_areaRef.current.value = large_area;
    }
  }, [large_area]);

  useEffect(() => {
    if (large_service_areaRef.current && large_service_area) {
      large_service_areaRef.current.value = large_service_area;
    }
  }, [large_service_area]);

  // Handle genre change
  useEffect(() => {
    if (genreRef.current && genre) {
      genreRef.current.value = genre;
    }
  }, [genre]);


//地域が変われば都道府県を絞り込む
  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRegionCode = e.target.value;
    setSelectedRegion(selectedRegionCode);
  };
  const filteredPrefectures = LargeCategory.filter(
    (category) => category.large_service_area_code === selectedRegion
  );


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
  
    const keywordValue = inputRef.current?.value !== null ? inputRef.current?.value : '';
  
    startTransition(() => {
      router.push(
        `/${pathname}?${createQueryString({
          keyword: keywordValue,
          large_area: large_areaRef.current?.value,
          large_service_area: large_service_areaRef.current?.value,
          genre: genreRef.current?.value,
          page: "1"
        })}`
      );
      router.refresh();
    });
  };
  return (
    <div className=" bg-gray-800 pr-5 text-center  w-full z-10">
      <form onSubmit={onSubmit} className="flex flex-col lg:flex-row pb-5 items-center justify-end gap-4 ">
        <div className="md:flex flex-col  md:flex-row space-x-7 md:space-x-0  items-center gap-4">
          <label className="text-white">キーワード</label>
          <input
            type="text"
            ref={inputRef}
            className="p-2 border rounded w-48"
            placeholder="キーワード検索"
          />
        </div>
        <div className="md:flex flex-col md:flex-row space-x-7 md:space-x-0  items-center gap-4">
        <label className="text-white mr-11 lg:mr-0">地域</label>
        <select
          className="p-2 border rounded w-48"
          ref={large_service_areaRef}
          onChange={handleRegionChange}
        >
          {PrefCategory.map((category, index) => (
            <option key={index} value={category.large_service_area_code}>
              {category.category_name}
            </option>
          ))}
        </select>
      </div>

      {/* 都道府県の選択 */}
      <div className="md:flex flex-col md:flex-row space-x-7 md:space-x-0  items-center gap-4">
        <label className="text-white mr-4 lg:mr-0">都道府県</label>
        <select className="p-2 border rounded w-48" ref={large_areaRef}>
          {filteredPrefectures.map((category, index) => (
            <option key={index} value={category.large_area_code}>
              {category.large_area_name}
            </option>
          ))}
        </select>
      </div>
        <div className="md:flex flex-col md:flex-row space-x-7 md:space-x-0 items-center gap-4 ">
          <label className="text-white mr-4  lg:mr-0 ">ジャンル</label>
          <select className="p-2 border rounded w-48" ref={genreRef}>
            {GenreCategory.map((genre, index) => (
              <option key={index} value={genre.genre}>
                {genre.genre_name}
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

export default Search;