import { getDocumentById } from "../../functions";

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
