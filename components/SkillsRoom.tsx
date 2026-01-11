"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const skills = [
  { name: "JavaScript", level: 90 },
  { name: "React / Next.js", level: 85 },
  { name: "CSS / Tailwind", level: 80 },
  { name: "Framer Motion", level: 75 },
  { name: "3D / Animation", level: 70 },
];

export default function SkillsRoom() {
  const [shapes, setShapes] = useState<number[]>([]);

  useEffect(() => {
    setShapes(Array.from({ length: 12 }));
  }, []);

  return (
    <div className="relative h-screen flex flex-col items-center justify-center bg-black text-white overflow-hidden">


      <h1 className="text-5xl mb-16 z-10 relative">Skills & Tech</h1>

      {/* Skill Bars */}
      <div className="w-3/4 max-w-4xl space-y-6 z-10 relative">
        {skills.map((skill, i) => (
          <div key={i} className="flex flex-col">
            <span className="text-lg mb-1">{skill.name}</span>
            <motion.div
              className="h-4 bg-purple-600 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.level}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
