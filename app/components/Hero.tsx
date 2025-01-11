interface HeroProps {
    title: string;
    description: string;
  }
  
  export default function Hero({ title, description }: HeroProps) {
    return (
      <div className="animate-float">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500">
          {title}
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 max-w-2xl text-gray-300">
          {description}
        </p>
      </div>
    );
  }