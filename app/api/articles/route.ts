import { getAllDocuments } from "../functions";

export async function GET(req: Request, params: { string: { page: number } }) {
  // const { page } = await params;
  try {
    const response = await getAllDocuments("articles", {}, { title: 1 });
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
