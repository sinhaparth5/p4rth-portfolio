// app/routes/projects.tsx
import { json, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useEffect, useState, useRef } from "react";
import { getPublicRepositories } from "~/services/github.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Projects | Parth Sinha" },
    { name: "description", content: "Explore articles about AI, ML, and software development" },
  ];
};

const categories = ["All", "AI/ML", "Web", "Tools", "Libraries"];

export const loader = async () => {
  const username = "sinhaparth5";
  const repositories = await getPublicRepositories(username);

  return json(
    { repositories },
    {
      headers: {
        "Cache-Control": "public, max-age=3600",
      },
    }
  );
};

export default function ProjectsRoute() {
  const { repositories } = useLoaderData<typeof loader>();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const headerRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadGSAP = async () => {
      try {
        const { default: gsap } = await import("gsap");

        // Header animation on page load
        gsap.from(headerRef.current, {
          y: -100,
          opacity: 0,
          duration: 1,
          ease: "power4.out",
        });

        // Filter buttons animation on page load
        gsap.from(".filter-btn", {
          y: 50,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          delay: 0.5,
        });

        // Projects animation on page load (no scroll trigger)
        const projects = projectsRef.current?.querySelectorAll<HTMLElement>(".project-card");
        if (projects && projects.length > 0) {
          gsap.from(projects, {
            y: 100,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            onComplete: () => {
              // Ensure the opacity is set to 1 after the animation completes
              gsap.set(projects, { opacity: 1 });
            },
          });
        }
      } catch (error) {
        console.error("Error loading GSAP:", error);
      }
    };

    loadGSAP();
  }, []);

  const filteredProjects = selectedCategory === "All"
    ? repositories
    : repositories.filter((repo) =>
        repo.topics.includes(selectedCategory.toLowerCase()) ||
        repo.language?.toLowerCase() === selectedCategory.toLowerCase()
      );

  const formatDate = (date: string): string => {
    return new Date(date).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      {/* Header Section */}
      <div ref={headerRef} className="relative py-20 px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-6">
          Featured Projects
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg mb-12">
          A collection of my work in AI, machine learning, and software development.
        </p>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`filter-btn px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-cyan-500 text-white"
                  : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div ref={projectsRef} className="max-w-7xl mx-auto px-4 pb-20">
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((repo) => (
              <article
                key={repo.id}
                className="project-card bg-black/30 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800/50 transition-all duration-500 hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/10 group"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {repo.name}
                    </h2>
                    {repo.stars > 0 && (
                      <div className="flex items-center gap-1 text-gray-400">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
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
                      <span className="px-2 py-1 text-xs rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                        {repo.language}
                      </span>
                    )}
                    {repo.topics.slice(0, 3).map((topic) => (
                      <span
                        key={topic}
                        className="px-2 py-1 text-xs rounded-full bg-gray-800/50 text-gray-300 border border-gray-700/50"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-800/50">
                    <span className="text-gray-500 text-sm">{formatDate(repo.updatedAt)}</span>
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-2"
                    >
                      View Project
                      <svg
                        className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-center">No projects found in this category.</p>
        )}
      </div>
    </main>
  );
}
