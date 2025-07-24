import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { ArticleType } from "../app/article/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ArticleCard({
  article,
  fullPage,
}: {
  article: ArticleType;
  fullPage: boolean;
}) {
  return (
    <Card
      className={"shadow-sm p-0 pb-4 w-full bg-primary/30 dark:bg-primary/30"}
    >
      {fullPage ? (
        <CardHeader className="bg-primary p-4 rounded">
          <CardTitle className={fullPage ? "" : "line-clamp-2"}>
            {article.title as string}
          </CardTitle>
          <CardAction>
            <a href={`/article/${article._id}/edit`}>Edit</a>
          </CardAction>
          <CardDescription className="text-gray-200">
            {article.author as string}
          </CardDescription>
        </CardHeader>
      ) : (
        <Link href={`/article/${article._id}`}>
          <CardHeader className="bg-primary p-4 rounded">
            <CardTitle
              className={
                fullPage ? "text-gray-200" : "text-gray-200 line-clamp-2"
              }
            >
              {article.title as string}
            </CardTitle>
            <CardDescription className="text-gray-200">
              {article.author as string}
            </CardDescription>
          </CardHeader>
        </Link>
      )}
      <CardContent
        className={fullPage ? "whitespace-pre-line" : "line-clamp-6"}
      >
        {article.body as string}
      </CardContent>
      <CardFooter className="">
        <Button className="bg-amber-500 hover:bg-amber-400">
          <a href={article.amazon_link as string} target="_blank">
            Check on Amazon
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
