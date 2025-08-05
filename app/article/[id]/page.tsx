import React from "react";
import { notFound } from "next/navigation";
import ArticleCard from "@/components/ArticleCard";
import { getDocumentById } from "@/app/api/functions";
import Head from "next/head";

// export async function generateMetadata({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
//   const { id } = await params;
//   const data = await getDocumentById("articles", id);
//   if (!data.data.length) {
//     return {
//       title: "Not Found",
//     };
//   }
//   return {
//     title: data.data[0].title,
//     description: (data.data[0].body || "").slice(0, 120),
//   };
// }
export default async function Article({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const data = await getDocumentById("articles", id);
  if (!data.data.length) {
    notFound();
  }
  const article = data.data[0];
  return (
    <>
      <Head>
        <title>{article.title}</title>
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.body.slice(0.12)} />
      </Head>
      <ArticleCard fullPage={true} article={article} />
    </>
  );
}
