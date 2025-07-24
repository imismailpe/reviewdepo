import { getDocumentById, updateDocument } from "../../functions";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    //params should be awaited
    const { id } = await params;
    const response = await getDocumentById("articles", id);
    return new Response(JSON.stringify(response), {
      status: 200,
    });
  } catch (error) {
    console.log("inside /api/article/[id] get", error);
    return new Response(
      JSON.stringify({
        success: false,
        data: [],
      }),
      {
        status: 500,
      }
    );
  }
}
export async function POST(req: Request) {
  const body = await req.json();
  const { id, ...data } = body;
  try {
    const response = await updateDocument("articles", id, data);
    return new Response(JSON.stringify(response), {
      status: 200,
    });
  } catch (error) {
    console.log("inside /api/article/[id] post", error);
    return new Response(
      JSON.stringify({
        success: false,
        data: [],
      }),
      {
        status: 500,
      }
    );
  }
}
