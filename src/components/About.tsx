"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

// interface ExplorerProps {
//   onComplete?: () => void; 
// }

export default function Explorer() {
  const [showConstellation, setShowConstellation] = useState(false);
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const [allVisited, setAllVisited] = useState(false);
  const [visitedNodes, setVisitedNodes] = useState<number[]>([]);

  // Core information
  const coreInfo = {
    name: "Nandan Patahk",
    title: "Frontend Developer",
    location: "India",
    brief:
      "I transform complex ideas into elegant, user-focused digital experiences. With expertise in React, TypeScript, and modern design systems, I build solutions that are both technically robust and aesthetically refined.",
  };

  // Detailed information nodes
  const infoNodes = [
    {
      title: "Technical Skills",
      description:
        "React, TypeScript, Next.js, Node.js, GraphQL, AWS, Tailwind CSS, Framer Motion, MongoDB, PostgreSQL. 1+ years of experience building responsive, accessible web applications.",
    },
    {
      title: "Experience Highlights",
      description:
        "Lead developer at TechFusion (2022-Present). Senior frontend engineer at WebCraft Solutions (2020-2022). UI Designer at Creative Digital (2018-2020). Contributed to projects for clients including Fortune 500 companies and innovative startups.",
    },
    {
      title: "Education & Learning",
      description:
        "B.Tech in Computer Science from ITM(SLS). Always expanding my knowledge through courses in emerging technologies and design methodologies.",
    },
    {
      title: "Approach & Philosophy",
      description:
        "I believe great digital products arise from the intersection of technical excellence, design thinking, and empathy for users. I approach each project with curiosity and a commitment to finding the optimal solution.",
    },
    {
      title: "Beyond Code",
      description:
        "When I'm not coding, you'll find me playing badminto, experimenting with photography, contributing to open source projects, and watching movies.",
    },
  ];

  const playNodeSound = () => {
    const audio = new Audio("/sounds/node-activate.mp3");
    audio.volume = 0.2;
    audio.play().catch((e) => console.log("Audio play failed:", e));
  };

  // Show constellation after delay
  useEffect(() => {
    const timer = setTimeout(() => setShowConstellation(true), 800);
    return () => clearTimeout(timer);
  }, []);

  // Check if all nodes are visited
  useEffect(() => {
    if (visitedNodes.length === infoNodes.length && !allVisited) {
      setAllVisited(true);
    }
  }, [visitedNodes, infoNodes.length, allVisited]);

  // Handle node click
  const handleNodeClick = (index: number) => {
    playNodeSound();
    setActiveNode(index === activeNode ? null : index); // Toggle off if clicked again
    if (!visitedNodes.includes(index)) {
      setVisitedNodes((prev) => [...prev, index]);
    }
  };

  // Scroll to next section
  const scrollToNextSection = () => {
    const nextSection = document.getElementById("next-section"); // Replace with actual ID
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Realistic constellation coordinates (adjusted for mobile and desktop)
  const nodePositions = [
    { x: 25, y: 15 }, // Top-left star
    { x: 65, y: 25 }, // Top-right star
    { x: 40, y: 45 }, // Middle-left star
    { x: 75, y: 60 }, // Middle-right star
    { x: 50, y: 80 }, // Bottom star (central anchor)
  ];

  // Animation variants
  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2 } },
  };

  const infoVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8, delay: 0.4 } },
  };

  const nodeVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: { duration: 0.6, delay: 0.8 + i * 0.15, ease: "easeOut" },
    }),
    active: {
      scale: 1.5,
      opacity: 1,
      boxShadow: "0 0 15px rgba(52, 211, 153, 0.8)",
      transition: { duration: 0.3 },
    },
    visited: {
      scale: 1.2,
      backgroundColor: "rgb(16, 185, 129)",
      boxShadow: "0 0 10px rgba(16, 185, 129, 0.7)",
      transition: { duration: 0.3 },
    },
  };

  const lineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => ({
      pathLength: 1,
      opacity: 0.6,
      transition: { duration: 1, delay: 1 + i * 0.15, ease: "easeInOut" },
    }),
  };

  const infoCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3 } },
  };

  const scrollIndicatorVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: [0, 1, 0.5],
      y: [0, 10, 0],
      transition: { duration: 2, repeat: Infinity, repeatType: "reverse" as const },
    },
  };

  // Constellation connections (more natural pattern)
  const constellationLines = [
    { start: 0, end: 2 }, // Top-left to middle-left
    { start: 1, end: 3 }, // Top-right to middle-right
    { start: 2, end: 4 }, // Middle-left to bottom
    { start: 3, end: 4 }, // Middle-right to bottom
    { start: 0, end: 1 }, // Top-left to top-right (cross-connection)
  ];

  return (
    <section
      id="explorer"
      className="min-h-[100dvh] pt-12 pb-16 flex flex-col items-center justify-start bg-black text-emerald-100 relative overflow-hidden"
    >
      {/* Cosmic background */}
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
              opacity: Math.random() * 0.7 + 0.3,
              animation: `twinkle ${Math.random() * 5 + 2}s infinite alternate`,
            }}
          />
        ))}
        <div
          className="absolute w-full h-full opacity-10"
          style={{
            background:
              "radial-gradient(circle at 70% 30%, rgba(16, 185, 129, 0.4) 0%, transparent 40%), radial-gradient(circle at 20% 70%, rgba(6, 182, 212, 0.3) 0%, transparent 30%)",
          }}
        />
      </div>

      {/* Core information */}
      <div className="w-full max-w-4xl px-4 sm:px-6 mb-8 relative z-10">
        <motion.div variants={headerVariants} initial="hidden" animate="visible" className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-emerald-300 mb-1">{coreInfo.name}</h1>
          <h2 className="text-xl md:text-2xl text-emerald-100 mb-2">{coreInfo.title}</h2>
          <p className="text-emerald-200/80">{coreInfo.location}</p>
        </motion.div>
        <motion.div
          variants={infoVariants}
          initial="hidden"
          animate="visible"
          className="bg-black/60 backdrop-blur-sm border border-emerald-500/20 rounded-lg p-5 shadow-lg mb-10"
        >
          <p className="text-lg leading-relaxed">{coreInfo.brief}</p>
        </motion.div>
      </div>

      {/* Chapter title */}
      <motion.h2
        className="text-2xl sm:text-3xl font-bold text-emerald-400 mb-6 relative z-10"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        Chapter I: The Explorer
      </motion.h2>

      {/* Instruction text */}
      <motion.p
        className="text-base sm:text-lg text-center mb-8 px-4 max-w-xl relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.7 }}
      >
        Navigate the constellation to discover more about my journey
      </motion.p>

      {/* Constellation */}
      <div className="relative w-full max-w-4xl h-64 sm:h-80 md:h-96 mb-6 z-20 px-4">
        {showConstellation && (
          <>
            <svg className="absolute inset-0 w-full h-full">
              {constellationLines.map((line, i) => {
                const start = nodePositions[line.start];
                const end = nodePositions[line.end];
                return (
                  <motion.line
                    key={`line-${i}`}
                    x1={`${start.x}%`}
                    y1={`${start.y}%`}
                    x2={`${end.x}%`}
                    y2={`${end.y}%`}
                    stroke="rgba(52, 211, 153, 0.6)"
                    strokeWidth="1.5"
                    variants={lineVariants}
                    initial="hidden"
                    animate="visible"
                    custom={i}
                  />
                );
              })}
            </svg>
            {nodePositions.map((pos, i) => (
              <motion.button
                key={`node-${i}`}
                className="absolute rounded-full bg-emerald-400 cursor-pointer hover:bg-emerald-300 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-opacity-50"
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  width: "24px",
                  height: "24px",
                  transform: "translate(-50%, -50%)",
                  boxShadow: "0 0 10px rgba(52, 211, 153, 0.5)",
                }}
                variants={nodeVariants}
                initial="hidden"
                animate={
                  activeNode === i
                    ? "active"
                    : visitedNodes.includes(i)
                    ? "visited"
                    : "visible"
                }
                custom={i}
                onClick={() => handleNodeClick(i)}
                aria-label={`View information about ${infoNodes[i].title}`}
              >
                <span className="absolute top-6 left-1/2 -translate-x-1/2 text-xs whitespace-nowrap opacity-70 pointer-events-none">
                  {infoNodes[i].title}
                </span>
              </motion.button>
            ))}
          </>
        )}
        {allVisited && (
          <motion.div
            className="absolute inset-0 z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.4, 0.2], transition: { duration: 2, times: [0, 0.5, 1] } }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: "radial-gradient(circle at center, rgba(52, 211, 153, 0.2) 0%, transparent 70%)",
              }}
            />
          </motion.div>
        )}
      </div>

      {/* Information panel */}
      <div className="relative z-30 w-full max-w-2xl px-4 h-48 sm:h-40">
        <AnimatePresence mode="wait">
          {activeNode !== null ? (
            <motion.div
              key={`info-${activeNode}`}
              className="bg-black/80 backdrop-blur-sm border border-emerald-500/30 rounded-lg p-5 shadow-lg shadow-emerald-900/30"
              variants={infoCardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <h3 className="text-lg font-semibold text-emerald-400 mb-2">{infoNodes[activeNode].title}</h3>
              <p className="text-emerald-100 text-sm sm:text-base">{infoNodes[activeNode].description}</p>
            </motion.div>
          ) : (
            showConstellation && (
              <motion.p
                className="text-center text-emerald-300/80 italic p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                Select a node to reveal more information...
              </motion.p>
            )
          )}
        </AnimatePresence>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-30 cursor-pointer"
        variants={scrollIndicatorVariants}
        initial="hidden"
        animate="visible"
        onClick={scrollToNextSection}
        whileHover={{ scale: 1.1 }}
      >
        <p className="text-sm text-emerald-300/80 mb-2">Continue exploring</p>
        <ChevronDown className="w-6 h-6 text-emerald-400" />
      </motion.div>

      <style jsx>{`
        @keyframes twinkle {
          0% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
          100% { opacity: 0.3; transform: scale(1); }
        }
      `}</style>
    </section>
  );
}