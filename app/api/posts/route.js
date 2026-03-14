import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Post from "@/models/Post";

export const dynamic = "force-dynamic";

export async function GET(request) {
  await dbConnect();

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status") || "new";

  const posts = await Post.find({ status }).sort({ createdAt: 1 });

  return NextResponse.json(posts);
}
