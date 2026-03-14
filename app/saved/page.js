"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function SavedPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    fetchSavedPosts();
  }, []);

  async function fetchSavedPosts() {
    setLoading(true);
    const res = await fetch("/api/posts?status=saved");
    const data = await res.json();
    setPosts(data);
    setLoading(false);
  }

  async function handleArchive(postId) {
    await fetch(`/api/posts/${postId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "archived" }),
    });
    setPosts((prev) => prev.filter((p) => p._id !== postId));
  }

  async function copyToClipboard(post) {
    await navigator.clipboard.writeText(post.content);
    setCopiedId(post._id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-400 text-lg">Loading saved posts...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-white border-b">
        <h1 className="text-xl font-bold text-gray-900">Saved Posts</h1>
        <div className="flex gap-2">
          <Link
            href="/prompt-context"
            className="px-4 py-2 text-sm font-medium text-purple-600 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
          >
            Prompt Context
          </Link>
          <Link
            href="/"
            className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Back to Swiper
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        {posts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500 mb-4">No saved posts yet</p>
            <Link href="/" className="text-blue-600 hover:text-blue-700">
              Go review some posts
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-gray-500 mb-4">{posts.length} saved post{posts.length !== 1 ? "s" : ""}</p>
            {posts.map((post) => (
              <div key={post._id} className="bg-white rounded-xl shadow-sm border p-6">
                <p className="text-gray-800 whitespace-pre-wrap leading-relaxed mb-4">
                  {post.content}
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <p className="text-xs text-gray-400">
                    {new Date(post.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => copyToClipboard(post)}
                      className="px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      {copiedId === post._id ? "Copied!" : "Copy"}
                    </button>
                    <button
                      onClick={() => handleArchive(post._id)}
                      className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      Archive
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
