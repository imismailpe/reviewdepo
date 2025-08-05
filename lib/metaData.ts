import { getDocumentById } from "@/app/api/functions";
import { ResponseType } from "@/app/article/types";
import { cache } from "react";

export const getArticleData = cache(async (id: string) => {
  const response = await getDocumentById("articles", id);
  // const response = await fetch(
  //   `${process.env.API_BASE_URL}/api/article/${id}`,
  //   { cache: "no-store" }
  // );
  return response;
  // const responseJson = await response.json();
  // return responseJson;
});
