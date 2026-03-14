#!/usr/bin/env node

/**
 * Seed posts into MongoDB.
 *
 * Usage:
 *   node scripts/seed-posts.js
 *
 * Posts are read from scripts/posts-data.json (gitignored).
 * Claude Code generates that file, then runs this script to insert posts.
 */

const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("Error: MONGODB_URI not found in .env.local");
  process.exit(1);
}

const DATA_FILE = path.join(__dirname, "posts-data.json");

if (!fs.existsSync(DATA_FILE)) {
  console.error("Error: scripts/posts-data.json not found.");
  console.error("Generate posts first, then run this script.");
  process.exit(1);
}

const posts = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));

if (!Array.isArray(posts) || posts.length === 0) {
  console.error("Error: posts-data.json is empty or not an array.");
  process.exit(1);
}

const PostSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    status: {
      type: String,
      enum: ["new", "saved", "archived"],
      default: "new",
    },
  },
  { timestamps: true }
);

const Post = mongoose.models.Post || mongoose.model("Post", PostSchema);

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB");

  const docs = posts.map((content) => ({ content, status: "new" }));
  const result = await Post.insertMany(docs);
  console.log(`Inserted ${result.length} posts`);

  await mongoose.disconnect();
  console.log("Done");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
