export type ArticleType = {
  id: number;
  title: string;
  body: string;
  tags: string[];
  author: string;
  amazon_link: string;
};

export type ResponseType = {
  data: any[];
  status: number;
};
