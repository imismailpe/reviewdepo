"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import React, { useActionState } from "react";

type Article = {
  title: FormDataEntryValue | null;
  body: FormDataEntryValue | null;
  author: FormDataEntryValue | null;
  tags: string[];
  amazon_link: FormDataEntryValue | null;
};
export default function CreateArticle() {
  const initialData: Article = {
    title: "",
    body: "",
    author: "",
    tags: [],
    amazon_link: "",
  };
  const submitArticle = async (prevState: Article, formData: FormData) => {
    const tagsList = (formData.get("tags")?.toString() || "").split(",");
    const articleData = {
      title: formData.get("title"),
      body: formData.get("body"),
      author: formData.get("author"),
      tags: tagsList,
      amazon_link: formData.get("amazon_link"),
    };
    const response = await fetch("/api/article/create", {
      method: "POST",
      body: JSON.stringify(articleData),
    });
    console.log("after submit", response);
    //setting values to formState
    return articleData;
  };
  const [formState, formAction, isPending] = useActionState(
    submitArticle,
    initialData
  );
  return (
    <div className="bg-slate-600 flex items-center justify-center">
      <form
        name="articleform"
        action={formAction}
        className="flex flex-col gap-4 m-4 border p-4 rounded shadow-sm"
      >
        <Input
          type="text"
          name="title"
          placeholder="Title"
          className="p-2 border rounded w-full"
        ></Input>
        <Textarea
          name="body"
          placeholder="Body"
          className="p-2 border rounded w-full"
        ></Textarea>
        <Input
          type="text"
          name="tags"
          placeholder="Tags"
          className="p-2 border rounded w-full"
        ></Input>
        <Input
          type="text"
          name="author"
          placeholder="Author"
          className="p-2 border rounded w-full"
        ></Input>
        <Input
          type="text"
          name="amazon_link"
          placeholder="Affiliate link"
          className="p-2 border rounded w-full"
        ></Input>
        <Button disabled={isPending} formAction={formAction} className="border">
          {isPending ? <Loader className="h-4 w-4 animate-spin mr-2" /> : null}
          Create
        </Button>
      </form>
    </div>
  );
}
