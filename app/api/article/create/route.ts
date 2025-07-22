import { insertDocument } from "../../functions";

export async function POST(req: Request) {
  const reqBody = await req.json();
  const { title, body, tags, author, amazon_link } = reqBody;
  const articleData = {
    title,
    body,
    tags,
    author,
    amazon_link,
    published: true,
  };
  try {
    const response = await insertDocument("articles", articleData);
    console.log("after create", response);
    return new Response(JSON.stringify(response), {
      status: 201,
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: error }), {
      status: 500,
    });
  }
}
