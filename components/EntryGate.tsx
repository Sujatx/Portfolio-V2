"use client";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function EntryGate() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const headingX = useTransform(mouseX, [-200, 200], [-25, 25]);
  const headingY = useTransform(mouseY, [-200, 200], [-20, 15]);
  const taglineX = useTransform(mouseX, [-200, 200], [-12, 12]);
  const taglineY = useTransform(mouseY, [-200, 200], [-10, 10]);

  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);
  const rippleIdRef = useRef(0);

  // Intro motion values
  const headingEntryY = useMotionValue(-200);
  const taglineEntryY = useMotionValue(-150);
  const surferEntryY = useMotionValue(500);

  // 🌌 Starfield scoped to entry
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    type Star = { x: number; y: number; z: number; speed: number };
    const numStars = 800;
    const stars: Star[] = [];

    const width = canvas.width;
    const height = canvas.height;

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: (Math.random() - 0.5) * width * 4,
        y: (Math.random() - 0.5) * height * 4,
        z: Math.random() * width,
        speed: 0.2 + Math.random() * 0.6, // slower, smoother
      });
    }

    const animateStars = () => {
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "white";
      for (let i = 0; i < numStars; i++) {
        const star = stars[i];
        star.z -= star.speed;

        if (star.z <= 0) {
          star.z = width;
          star.x = (Math.random() - 0.5) * width * 4;
          star.y = (Math.random() - 0.5) * height * 4;
          star.speed = 0.2 + Math.random() * 0.6;
        }

        const k = 128.0 / star.z;
        const sx = star.x * k + canvas.width / 2;
        const sy = star.y * k + canvas.height / 2;

        if (sx >= 0 && sx < canvas.width && sy >= 0 && sy < canvas.height) {
          ctx.fillRect(sx, sy, 1, 1); // pixel-sized stars
        }
      }

      requestAnimationFrame(animateStars);
    };

    animateStars();
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  // Cursor movement + ripples scoped to entry only
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      mouseX.set(e.clientX - rect.left - centerX);
      mouseY.set(e.clientY - rect.top - centerY);

      setRipples((prev) => [
        ...prev,
        { x: e.clientX - rect.left, y: e.clientY - rect.top, id: rippleIdRef.current++ },
      ]);
      setTimeout(() => setRipples((prev) => prev.slice(1)), 1000);
    };

    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Intro animations
  useEffect(() => {
    animate(headingEntryY, 0, { type: "spring", stiffness: 70, damping: 15, delay: 0.3 });
    animate(taglineEntryY, 0, { type: "spring", stiffness: 70, damping: 15, delay: 0.5 });
    animate(surferEntryY, 0, { type: "spring", stiffness: 70, damping: 15, delay: 0.7 });
  }, []);

  return (
    <div ref={containerRef} className="relative h-screen w-full overflow-hidden">
      {/* Canvas starfield */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" />

      {/* Floating text */}
      <div className="absolute inset-0 z-5 flex flex-col items-center justify-start pt-16 pointer-events-none">
        <motion.h1
          className="text-white text-6xl md:text-8xl font-bold select-none tracking-wider"
          style={{
            x: headingX,
            y: useTransform(headingEntryY, (val) => val + headingY.get()),
            fontFamily: "'DuneRise', sans-serif",
          }}
        >
          Sujat Khan
        </motion.h1>

        <motion.p
          className="text-gray-300 text-2xl md:text-3xl mt-2 select-none tracking-wide text-center"
          style={{
            x: taglineX,
            y: useTransform(taglineEntryY, (val) => val + taglineY.get()),
            fontFamily: "'DuneRise', sans-serif",
          }}
        >
          Full-stack Creator & Cinematic Developer
        </motion.p>
      </div>

      {/* Surfer rising */}
      <motion.div
        className="absolute inset-0 z-10 flex items-center justify-center"
        style={{ y: surferEntryY }}
      >
        <img
          src="/surfer.png"
          className="max-w-[120%] max-h-[120%] object-contain"
          alt="Silver Surfer"
        />
      </motion.div>

      {/* Cursor ripples */}
      {ripples.map((r) => (
        <motion.div
          key={r.id}
          className="absolute rounded-full border border-purple-400 opacity-50"
          style={{ width: 20, height: 20, top: r.y - 10, left: r.x - 10, zIndex: 20 }}
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 5, opacity: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}
