export type ArticleType = {
  _id: number;
  title: string;
  body: string;
  tags: string[];
  author: string;
  amazon_link: string;
  published: boolean;
};

export type ResponseType = {
  data: any[];
  status: number;
};
