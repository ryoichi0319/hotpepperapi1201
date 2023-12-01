"use client"
import { useRef, useTransition, useCallback, useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Search = ({ keyword }: any) => {
  const inputRef = useRef<HTMLInputElement>(null);
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
          })}`




        );

      });
      inputRef.current.value = "";
      
    
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" ref={inputRef} />
        <button type="submit">検索</button>
      </form>
    </div>
  );
};

export default Search;
