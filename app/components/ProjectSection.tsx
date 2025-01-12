// app/components/ProjectsSection.tsx
import { Link } from "@remix-run/react";

interface Repository {
  id: number;
  name: string;
  description: string | null;
  url: string;
  homepage: string | null;
  stars: number;
  language: string | null;
  topics: string[];
  updatedAt: string;
}

interface ProjectsSectionProps {
  repositories: Repository[];
}

export default function ProjectsSection({ repositories }: ProjectsSectionProps) {
  return (
    <section className="relative py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            Featured Projects
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Check out my latest open source contributions and projects
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {repositories.map((repo) => (
            <div 
              key={repo.id}
              className="group relative bg-black/40 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800/50
                       transition-all duration-500 hover:border-purple-500/50 hover:shadow-xl 
                       hover:shadow-purple-500/10"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
                    {repo.name}
                  </h3>
                  {repo.stars > 0 && (
                    <div className="flex items-center gap-1 text-gray-400">
                      <svg 
                        className="w-4 h-4" 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {repo.stars}
                    </div>
                  )}
                </div>

                {repo.description && (
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {repo.description}
                  </p>
                )}

                <div className="flex flex-wrap gap-2 mb-4">
                  {repo.language && (
                    <span className="px-2 py-1 text-xs rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30">
                      {repo.language}
                    </span>
                  )}
                  {repo.topics.slice(0, 3).map(topic => (
                    <span 
                      key={topic}
                      className="px-2 py-1 text-xs rounded-full bg-gray-800/50 text-gray-300 border border-gray-700/50"
                    >
                      {topic}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-800/50">
                  <span className="text-gray-500 text-sm">{repo.updatedAt}</span>
                  <a 
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    View Repository →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r 
                     from-purple-600 to-cyan-600 text-white font-semibold
                     transition-all duration-300 transform hover:scale-105
                     hover:from-purple-500 hover:to-cyan-500 hover:shadow-lg 
                     hover:shadow-purple-500/25"
          >
            View All Projects
            <svg 
              className="w-5 h-5 transition-transform group-hover:translate-x-1"
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}