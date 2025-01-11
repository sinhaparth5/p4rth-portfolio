import { json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { ClientOnly } from "remix-utils/client-only";
import HomeScene from "~/components/HomeScene";

export const meta: MetaFunction = () => {
  return [
    { title: "P4rth" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async () => {
  return json({
    title: "AI & ML Developer",
    description: "Passionate about AI, Machine Learning, and CUDA Programming",
    skills: [
      "Machine Learning",
      "Deep Learning",
      "CUDA Programming",
      "Python",
      "TensorFlow",
      "PyTorch",
      "Computer Vision",
      "Natural Language Processing"
    ]
  });
};

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return (
    <main className="min-h-screen text-white relative overflow-hidden">
      {/* Animated background layers */}
      <div className="fixed inset-0 animated-bg" />
      <div className="fixed inset-0 bg-noise" />
      
      <ClientOnly fallback={<div className="fixed inset-0 bg-black" />}>
        {() => <HomeScene />}
      </ClientOnly>

      <div className="relative z-10">
        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
          <div className="animate-float">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500">
              {data.title}
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 max-w-2xl text-gray-300">
              {data.description}
            </p>
          </div>

          {/* Animated Skills */}
          <div className="flex flex-wrap justify-center gap-4 max-w-2xl">
            {data.skills.map((skill, index) => (
              <span
                key={skill}
                className="px-4 py-2 rounded-full text-sm md:text-base
                         bg-gradient-to-r from-purple-500/20 to-cyan-500/20
                         border border-purple-500/50 backdrop-blur-sm
                         animate-fade-in hover:scale-110 transition-transform"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {skill}
              </span>
            ))}
          </div>

          {/* CTA Button */}
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
              className="px-8 py-3 rounded-full text-lg
                       border-2 border-purple-500/50 hover:border-cyan-500/50
                       transition-all duration-300 transform hover:scale-105
                       shadow-lg hover:shadow-purple-500/25
                       animate-fade-in backdrop-blur-sm"
              style={{ animationDelay: '1200ms' }}
            >
              Get in Touch
            </a>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2
                        animate-bounce animate-fade-in"
               style={{ animationDelay: '1400ms' }}>
            <svg
              className="w-6 h-6 text-gray-300"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
      </div>
    </main>
  );
}

