"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ArticleType } from "./article/types";
import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import { Loader } from "lucide-react";

export default function Home() {
  const queryClient = useQueryClient();
  const getArticles = async () => {
    const response = await fetch("/api/articles");
    const responseJson = await response.json();
    return responseJson;
  };
  const query = useQuery({
    queryKey: ["articleList"],
    queryFn: getArticles,
  });

  return (
    <div className="flex items-center justify-items-center">
      <div className="flex gap-4 justify-center p-4 rounded m-4 flex-wrap">
        {query.isLoading ? (
          <div className="flex items-center justify-center">
            <Loader />
          </div>
        ) : (
          query.data.data.map((art: ArticleType) => (
            <div key={art._id} className="w-[280px]">
              <ArticleCard fullPage={false} article={art} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
