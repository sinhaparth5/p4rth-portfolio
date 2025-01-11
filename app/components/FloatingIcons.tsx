import { useEffect, useRef } from 'react';

// Import SVG files
import pythonIcon from '/icons/python-original.svg';
import AWSIcon from '/icons/amazonwebservices-original-wordmark.svg';
import angularIcon from '/icons/angular.svg';

const techIcons = [
  {
    name: 'Python Icon',
    src: pythonIcon,
    size: 40
  },
  {
    name: 'Angular Icon',
    src: angularIcon,
    size: 40
  },
  {
    name: 'AWS Icon',
    src: AWSIcon,
    size: 40
  },
];

const randomPosition = () => {
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    return { x, y };
  };
  
  export default function FloatingTechIcons() {
    const containerRef = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
      const icons = containerRef.current?.querySelectorAll('.tech-icon') || [];
      icons.forEach((icon) => {
        const pos = randomPosition();
        const element = icon as HTMLElement;
        element.style.left = `${pos.x}%`;
        element.style.top = `${pos.y}%`;
      });
    }, []);
  
    return (
      <div 
        ref={containerRef}
        className="fixed inset-0 pointer-events-none opacity-60 blur-xs z-[100]"
      >
        {techIcons.map((icon, index) => (
          <div
            key={icon.name}
            className="tech-icon absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{
              animation: `techFloat ${8 + Math.random() * 4}s ease-in-out infinite ${Math.random() * 2}s`,
              width: icon.size,
              height: icon.size,
            }}>
              <img src={icon.src} alt={icon.name} className='w-full h-full' />
            </div>
        ))}
      </div>
    );
}