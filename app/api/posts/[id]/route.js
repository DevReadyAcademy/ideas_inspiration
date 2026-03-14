import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Post from "@/models/Post";

export async function PATCH(request, { params }) {
  await dbConnect();

  const { id } = params;
  const body = await request.json();

  if (!["new", "saved", "archived"].includes(body.status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const post = await Post.findByIdAndUpdate(id, { status: body.status }, { new: true });

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  return NextResponse.json(post);
}
