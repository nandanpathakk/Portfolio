// ContactButton.tsx
"use client"
import React, { useState } from "react";
import { Mail } from "lucide-react";

interface ContactButtonProps {
  email?: string;
  subject?: string;
  className?: string;
}

export const ContactButton: React.FC<ContactButtonProps> = ({
  email = "your.email@example.com", // Replace with your actual email
  subject = "Hello from your portfolio!",
  className = "",
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleClick = () => {
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
  };

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative overflow-hidden rounded-full bg-gradient-to-r from-purple-600 to-blue-500 px-6 py-3 text-white shadow-lg transition-all duration-300 hover:shadow-xl ${className}`}
      aria-label="Contact me via email"
    >
      <div className="relative z-10 flex items-center justify-center gap-2 font-medium">
        <Mail 
          size={20} 
          className={`transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`}
        />
        <span className="font-bold">Contact Me</span>
      </div>
      
      {/* Pulsating background effect */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 opacity-75" />
        <div className="absolute inset-0 animate-pulse-slow bg-gradient-to-r from-blue-500 to-purple-600 blur-md" />
      </div>
      
      {/* Shine effect on hover */}
      <div
        className={`absolute inset-0 -z-5 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 transition-opacity duration-700 ${
          isHovered ? 'opacity-20' : ''
        }`}
        style={{
          transform: 'skewX(-20deg) translateX(-100%)',
          animation: isHovered ? 'shine 1s ease forwards' : 'none',
        }}
      />
      
      <style jsx>{`
        @keyframes shine {
          to {
            transform: skewX(-20deg) translateX(200%);
          }
        }
        
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 0.8;
          }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>
    </button>
  );
};