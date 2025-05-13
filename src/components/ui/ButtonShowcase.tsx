"use client";
import { useState } from "react";
import { Check, ChevronRight, Settings } from "lucide-react";

interface ButtonShowcaseProps {
  colorMode: "light" | "dark";
}

export default function ButtonShowcase({ colorMode }: ButtonShowcaseProps) {
  const [activeVariant, setActiveVariant] = useState<string>("primary");
  
  // Dynamic color classes based on color mode
  const getAccentColor = () => {
    return colorMode === "dark" 
      ? "from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600" 
      : "from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600";
  };
  
  const getPrimaryBgColor = () => {
    return colorMode === "dark" 
      ? "bg-cyan-500 hover:bg-cyan-600" 
      : "bg-indigo-600 hover:bg-indigo-700";
  };
  
  const getSecondaryBgColor = () => {
    return colorMode === "dark" 
      ? "bg-white/10 hover:bg-white/20" 
      : "bg-gray-100 hover:bg-gray-200";
  };
  
  const getTextColor = () => {
    return colorMode === "dark" ? "text-white" : "text-gray-800";
  };
  
  const getDangerColor = () => {
    return colorMode === "dark" 
      ? "bg-red-500/80 hover:bg-red-600" 
      : "bg-red-500 hover:bg-red-600";
  };
  
  const getWarningColor = () => {
    return colorMode === "dark" 
      ? "bg-amber-500/80 hover:bg-amber-600" 
      : "bg-amber-500 hover:bg-amber-600";
  };
  
  const getSuccessColor = () => {
    return colorMode === "dark" 
      ? "bg-emerald-500/80 hover:bg-emerald-600" 
      : "bg-emerald-500 hover:bg-emerald-600";
  };
  
  const getOutlineColor = () => {
    return colorMode === "dark" 
      ? "border-cyan-500 text-cyan-400 hover:bg-cyan-500/10" 
      : "border-indigo-500 text-indigo-600 hover:bg-indigo-50";
  };
  
  const getGhostColor = () => {
    return colorMode === "dark" 
      ? "bg-transparent hover:bg-white/5 text-white/80 hover:text-white" 
      : "bg-transparent hover:bg-gray-100 text-gray-600 hover:text-gray-800";
  };
  
  const getSectionBgColor = () => {
    return colorMode === "dark" ? "bg-white/5" : "bg-white";
  };
  
  const getBorderColor = () => {
    return colorMode === "dark" ? "border-white/10" : "border-gray-200";
  };

  const variants = [
    { id: "primary", name: "Primary" },
    { id: "secondary", name: "Secondary" },
    { id: "outline", name: "Outline" },
    { id: "state", name: "States" }
  ];

  const buttonVariants = {
    primary: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className={`text-base font-medium mb-4 ${getTextColor()}`}>Standard</h4>
          <div className="flex flex-wrap gap-4">
            <button className={`px-4 py-2 ${getPrimaryBgColor()} text-white rounded-lg transition-colors`}>
              Default
            </button>
            <button className={`px-4 py-2 bg-gradient-to-r ${getAccentColor()} text-white rounded-lg transition-all`}>
              Gradient
            </button>
            <button className={`px-4 py-2 ${getPrimaryBgColor()} text-white rounded-lg flex items-center gap-2 transition-colors`}>
              <ChevronRight size={16} />
              <span>With Icon</span>
            </button>
          </div>
        </div>
        
        <div>
          <h4 className={`text-base font-medium mb-4 ${getTextColor()}`}>Rounded</h4>
          <div className="flex flex-wrap gap-4">
            <button className={`px-4 py-2 ${getPrimaryBgColor()} text-white rounded-full transition-colors`}>
              Pill Button
            </button>
            <button className={`p-3 ${getPrimaryBgColor()} text-white rounded-full transition-colors`}>
              <Settings size={16} />
            </button>
            <button className={`px-4 py-2 ${getPrimaryBgColor()} text-white rounded-md transition-colors`}>
              Rounded
            </button>
          </div>
        </div>
        
        <div className="md:col-span-2">
          <h4 className={`text-base font-medium mb-4 ${getTextColor()}`}>Sizes</h4>
          <div className="flex flex-wrap items-center gap-4">
            <button className={`px-3 py-1 ${getPrimaryBgColor()} text-white text-xs rounded-lg transition-colors`}>
              Small
            </button>
            <button className={`px-4 py-2 ${getPrimaryBgColor()} text-white text-sm rounded-lg transition-colors`}>
              Medium
            </button>
            <button className={`px-6 py-3 ${getPrimaryBgColor()} text-white rounded-lg transition-colors`}>
              Large
            </button>
            <button className={`px-8 py-4 ${getPrimaryBgColor()} text-white text-lg font-medium rounded-lg transition-colors`}>
              X-Large
            </button>
          </div>
        </div>
      </div>
    ),
    
    secondary: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className={`text-base font-medium mb-4 ${getTextColor()}`}>Secondary</h4>
          <div className="flex flex-wrap gap-4">
            <button className={`px-4 py-2 ${getSecondaryBgColor()} ${colorMode === "dark" ? "text-white" : "text-gray-800"} rounded-lg transition-colors`}>
              Secondary
            </button>
            <button className={`px-4 py-2 ${getSecondaryBgColor()} ${colorMode === "dark" ? "text-white" : "text-gray-800"} rounded-md transition-colors flex items-center gap-2`}>
              <Settings size={16} />
              <span>With Icon</span>
            </button>
            <button className={`px-4 py-2 ${getSecondaryBgColor()} ${colorMode === "dark" ? "text-white" : "text-gray-800"} rounded-full transition-colors`}>
              Rounded
            </button>
          </div>
        </div>
        
        <div>
          <h4 className={`text-base font-medium mb-4 ${getTextColor()}`}>Ghost</h4>
          <div className="flex flex-wrap gap-4">
            <button className={`px-4 py-2 ${getGhostColor()} rounded-lg transition-colors`}>
              Ghost
            </button>
            <button className={`px-4 py-2 ${getGhostColor()} rounded-md transition-colors flex items-center gap-2`}>
              <Settings size={16} />
              <span>With Icon</span>
            </button>
            <button className={`px-4 py-2 ${getGhostColor()} rounded-full transition-colors`}>
              Rounded
            </button>
          </div>
        </div>
      </div>
    ),
    
    outline: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className={`text-base font-medium mb-4 ${getTextColor()}`}>Outline</h4>
          <div className="flex flex-wrap gap-4">
            <button className={`px-4 py-2 border ${getOutlineColor()} rounded-lg transition-colors`}>
              Outline
            </button>
            <button className={`px-4 py-2 border ${getOutlineColor()} rounded-md transition-colors flex items-center gap-2`}>
              <Settings size={16} />
              <span>With Icon</span>
            </button>
            <button className={`px-4 py-2 border ${getOutlineColor()} rounded-full transition-colors`}>
              Rounded
            </button>
          </div>
        </div>
        
        <div>
          <h4 className={`text-base font-medium mb-4 ${getTextColor()}`}>Dashed</h4>
          <div className="flex flex-wrap gap-4">
            <button className={`px-4 py-2 border border-dashed ${getOutlineColor()} rounded-lg transition-colors`}>
              Dashed
            </button>
            <button className={`px-4 py-2 border border-dashed ${getOutlineColor()} rounded-md transition-colors flex items-center gap-2`}>
              <Settings size={16} />
              <span>With Icon</span>
            </button>
            <button className={`px-4 py-2 border border-dashed ${getOutlineColor()} rounded-full transition-colors`}>
              Rounded
            </button>
          </div>
        </div>
      </div>
    ),
    
    state: (
      <div className="grid grid-cols-1 gap-6">
        <div>
          <h4 className={`text-base font-medium mb-4 ${getTextColor()}`}>States</h4>
          <div className="flex flex-wrap gap-4">
            <button className={`px-4 py-2 ${getDangerColor()} text-white rounded-lg transition-colors`}>
              Danger
            </button>
            <button className={`px-4 py-2 ${getWarningColor()} text-white rounded-lg transition-colors`}>
              Warning
            </button>
            <button className={`px-4 py-2 ${getSuccessColor()} text-white rounded-lg transition-colors`}>
              Success
            </button>
          </div>
        </div>
        
        <div>
          <h4 className={`text-base font-medium mb-4 ${getTextColor()}`}>Loading & Disabled</h4>
          <div className="flex flex-wrap gap-4">
            <button className={`px-4 py-2 ${getPrimaryBgColor()} text-white rounded-lg transition-colors opacity-70 cursor-not-allowed`} disabled>
              Disabled
            </button>
            <button className={`px-4 py-2 ${getPrimaryBgColor()} text-white rounded-lg transition-colors flex items-center gap-2`}>
              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Loading...</span>
            </button>
            <button className={`px-4 py-2 border ${colorMode === "dark" ? "border-white/20" : "border-gray-300"} text-gray-400 rounded-lg cursor-not-allowed`} disabled>
              Secondary Disabled
            </button>
          </div>
        </div>
        
        <div>
          <h4 className={`text-base font-medium mb-4 ${getTextColor()}`}>With Feedback</h4>
          <div className="flex flex-wrap gap-4">
            <button className={`px-4 py-2 ${getSuccessColor()} text-white rounded-lg transition-colors flex items-center gap-2`}>
              <Check size={16} />
              <span>Confirmed</span>
            </button>
            <button className={`px-4 py-2 ${getDangerColor()} text-white rounded-lg transition-colors`}>
              <span>Error</span>
            </button>
          </div>
        </div>
      </div>
    )
  };

  return (
    <div>
      {/* Variant selector */}
      <div className={`inline-flex rounded-lg p-1 ${getSectionBgColor()} ${getBorderColor()} mb-8`}>
        {variants.map((variant) => (
          <button
            key={variant.id}
            onClick={() => setActiveVariant(variant.id)}
            className={`px-4 py-2 text-sm rounded-md transition ${
              activeVariant === variant.id
                ? colorMode === "dark" 
                  ? "bg-cyan-500/20 text-cyan-300"
                  : "bg-indigo-100 text-indigo-700" 
                : colorMode === "dark"
                  ? "text-white/70 hover:text-white hover:bg-white/5" 
                  : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
            }`}
          >
            {variant.name}
          </button>
        ))}
      </div>

      {/* Display selected variant */}
      <div>
        {buttonVariants[activeVariant as keyof typeof buttonVariants]}
      </div>
    </div>
  );
}