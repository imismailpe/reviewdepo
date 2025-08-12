"use client";
import ArticleForm from "@/components/ArticleForm";
import React, { useActionState, useEffect, useState } from "react";
import { ArticleType } from "../../types";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";

type formStatusType = { success: boolean; error: null | string };

export default function EditArticle() {
  const params = useParams();
  const router = useRouter();
  const articleId = params.id;
  const initialData: Omit<ArticleType, "id" | "published"> = {
    title: "",
    body: "",
    author: "",
    tags: [],
    amazon_link: "",
  };
  const initialFormStatus: formStatusType = {
    success: false,
    error: null,
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

  const submitArticle = async (
    prevState: formStatusType,
    formData: FormData
  ): Promise<formStatusType> => {
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
      //setting values to formStatus
      return {
        success: true,
        error: null,
      };
    } else {
      //setting values to formStatus
      return {
        success: false,
        error: response.statusText,
      };
    }
  };
  const [formStatus, formAction, isPending] = useActionState(
    submitArticle,
    initialFormStatus
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
