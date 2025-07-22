"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ArticleType } from "./article/types";
import Link from "next/link";

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
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main>
        <div className="flex gap-4 justify-center bg-slate-600 p-4 rounded m-4">
          {query.isLoading ? (
            <div>Loading articles</div>
          ) : (
            query.data.data.map((art: ArticleType) => (
              <Link key={art._id} href={`/article/${art._id}`}>
                <Card>
                  <CardHeader>
                    <CardTitle>{art.title}</CardTitle>
                    <CardDescription>{art.author}</CardDescription>
                  </CardHeader>
                  <CardContent>{art.body}</CardContent>
                  {/* <CardFooter>footer</CardFooter> */}
                </Card>
              </Link>
            ))
          )}
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
  );
}
