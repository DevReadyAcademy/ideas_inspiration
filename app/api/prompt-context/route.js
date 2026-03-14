import dbConnect from "@/lib/mongodb";
import PromptContext from "@/models/PromptContext";

export const dynamic = "force-dynamic";

export async function GET() {
  await dbConnect();
  const doc = await PromptContext.findOne().sort({ updatedAt: -1 });

  if (!doc) {
    return Response.json({ error: "No prompt context found" }, { status: 404 });
  }

  return Response.json(doc);
}
