import { insertDocument } from "../../functions";

export async function POST(req: Request) {
  const reqBody = await req.json();
  const { title, body, tags, author, amazon_link, published } = reqBody;
  const articleData = {
    title,
    body,
    tags,
    author,
    amazon_link,
    published,
  };
  try {
    const response = await insertDocument("articles", articleData);
    return new Response(JSON.stringify(response), {
      status: 201,
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: error }), {
      status: 500,
    });
  }
}
