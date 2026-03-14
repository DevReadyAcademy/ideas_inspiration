"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import PostCard from "./PostCard";

const SWIPE_THRESHOLD = 100;

export default function SwipeCard({ post, onSwipe, isTop }) {
  const x = useMotionValue(0);

  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const greenOpacity = useTransform(x, [0, SWIPE_THRESHOLD], [0, 1]);
  const redOpacity = useTransform(x, [-SWIPE_THRESHOLD, 0], [1, 0]);

  function handleDragEnd(_, info) {
    if (info.offset.x > SWIPE_THRESHOLD) {
      animate(x, 500, { duration: 0.3 });
      setTimeout(() => onSwipe("saved"), 300);
    } else if (info.offset.x < -SWIPE_THRESHOLD) {
      animate(x, -500, { duration: 0.3 });
      setTimeout(() => onSwipe("archived"), 300);
    } else {
      animate(x, 0, { type: "spring", stiffness: 500, damping: 30 });
    }
  }

  if (!isTop) {
    return (
      <div className="absolute w-full flex justify-center" style={{ transform: "scale(0.95)", opacity: 0.5 }}>
        <PostCard post={post} />
      </div>
    );
  }

  return (
    <motion.div
      className="absolute w-full flex justify-center cursor-grab active:cursor-grabbing"
      style={{ x, rotate }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
    >
      {/* Green overlay - swipe right */}
      <motion.div
        className="absolute inset-0 rounded-2xl border-4 border-green-400 bg-green-50/30 pointer-events-none z-10"
        style={{ opacity: greenOpacity }}
      />
      {/* Red overlay - swipe left */}
      <motion.div
        className="absolute inset-0 rounded-2xl border-4 border-red-400 bg-red-50/30 pointer-events-none z-10"
        style={{ opacity: redOpacity }}
      />
      <PostCard post={post} />
    </motion.div>
  );
}
