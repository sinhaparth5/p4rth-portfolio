export default function CTAButtons() {
    return (
      <>
        <a
          href="#about"
          className="mt-12 px-8 py-3 rounded-full text-lg
                   bg-gradient-to-r from-purple-600 to-cyan-600
                   hover:from-purple-500 hover:to-cyan-500
                   transition-all duration-300 transform hover:scale-105
                   shadow-lg hover:shadow-purple-500/25
                   animate-fade-in"
          style={{ animationDelay: '1000ms' }}
        >
          Explore My Work
        </a>
        <a
          href="#contact"
          className="mt-4 px-8 py-3 rounded-full text-lg
                   border-2 border-purple-500/50 hover:border-cyan-500/50
                   transition-all duration-300 transform hover:scale-105
                   shadow-lg hover:shadow-purple-500/25
                   animate-fade-in backdrop-blur-sm"
          style={{ animationDelay: '1200ms' }}
        >
          Get in Touch
        </a>
      </>
    );
  }