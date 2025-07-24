export type ArticleType = {
  _id?: number;
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
