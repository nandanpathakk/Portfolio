"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import "../app/globals.css"

export default function Explorer() {

  return (
    <section className="min-h-screen w-full bg-black text-white relative overflow-hidden flex items-center justify-center">
      {/* Subtle star background */}
      <div className="absolute inset-0 z-0">
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute rounded-full bg-white"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.2,
              animation: `twinkle ${Math.random() * 5 + 2}s infinite alternate`,
            }}
          />
        ))}
      </div>

      {/* Main container */}
      <div className="max-w-5xl w-full mx-auto px-6 py-16 relative z-10 flex flex-col items-center">
        <div className="flex flex-col items-center text-center max-w-2xl">
          {/* Profile image and name section */}
          <motion.div
            className="mb-8 flex flex-col items-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-white/10 mb-6">
              <Image
                src="/images/main1.jpg"
                alt="Nandan"
                className="w-full h-full object-cover"
                width={128}
                height={128}
                priority
              />
            </div>

            <h1 className="text-4xl md:text-5xl font-light italic text-white tracking-tight mb-2">
              Hello, I&apos;m Nandan
            </h1>
            {/* <p className="text-sm md:text-base text-white/70">
              — developer
            </p> */}
          </motion.div>

          {/* Introduction text */}
          <motion.div
            className="mb-12 text-base md:text-lg text-white/90 space-y-4 text-left"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <p>
              I&apos;m a <span className="font-medium">frontend-focused full-stack developer</span> passionate about building interactive and performant web experiences.
            </p>

            <p>
              I enjoy working with <span className="font-medium">modern web technologies</span> and exploring <span className="font-medium">best practices</span> in frontend development.
            </p>

            <p>
              Currently, I&apos;m deepening my expertise in <span className="font-medium">React, TypeScript, and backend integrations</span> while contributing to personal projects and open source.
            </p>

            <p>
              This space is where I share my learnings and thoughts as I grow as a developer.
            </p>
          </motion.div>


          {/* Interactive discovery element */}
          <motion.div
            className="w-full max-w-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
          </motion.div>

          {/* Social links */}
          {/* <motion.div
            className="mt-10 bg-white/5 backdrop-blur-sm rounded-full p-2 inline-flex items-center space-x-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <a href="#" className="p-2 text-white/70 hover:text-white transition-colors" aria-label="Home">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
            </a>
            <a href="#" className="p-2 text-white/70 hover:text-white transition-colors" aria-label="Resume">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </a>
            <a href="#" className="p-2 text-white/70 hover:text-white transition-colors" aria-label="GitHub">
              <Github size={20} />
            </a>
            <a href="#" className="p-2 text-white/70 hover:text-white transition-colors" aria-label="LinkedIn">
              <Linkedin size={20} />
            </a>
            <a href="#" className="p-2 text-white/70 hover:text-white transition-colors" aria-label="Twitter">
              <Twitter size={20} />
            </a>
          </motion.div> */}
        </div>

      </div>

      <style jsx>{`
        @keyframes twinkle {
          0% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.2); }
          100% { opacity: 0.2; transform: scale(1); }
        }
      `}</style>
    </section>
  );
}