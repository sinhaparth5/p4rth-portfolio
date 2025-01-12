// app/components/CustomCursor.tsx
import { useEffect, useRef } from 'react';

const CursorSVG = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 64 64" 
    width="32" 
    height="32"
    className="transition-colors duration-300"
  >
    <linearGradient id="grad1" x1="179.636" x2="180.261" y1="-246.55" y2="-246.55" gradientTransform="matrix(22.2899 0 0 -22.2899 -3959.414 -5489.08)" gradientUnits="userSpaceOnUse" spreadMethod="reflect">
      <stop offset="0" stopColor="currentColor"/>
      <stop offset="1" stopColor="currentColor"/>
    </linearGradient>
    <path fill="url(#grad1)" d="M54.5,4L54.5,4C53.119,4,52,5.119,52,6.5S53.119,9,54.5,9h0C55.881,9,57,7.881,57,6.5S55.881,4,54.5,4"/>
    <linearGradient id="grad2" x1="200.658" x2="201.658" y1="-235.671" y2="-235.671" gradientTransform="matrix(-33.265 0 0 33.265 6707.387 7876.108)" gradientUnits="userSpaceOnUse" spreadMethod="reflect">
      <stop offset="0" stopColor="currentColor"/>
      <stop offset="1" stopColor="currentColor"/>
    </linearGradient>
    <path fill="url(#grad2)" d="M4.5,33C2.567,33,1,34.567,1,36.5C1,38.433,2.567,40,4.5,40C6.433,40,8,38.433,8,36.5C8,34.567,6.433,33,4.5,33"/>
    <radialGradient id="grad3" cx="33" cy="32.5" r="29.26" gradientUnits="userSpaceOnUse" spreadMethod="reflect">
      <stop offset="0" stopColor="currentColor"/>
      <stop offset=".642" stopColor="currentColor"/>
      <stop offset="1" stopColor="currentColor"/>
    </radialGradient>
    <path fill="url(#grad3)" d="M55,32h3.5c2.633,0,4.729-2.247,4.48-4.933C62.762,24.725,60.67,23,57.937,23l-3.278,0c-1.459,0-2.743-1.197-2.655-2.652c0.038-0.63,0.309-1.201,0.725-1.618C53.18,18.28,53.81,18,54.5,18l2.857,0c1.308,0,2.499-0.941,2.63-2.242C60.137,14.261,58.966,13,57.5,13H46c-1.105,0-2-0.895-2-2v0c0-1.105,0.895-2,2-2l1.357,0c1.308,0,2.499-0.941,2.63-2.242C50.137,5.261,48.966,4,47.5,4H24.78H16h-4.39C9.94,4,8.42,5.12,8.08,6.76C8.02,7.01,8,7.26,8,7.5C8,9.43,9.58,11,11.5,11l0.84,0c1.458,0,2.742,1.196,2.655,2.652c-0.038,0.63-0.309,1.201-0.725,1.618C13.82,15.72,13.19,16,12.5,16l-5.33,0c-2.089,0-3.955,1.529-4.152,3.609C2.792,21.995,4.661,24,7,24h9.112c2.209,0,4,1.791,4,4v0c0,2.209-1.791,4-4,4l-0.942,0c-2.089,0-3.955,1.529-4.152,3.609C10.792,37.995,12.661,40,15,40v0c1.057,0,2.015,0.77,2.104,1.823c0.053,0.619-0.173,1.189-0.582,1.587c-0.36,0.37-0.86,0.59-1.41,0.59l-4.895,0c-2.611,0-4.944,1.907-5.194,4.506C4.737,51.488,7.077,54,10,54l4,0c1.913,0,3.529,1.534,3.5,3.446C17.471,59.401,19.052,61,21,61h17.31h5.76H57c2.339,0,4.208-2.005,3.981-4.391C60.784,54.529,58.924,53,56.299,53l-4.602,0c-1.997,0-3.768-1.635-3.694-3.631c0.034-0.909,0.417-1.738,1.028-2.339C49.66,46.39,50.54,46,51.5,46l3.358,0c2.03,0,3.847-1.453,4.107-3.466c0.31-2.397-1.501-4.446-3.816-4.531c-1.56-0.057-2.975-1.137-3.133-2.69c-0.098-0.953,0.257-1.826,0.864-2.433C53.42,32.34,54.17,32,55,32z"/>
    <linearGradient id="grad4" x1="35" x2="35" y1="67.325" y2="15.325" gradientUnits="userSpaceOnUse" spreadMethod="reflect">
      <stop offset="0" stopColor="currentColor"/>
      <stop offset=".278" stopColor="currentColor"/>
      <stop offset=".569" stopColor="currentColor"/>
      <stop offset=".82" stopColor="currentColor"/>
      <stop offset="1" stopColor="currentColor"/>
    </linearGradient>
    <path fill="url(#grad4)" d="M49.758,29.538L25.643,7.075C23.117,4.706,19,6.509,19,9.984v33.089c0,2.83,2.886,4.728,5.461,3.592l6.672-3.126c0.98-0.424,2.118,0.007,2.577,0.976l5.159,11.052C39.598,57.103,41.119,58,42.703,58c0.817,0,1.651-0.239,2.402-0.75c1.752-1.19,2.283-3.56,1.372-5.48l-4.892-10.487c-0.486-1.025-0.028-2.251,1.009-2.699L48.667,36C51.233,34.868,51.809,31.46,49.758,29.538z"/>
  </svg>
);

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      cursor.style.transform = `translate(${clientX - 16}px, ${clientY - 16}px)`;
      
      // Change color on hovering over interactive elements
      const target = e.target as HTMLElement;
      if (target.closest('a') || target.closest('button')) {
        cursor.classList.add('text-red-500');
        cursor.classList.add('scale-110');
      } else {
        cursor.classList.remove('text-red-500');
        cursor.classList.remove('scale-110');
      }
    };

    // Hide default cursor
    document.body.style.cursor = 'none';
    document.addEventListener('mousemove', onMouseMove);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <div 
      ref={cursorRef}
      className="fixed pointer-events-none z-50 text-cyan-500 transition-all duration-150 ease-out"
    >
      <CursorSVG />
    </div>
  );
}