"use client";
import ArticleForm from "@/components/ArticleForm";
import React, { useActionState, useState } from "react";
import { ArticleType } from "../types";
import { useRouter } from "next/navigation";

type NewArticle = Omit<ArticleType, "_id" | "published">;

export default function CreateArticle() {
  const router = useRouter();
  const initialData: NewArticle = {
    title: "",
    body: "",
    author: "",
    tags: [],
    amazon_link: "",
  };
  const [articleData, setArticleData] = useState(initialData);
  const submitArticle = async (prevState: NewArticle, formData: FormData) => {
    const tagsList = (formData.get("tags")?.toString() || "").split(",");
    const articleData = {
      title: formData.get("title"),
      body: formData.get("body"),
      author: formData.get("author"),
      tags: tagsList,
      amazon_link: formData.get("amazon_link"),
      published: true,
    };
    const response = await fetch("/api/article/create", {
      method: "POST",
      body: JSON.stringify(articleData),
    });
    const responseJson = await response.json();
    router.push(`/article/${responseJson.data}`);
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
  return (
    <div className="flex items-center justify-center w-full">
      <ArticleForm
        formAction={formAction}
        isPending={isPending}
        isEdit={false}
        handleChange={handleChange}
      />
    </div>
  );
}
