"use client";
import ArticleForm from "@/components/ArticleForm";
import React, { useActionState, useEffect, useState } from "react";
import { ArticleType } from "../../types";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";

export default function EditArticle() {
  const params = useParams();
  const router = useRouter();
  const articleId = params.id;
  const initialData: Omit<ArticleType, "_id" | "published"> = {
    title: "",
    body: "",
    author: "",
    tags: [],
    amazon_link: "",
  };
  const [articleData, setArticleData] = useState(initialData);
  const [fetchingArticle, setFetchinArticle] = useState(true);
  const getArticleData = async () => {
    setFetchinArticle(true);
    const response = await fetch(`/api/article/${articleId}`);
    const responseJson = await response.json();
    setArticleData(responseJson.data[0]);
    setFetchinArticle(false);
  };

  const submitArticle = async (prevState: ArticleType, formData: FormData) => {
    const tagsList = (formData.get("tags")?.toString() || "").split(",");
    const articleData = {
      id: articleId,
      title: formData.get("title"),
      body: formData.get("body"),
      author: formData.get("author"),
      tags: tagsList,
      amazon_link: formData.get("amazon_link"),
      published: true,
    };
    const response = await fetch(`/api/article/${articleId}`, {
      method: "POST",
      body: JSON.stringify(articleData),
    });
    if (response.ok) {
      router.push(`/article/${articleId}`);
    }
    //setting values to formState
    return articleData;
  };
  const [formState, formAction, isPending] = useActionState(
    submitArticle,
    articleData
  );
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setArticleData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  useEffect(() => {
    if (articleId) {
      getArticleData();
    }
  }, [articleId]);
  return (
    <div>
      {fetchingArticle ? (
        <center>
          <Loader />
        </center>
      ) : (
        <ArticleForm
          isEdit={true}
          formAction={formAction}
          isPending={isPending}
          articleData={articleData}
          handleChange={handleChange}
        />
      )}
    </div>
  );
}
