"use client";

export default function PostCard({ post }) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md h-[60vh] max-h-[600px] min-h-[300px] flex flex-col">
      <div className="flex-1 overflow-y-auto">
        <p className="text-gray-800 text-base leading-relaxed whitespace-pre-wrap">
          {post.content}
        </p>
      </div>
      <div className="mt-4 pt-3 border-t border-gray-100">
        <p className="text-xs text-gray-400">
          {new Date(post.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </div>
    </div>
  );
}
