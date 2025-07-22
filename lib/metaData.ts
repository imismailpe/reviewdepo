import { cache } from "react";

export const getArticleData = cache(async (id: string) => {
  const response = await fetch(
    `${process.env.API_BASE_URL}/api/article/${id}`,
    { cache: "no-store" }
  );
  const responseJson = await response.json();
  return responseJson;
});
