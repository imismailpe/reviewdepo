import { ObjectId } from "mongodb";

export type ArticleType = {
  id?: string;
  title: FormDataEntryValue | null;
  body: FormDataEntryValue | null;
  author: FormDataEntryValue | null;
  tags: string[];
  amazon_link: FormDataEntryValue | null;
  published?: boolean;
};

export type ResponseType = {
  data: any[];
  status: boolean;
};
