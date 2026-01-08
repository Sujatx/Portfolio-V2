"use client";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState, useEffect } from "react";

const projects = [
  { title: "Project 1", description: "Immersive Web Experience" },
  { title: "Project 2", description: "Animated Gallery" },
  { title: "Project 3", description: "Cinematic Portfolio" },
  { title: "Project 4", description: "Creative Coding" },
];

export default function WorkGallery() {
  const [shapes, setShapes] = useState<number[]>([]);

  useEffect(() => {
    setShapes(Array.from({ length: 15 }));
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-black text-white py-20 overflow-hidden">
      <h1 className="text-5xl mb-16 z-10 relative">My Work</h1>



      {/* Project Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-8 z-10 relative">
        {projects.map((proj, i) => (
          <MouseParallaxCard key={i} title={proj.title} description={proj.description} />
        ))}
      </div>
    </div>
  );
}

// 3D Parallax Card Component
function MouseParallaxCard({ title, description }: { title: string; description: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-50, 50], [15, -15]);
  const rotateY = useTransform(x, [-50, 50], [-15, 15]);

  return (
    <motion.div
      className="bg-gray-900 rounded-2xl p-6 shadow-lg cursor-pointer"
      style={{ rotateX, rotateY, perspective: 600 }}
      onMouseMove={(e) => {
        const rect = (e.target as HTMLDivElement).getBoundingClientRect();
        x.set(e.clientX - rect.left - rect.width / 2);
        y.set(e.clientY - rect.top - rect.height / 2);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      <h2 className="text-2xl mb-2">{title}</h2>
      <p className="text-sm text-gray-300">{description}</p>
    </motion.div>
  );
}
