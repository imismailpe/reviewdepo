import React from "react";
import { Button } from "@/components/ui/button";
import { getArticleData } from "@/lib/metaData";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getArticleData(id);
  return {
    title: data.data[0].title,
    description: data.data[0].body.slice(0, 120),
  };
}
export default async function Article({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  //getArticleData is cached when called for metadata. wont fetch again
  const data = await getArticleData(id);
  const article = data.data[0];
  return (
    <div className="flex flex-col items-start p-4 border">
      <div>{article.title}</div>
      <div>{article.author}</div>
      <div>{article.body}</div>
      <div>{article.tags.join(", ")}</div>
      <Button>
        <a href={article.amazon_link} target="_blank">
          Check on Amazon
        </a>
      </Button>
    </div>
  );
}
