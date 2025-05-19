// "use client";
// import { ReactNode, useEffect } from "react";

// interface SmoothScrollProps {
//   children: ReactNode;
// }

// const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
//   useEffect(() => {
//     // Enable smooth scrolling
//     document.documentElement.style.scrollBehavior = "smooth";
    
//     // Apply enhanced smooth scrolling with JS
//     const smoothScrollPolyfill = () => {
//       // If the browser doesn't support the scroll options
//       if (!('scrollBehavior' in document.documentElement.style)) {
//         // Get all anchor links
//         const anchorLinks = document.querySelectorAll('a[href^="#"]');
        
//         anchorLinks.forEach(link => {
//           link.addEventListener('click', function(e) {
//             e.preventDefault();
            
//             const targetId = this.getAttribute('href');
//             if (!targetId || targetId === '#') return;
            
//             const targetElement = document.querySelector(targetId);
//             if (!targetElement) return;
            
//             const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
//             const startPosition = window.pageYOffset;
//             const distance = targetPosition - startPosition;
//             const duration = 800; // milliseconds
//             let startTimestamp: number | null = null;
            
//             const ease = (t: number): number => {
//               return t < 0.5 
//                 ? 4 * t * t * t 
//                 : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1; // easeInOutCubic
//             };
            
//             const step = (timestamp: number) => {
//               if (!startTimestamp) startTimestamp = timestamp;
//               const elapsed = timestamp - startTimestamp;
//               const progress = Math.min(elapsed / duration, 1);
              
//               window.scrollTo(0, startPosition + distance * ease(progress));
              
//               if (elapsed < duration) {
//                 window.requestAnimationFrame(step);
//               }
//             };
            
//             window.requestAnimationFrame(step);
//           });
//         });
//       }
//     };
    
//     // Apply scroll restoration to maintain smooth navigation
//     if ('scrollRestoration' in history) {
//       history.scrollRestoration = 'manual';
//     }
    
//     // Initialize polyfill for browsers that don't support smooth scrolling
//     smoothScrollPolyfill();
    
//     return () => {
//       // Clean up
//       document.documentElement.style.scrollBehavior = "auto";
//       if ('scrollRestoration' in history) {
//         history.scrollRestoration = 'auto';
//       }
//     };
//   }, []);

//   return <>{children}</>;
// };

// export default SmoothScroll;