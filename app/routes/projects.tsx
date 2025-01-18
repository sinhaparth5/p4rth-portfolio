import { json, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getPublicRepositories } from "~/services/github.server";

interface Repository {
  id: number;
  name: string;
  description: string | null;
  url: string;
  stars: number;
  language: string | null;
  topics: string[];
  updatedAt: string;
}

interface LoaderData {
  repositories: Repository[];
}

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

  return json<LoaderData>(
    { repositories },
    {
      headers: {
        "Cache-Control": "public, max-age=3600",
      },
    }
  );
};

export default function ProjectsRoute() {
  const { repositories } = useLoaderData<LoaderData>();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const headerVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const buttonVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

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
    <motion.main
      className="min-h-screen bg-gradient-to-b from-black to-gray-900"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header Section */}
      <motion.div 
        className="relative py-20 px-4 text-center"
        variants={headerVariants}
      >
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-6">
          Featured Projects
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg mb-12">
          A collection of my work in AI, machine learning, and software development.
        </p>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category}
              variants={buttonVariants}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-cyan-500 text-white"
                  : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {filteredProjects.map((repo) => (
              <motion.article
                key={repo.id}
                variants={cardVariants}
                layout
                className="bg-black/30 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800/50 transition-all duration-500 hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/10 group"
                whileHover={{ y: -5 }}
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
                    <motion.a
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-2"
                      whileHover={{ x: 5 }}
                    >
                      View Project
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </motion.a>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>
        {filteredProjects.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-400 text-center"
          >
            No projects found in this category.
          </motion.p>
        )}
      </div>
    </motion.main>
  );
}