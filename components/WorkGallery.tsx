"use client";
import { useRef } from "react";
import Image from "next/image";
import ScrollStack, { ScrollStackItem } from "./ScrollStack";

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
  return (
    <div id="work" className="bg-black text-white relative">

      {/* === DESKTOP: SCROLL STACK === */}
      <section className="hidden md:block min-h-screen">
        <div className="pt-20 px-20 text-center mb-4 relative z-10 pointer-events-none">
          <h1 className="text-7xl font-bold leading-tight">
            Selected <span className="text-purple-500">Works</span>
          </h1>
          <p className="mt-6 text-gray-400 text-xl">
            A curated collection of digital experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-10 pt-10 pb-20 max-w-[1800px] mx-auto">
          {projects.map((project, i) => (
            <div key={i} className="aspect-square w-full rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-800 relative group">
              <ProjectCardContent project={project} />
            </div>
          ))}
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

// === DESKTOP CARD CONTENT ===
function ProjectCardContent({ project }: { project: any }) {
  return (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block w-full h-full cursor-pointer flex flex-col bg-neutral-900"
    >
      {/* Image Section - Top Half */}
      <div className="relative h-1/2 w-full overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Subtle overlay on image to ensure separation */}
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
      </div>

      {/* Content Section - Bottom Half */}
      <div className="h-1/2 w-full p-6 md:p-8 flex flex-col">
        <h2 className="text-3xl font-bold mb-1 text-white leading-tight">{project.title}</h2>
        <p className="text-purple-400 text-lg mb-4 font-medium">{project.subtitle}</p>

        <p className="text-gray-400 mb-6 text-sm line-clamp-3">
          {project.description}
        </p>

        <div className="flex gap-2 flex-wrap mt-auto">
          {project.techStack.map((t: string, i: number) => (
            <span
              key={i}
              className="text-xs px-3 py-1 bg-neutral-800 rounded-md border border-neutral-700 text-gray-300"
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
