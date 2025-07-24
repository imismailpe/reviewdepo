import React from "react";
import { getArticleData } from "@/lib/metaData";
import { notFound } from "next/navigation";
import ArticleCard from "@/components/ArticleCard";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getArticleData(id);
  if (!data.data.length) {
    return {
      title: "Not Found",
    };
  }
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
  if (!data.data.length) {
    notFound();
  }
  const article = data.data[0];
  return <ArticleCard fullPage={true} article={article} />;
}
