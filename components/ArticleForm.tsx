import React from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Loader } from "lucide-react";
import { ArticleType } from "@/app/article/types";

export default function ArticleForm({
  formAction,
  isPending,
  isEdit,
  articleData,
  handleChange,
}: {
  formAction: (payload: FormData) => void;
  isPending: boolean;
  isEdit: boolean;
  articleData?: ArticleType;
  handleChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}) {
  return (
    <form
      name="articleform"
      action={formAction}
      className="flex flex-col gap-4 m-4 border p-4 rounded shadow-sm w-full"
    >
      <Input
        type="text"
        name="title"
        placeholder="Title"
        className="p-2 border rounded w-full"
        value={articleData?.title as string}
        onChange={handleChange}
      ></Input>
      <Textarea
        name="body"
        placeholder="Body"
        className="p-2 border rounded w-full"
        value={articleData?.body as string}
        onChange={handleChange}
      ></Textarea>
      <Input
        type="text"
        name="tags"
        placeholder="Tags"
        className="p-2 border rounded w-full"
        value={articleData?.tags}
        onChange={handleChange}
      ></Input>
      <Input
        type="text"
        name="author"
        placeholder="Author"
        className="p-2 border rounded w-full"
        value={articleData?.author as string}
        onChange={handleChange}
      ></Input>
      <Input
        type="text"
        name="amazon_link"
        placeholder="Affiliate link"
        className="p-2 border rounded w-full"
        value={articleData?.amazon_link as string}
        onChange={handleChange}
      ></Input>
      <Button
        disabled={isPending}
        formAction={formAction}
        className="w-fit dark:text-white"
      >
        {isPending ? <Loader className="h-4 w-4 animate-spin mr-2" /> : null}
        {isEdit ? "Save" : "Create"}
      </Button>
    </form>
  );
}
