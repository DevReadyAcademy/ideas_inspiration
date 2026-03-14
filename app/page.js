"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import SwipeCard from "./components/SwipeCard";
import UndoButton from "./components/UndoButton";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastArchived, setLastArchived] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    setLoading(true);
    const res = await fetch("/api/posts?status=new");
    const data = await res.json();
    setPosts(data);
    setTotalCount(data.length);
    setCurrentIndex(0);
    setLastArchived(null);
    setLoading(false);
  }

  const updatePostStatus = useCallback(async (postId, status) => {
    await fetch(`/api/posts/${postId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
  }, []);

  function handleSwipe(status) {
    const post = posts[currentIndex];
    if (!post) return;

    updatePostStatus(post._id, status);

    if (status === "archived") {
      setLastArchived({ post, index: currentIndex });
    } else {
      setLastArchived(null);
    }

    setCurrentIndex((prev) => prev + 1);
  }

  async function handleUndo() {
    if (!lastArchived) return;

    await updatePostStatus(lastArchived.post._id, "new");

    setCurrentIndex(lastArchived.index);
    setLastArchived(null);
  }

  const remaining = posts.length - currentIndex;
  const reviewed = currentIndex;
  const currentPost = posts[currentIndex];
  const nextPost = posts[currentIndex + 1];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-400 text-lg">Loading posts...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-white border-b">
        <h1 className="text-xl font-bold text-gray-900">Post Swiper</h1>
        <div className="flex gap-2">
          <Link
            href="/prompt-context"
            className="px-4 py-2 text-sm font-medium text-purple-600 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
          >
            Prompt Context
          </Link>
          <Link
            href="/saved"
            className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
          >
            Saved Posts
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        {remaining > 0 ? (
          <>
            {/* Counter */}
            <p className="text-sm text-gray-500 mb-6">
              {reviewed + 1} of {totalCount} &middot; {remaining} remaining
            </p>

            {/* Card stack */}
            <div className="relative w-full max-w-md h-[60vh] max-h-[600px] min-h-[300px] flex items-center justify-center">
              {nextPost && <SwipeCard key={nextPost._id} post={nextPost} onSwipe={() => {}} isTop={false} />}
              {currentPost && (
                <SwipeCard key={currentPost._id} post={currentPost} onSwipe={handleSwipe} isTop={true} />
              )}
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-4 mt-8">
              <button
                onClick={() => handleSwipe("archived")}
                className="w-14 h-14 rounded-full bg-red-100 text-red-500 flex items-center justify-center text-2xl hover:bg-red-200 transition-colors"
                title="Archive"
              >
                &times;
              </button>

              <UndoButton onClick={handleUndo} disabled={!lastArchived} />

              <button
                onClick={() => handleSwipe("saved")}
                className="w-14 h-14 rounded-full bg-green-100 text-green-500 flex items-center justify-center text-2xl hover:bg-green-200 transition-colors"
                title="Save"
              >
                &#10003;
              </button>
            </div>
          </>
        ) : (
          <div className="text-center">
            <p className="text-2xl font-semibold text-gray-700 mb-2">No more posts to review</p>
            <p className="text-gray-400 mb-6">You&apos;ve reviewed all {totalCount} posts</p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/saved"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                View Saved Posts
              </Link>
              <button
                onClick={fetchPosts}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Refresh
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
