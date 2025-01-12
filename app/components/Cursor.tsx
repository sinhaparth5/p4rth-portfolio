// app/components/CustomCursor.tsx
import { useEffect, useRef } from 'react';

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
        cursor.classList.add('cursor-hover');
      } else {
        cursor.classList.remove('cursor-hover');
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
      className="fixed pointer-events-none z-50 transition-all duration-150 ease-out"
    >
      <img 
        src="/cursor/cursor.svg" 
        alt="" 
        className="w-8 h-8 transition-all duration-150 cursor-normal"
      />
    </div>
  );
}