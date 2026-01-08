"use client";
import { motion } from "framer-motion";

export default function ContactRoom() {
  return (
    <div className="relative h-screen flex flex-col items-center justify-center bg-black text-white overflow-hidden">
      {/* Heading */}
      <motion.h1
        className="text-5xl mb-12"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        Let's Connect
      </motion.h1>

      {/* Contact Buttons */}
      <div className="flex flex-col sm:flex-row gap-6 z-10">
        <motion.a
          href="mailto:your.email@example.com"
          className="bg-purple-600 px-8 py-4 rounded-xl text-white text-lg font-semibold hover:bg-purple-500 transition-colors"
          whileHover={{ scale: 1.05 }}
        >
          Email Me
        </motion.a>

        <motion.a
          href="https://github.com/yourusername"
          target="_blank"
          className="bg-gray-800 px-8 py-4 rounded-xl text-white text-lg font-semibold hover:bg-gray-700 transition-colors"
          whileHover={{ scale: 1.05 }}
        >
          GitHub
        </motion.a>

        <motion.a
          href="https://linkedin.com/in/yourusername"
          target="_blank"
          className="bg-blue-700 px-8 py-4 rounded-xl text-white text-lg font-semibold hover:bg-blue-600 transition-colors"
          whileHover={{ scale: 1.05 }}
        >
          LinkedIn
        </motion.a>
      </div>

      {/* Subtle fade-in footer text */}
      <motion.p
        className="absolute bottom-10 text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 1 }}
      >
        © 2025 Sujat Khan
      </motion.p>
    </div>
  );
}
