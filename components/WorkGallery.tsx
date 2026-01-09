"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const projects = [
  {
    image: "/Exray.png",
    title: "Ex-Ray",
    subtitle: "The Relationship X-Ray Tool",
    techStack: ["Python", "Javascript"],
    description:
      "Ex-Ray is a tiny open-source tool that scans your Instagram DMs and roasts your chat game.",
    link: "https://github.com/Sujatx/Ex-Ray/",
  },
  {
    image: "/ai.png",
    title: "AstroResearch Agent",
    subtitle: "Full-Stack AI Agent",
    techStack: ["Python", "JavaScript", "HTML", "CSS"],
    description:
      "A full-stack AI-powered tool that analyzes astrophysics topics, retrieves relevant research papers, performs domain-specific computations, and generates structured research-style reports.",
    link: "https://astroresearch-agent.vercel.app/",
  },
  {
    image: "/womanly.png",
    title: "Womanly",
    subtitle: "Next.js e-commerce platform",
    techStack: ["TypeScript", "JavaScript", "CSS", "Next.js"],
    description:
      "Womanly is a modern e-commerce platform built with Next.js, featuring a sleek design and smooth animations to enhance user experience.",
    link: "https://womanly-beryl.vercel.app/",
  },
];

export default function WorkGallery() {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Horizontal scroll logic: Moves from 1% to -65% as you scroll down
  // Adjust the -65% based on how many items you have to ensure the last one is visible
  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-65%"]);

  return (
    <div className="bg-black text-white">
      
      {/* === DESKTOP: HORIZONTAL SCROLL === */}
      <section ref={targetRef} className="relative h-[300vh] hidden md:block">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <motion.div style={{ x }} className="flex gap-12 px-20">
            
            {/* Intro Text Card */}
            <div className="flex flex-col justify-center min-w-[400px]">
              <h1 className="text-7xl font-bold leading-tight">
                Selected <br /> <span className="text-purple-500">Works</span>
              </h1>
              <p className="mt-6 text-gray-400 text-xl max-w-xs">
                A curated collection of digital experiences, tools, and experiments.
              </p>
              <div className="mt-8 h-1 w-20 bg-purple-500 rounded-full" />
            </div>

            {/* Project Cards */}
            {projects.map((project, i) => (
              <ProjectCard key={i} project={project} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* === MOBILE: VERTICAL LIST === */}
      <section className="md:hidden py-20 px-6 flex flex-col gap-12">
        <div className="mb-8">
          <h1 className="text-5xl font-bold leading-tight">
            Selected <br /> <span className="text-purple-500">Works</span>
          </h1>
        </div>
        {projects.map((project, i) => (
          <MobileProjectCard key={i} project={project} />
        ))}
      </section>

    </div>
  );
}

// === DESKTOP CARD ===
function ProjectCard({ project }: { project: any }) {
  return (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative h-[60vh] w-[600px] shrink-0 overflow-hidden rounded-3xl bg-neutral-900 border border-neutral-800 cursor-pointer"
    >
      {/* Image Background */}
      <div className="absolute inset-0">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-500" />
      </div>

      {/* Content Overlay */}
      <div className="absolute bottom-0 left-0 w-full p-10 bg-gradient-to-t from-black/95 via-black/70 to-transparent translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
        <h2 className="text-4xl font-bold mb-2 text-white">{project.title}</h2>
        <p className="text-purple-300 text-lg mb-4 font-medium">{project.subtitle}</p>
        
        <p className="text-gray-300 mb-6 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
          {project.description}
        </p>

        <div className="flex gap-2 flex-wrap">
          {project.techStack.map((t: string, i: number) => (
            <span
              key={i}
              className="text-xs px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/10 text-white"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}

// === MOBILE CARD ===
function MobileProjectCard({ project }: { project: any }) {
  return (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="block relative w-full overflow-hidden rounded-2xl bg-neutral-900 border border-neutral-800"
    >
      <div className="relative h-64 w-full">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-1">{project.title}</h2>
        <p className="text-purple-400 text-sm mb-3">{project.subtitle}</p>
        <p className="text-gray-400 text-sm mb-4">{project.description}</p>
        <div className="flex gap-2 flex-wrap">
          {project.techStack.map((t: string, i: number) => (
            <span
              key={i}
              className="text-xs px-2 py-1 bg-neutral-800 rounded-md border border-neutral-700 text-gray-300"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}
