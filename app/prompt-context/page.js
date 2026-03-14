"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function PromptContextPage() {
  const [doc, setDoc] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPromptContext();
  }, []);

  async function fetchPromptContext() {
    setLoading(true);
    const res = await fetch("/api/prompt-context");
    if (res.ok) {
      const data = await res.json();
      setDoc(data);
    }
    setLoading(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-400 text-lg">Loading prompt context...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-white border-b">
        <h1 className="text-xl font-bold text-gray-900">Prompt Context</h1>
        <div className="flex gap-2">
          <Link
            href="/saved"
            className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
          >
            Saved Posts
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
        {!doc ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500 mb-4">No prompt context found</p>
            <p className="text-sm text-gray-400">Run the seed script to populate the prompt context.</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800">{doc.title}</h2>
              <span className="px-2 py-1 text-xs font-medium text-gray-500 bg-gray-100 rounded">
                View only
              </span>
            </div>
            <div className="prose prose-sm max-w-none">
              <pre className="whitespace-pre-wrap font-sans text-gray-700 leading-relaxed text-sm">
                {doc.content}
              </pre>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-400">
                Last updated:{" "}
                {new Date(doc.updatedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
