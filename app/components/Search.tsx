"use client"
import { useRef, useTransition, useCallback, useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PrefCategory } from "@/data/prefecture";
import { GenreCategory } from "@/data/genre"

const Search = ({ keyword, large_service_area, genre }: any) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const large_service_areaRef = useRef<HTMLSelectElement | null>(null); 
  const genreRef = useRef<HTMLSelectElement | null>(null)
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // ページ遷移の状態管理のためのフック
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    // keyword が変更されたら、入力フィールドの値を更新
    if (inputRef.current && keyword) {
      inputRef.current.value = keyword;
    }
  }, [keyword]);
  
  useEffect(() => {
    // keyword が変更されたら、入力フィールドの値を更新
    if (large_service_areaRef.current && large_service_area) {
      large_service_areaRef.current.value = large_service_area;
    }
  }, [large_service_area]);

  useEffect(() => {
    if(genreRef.current && genre){
      genreRef.current.value = genre
    }
  },[genre])
  

  console.log(pathname, "pathname");

  const createQueryString = useCallback(
    (params: Record<string, string | undefined>) => {
      const newSearchParams = new URLSearchParams(searchParams?.toString());

      // パラメータを新しいクエリストリングに設定
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

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputRef.current) {
      startTransition(() => {
        router.push(
          `/${pathname}?${createQueryString({
            keyword: inputRef.current?.value,
            large_service_area: large_service_areaRef.current?.value,
            genre: genreRef.current?.value
          })}`




        );

      });
      inputRef.current.value = "";

    
    }
  };

  return (
    <div className=" ">
      <form onSubmit={onSubmit}>
        <input type="text" ref={inputRef} />
        <select ref={large_service_areaRef}>
            {PrefCategory.map((category, index) => (
            <option key={index} value={category.large_service_area}>
            {category.category_name}
        </option>
      ))}
    </select>
    <select ref={genreRef} >
      {GenreCategory.map((genre,index) =>(
        <option  key={index} value={genre.genre}>{genre.genre_name}</option>
      ))}
      </select>     
     <button type="submit">検索</button>
      </form>
    </div>
  );
};

export default Search;
