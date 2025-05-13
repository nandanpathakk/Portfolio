"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Palette, Layout, Layers, BellRing, Moon, Sun } from "lucide-react";
import ButtonShowcase from "./ui/ButtonShowcase";
// import CardShowcase from "./components/CardShowcase";
// import DialogShowcase from "./components/DialogShowcase";
// import NotificationShowcase from "./components/NotificationShowcase";
// import { ToastProvider } from "./components/ui/toast-context";

export default function ComponentBlocks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState("buttons");
  const [colorMode, setColorMode] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Toggle between light and dark mode
  const toggleColorMode = () => {
    setColorMode(colorMode === "dark" ? "light" : "dark");
  };

  const categories = [
    { id: "buttons", name: "Buttons", icon: <Palette size={18} /> },
    { id: "cards", name: "Cards", icon: <Layout size={18} /> },
    { id: "dialogs", name: "Dialogs", icon: <Layers size={18} /> },
    { id: "notifications", name: "Notifications", icon: <BellRing size={18} /> }
  ];

  // Component showcase containers based on categories
  const componentShowcases = {
    buttons: <ButtonShowcase colorMode={colorMode} />,
    // cards: <CardShowcase colorMode={colorMode} />,
    // dialogs: <DialogShowcase colorMode={colorMode} />,
    // notifications: <NotificationShowcase colorMode={colorMode} />
  };

  // Dynamically set background and text colors based on color mode
  const getBgColor = () => colorMode === "dark" ? "bg-black" : "bg-gray-50";
  const getTextColor = () => colorMode === "dark" ? "text-white" : "text-gray-900";
  const getBorderColor = () => colorMode === "dark" ? "border-white/10" : "border-gray-200";
  const getPanelBgColor = () => colorMode === "dark" ? "bg-white/5" : "bg-white";
  const getSecondaryTextColor = () => colorMode === "dark" ? "text-white/70" : "text-gray-600";

  return (
    // <ToastProvider>
      <section
        id="component-blocks"
        ref={sectionRef}
        className={`min-h-screen w-full ${getBgColor()} ${getTextColor()} relative overflow-hidden flex items-center justify-center py-20 transition-colors duration-300`}
      >
        {/* Grid background - depends on color mode */}
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute inset-0">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={`grid-x-${i}`}
                className={`absolute ${colorMode === "dark" ? "bg-cyan-400/20" : "bg-indigo-500/10"}`}
                style={{
                  height: "1px",
                  width: "100%",
                  top: `${(100 / 10) * i}%`,
                  boxShadow: colorMode === "dark" ? "0 0 8px rgba(34, 211, 238, 0.3)" : "0 0 8px rgba(99, 102, 241, 0.2)",
                }}
              />
            ))}
            
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={`grid-y-${i}`}
                className={`absolute ${colorMode === "dark" ? "bg-cyan-400/20" : "bg-indigo-500/10"}`}
                style={{
                  width: "1px",
                  height: "100%",
                  left: `${(100 / 10) * i}%`,
                  boxShadow: colorMode === "dark" ? "0 0 8px rgba(34, 211, 238, 0.3)" : "0 0 8px rgba(99, 102, 241, 0.2)",
                }}
              />
            ))}
          </div>
        </div>

        {/* Main content container */}
        <motion.div
          className="max-w-5xl w-full mx-auto px-6 relative z-10"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={isVisible ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-10"
          >
            <h2 className={`text-3xl md:text-4xl font-light italic mb-4 ${getTextColor()}`}>
              UI Building Blocks
            </h2>
            <p className={`${getSecondaryTextColor()} max-w-2xl mx-auto`}>
              A showcase of modular UI components I craft with precision and care, 
              ready to be assembled into seamless digital experiences.
            </p>
          </motion.div>

          {/* Mode switcher */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex justify-center mb-8"
          >
            <button
              onClick={toggleColorMode}
              className={`flex items-center gap-2 py-2 px-4 rounded-full border ${
                colorMode === "dark" 
                  ? "border-white/20 hover:bg-white/10" 
                  : "border-gray-300 hover:bg-gray-100"
              } transition-colors`}
            >
              {colorMode === "dark" ? (
                <>
                  <Sun size={16} />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <Moon size={16} />
                  <span>Dark Mode</span>
                </>
              )}
            </button>
          </motion.div>

          {/* Component categories */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={isVisible ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex justify-center flex-wrap gap-3 mb-12"
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`py-2 px-4 rounded-lg border flex items-center gap-2 transition-all ${
                  colorMode === "dark"
                    ? activeCategory === category.id
                      ? "bg-white/10 border-cyan-400/50 text-cyan-300 shadow-lg shadow-cyan-900/20"
                      : "bg-black/20 border-white/10 text-white/70 hover:bg-white/5"
                    : activeCategory === category.id
                      ? "bg-indigo-50 border-indigo-300 text-indigo-600 shadow-sm"
                      : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                {category.icon}
                <span>{category.name}</span>
              </button>
            ))}
          </motion.div>

          {/* Component showcase */}
          <motion.div
            key={`${activeCategory}-${colorMode}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className={`${getPanelBgColor()} backdrop-blur-sm border ${getBorderColor()} rounded-2xl p-6 md:p-10`}
          >
            {componentShowcases[activeCategory as keyof typeof componentShowcases]}
          </motion.div>
          
          {/* Documentation hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="mt-12 text-center"
          >
            <p className={`${colorMode === "dark" ? "text-white/60" : "text-gray-500"} text-sm`}>
              All components are built with React, TypeScript, and Tailwind CSS following best practices.
              Each is fully customizable with support for both light and dark modes.
            </p>
          </motion.div>
        </motion.div>
      </section>
    // </ToastProvider>
  );
}