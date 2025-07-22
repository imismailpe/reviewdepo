export async function POST(req: Request, resp: Response) {
  const reqBody = await req.json();
  const { title, body, tags, author, amazon_link } = reqBody;
  return new Response(
    JSON.stringify({ success: true, message: "Article created" }),
    {
      status: 201,
    }
  );
}
