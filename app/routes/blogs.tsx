import { json, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { motion } from "framer-motion";
import { getMediumArticles } from "~/services/medium.server";

interface Article {
  title: string;
  link: string;
  categories: string[];
  pubDate: string;
  formattedDate: string;
}

interface LoaderData {
  articles: Article[];
}

export const meta: MetaFunction = () => {
  return [
    { title: "Technical Articles | Parth Sinha" },
    { name: "description", content: "Explore articles about AI, ML, and software development" },
  ];
};

export const loader = async () => {
  const username = "parth-sinha";
  const articles = await getMediumArticles(username);

  return json<LoaderData>(
    { articles },
    {
      headers: {
        "Cache-Control": "public, max-age=3600",
      },
    }
  );
};

export default function BlogRoute() {
  const { articles } = useLoaderData<LoaderData>();

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

  const articleVariants = {
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
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
          Technical Articles
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Exploring AI, Machine Learning, and Software Development
        </p>
      </motion.div>

      {/* Articles Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
        >
          {articles.map((article) => (
            <motion.article
              key={article.link}
              variants={articleVariants}
              whileHover={{ y: -5 }}
              className="bg-black/30 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800/50
                       transition-all duration-500 hover:border-purple-500/50 
                       hover:shadow-xl hover:shadow-purple-500/10
                       group"
            >
              <motion.a
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-6 h-full"
                whileHover="hover"
              >
                <h2 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                  {article.title}
                </h2>

                <motion.div 
                  className="flex flex-wrap gap-2 mb-4"
                  variants={containerVariants}
                >
                  {article.categories.map((category) => (
                    <motion.span
                      key={category}
                      className="px-3 py-1 text-xs rounded-full bg-purple-500/20 
                               text-purple-300 border border-purple-500/30"
                      whileHover={{ scale: 1.05 }}
                    >
                      {category}
                    </motion.span>
                  ))}
                </motion.div>

                <time 
                  dateTime={article.pubDate} 
                  className="text-sm text-gray-400 block mt-4"
                >
                  {article.formattedDate}
                </time>

                <motion.div 
                  className="mt-4 flex items-center text-purple-400 text-sm group-hover:text-purple-300 transition-colors"
                  variants={{
                    hover: {
                      x: 5,
                      transition: {
                        type: "spring",
                        stiffness: 400,
                        damping: 10
                      }
                    }
                  }}
                >
                  Read article
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </motion.div>
              </motion.a>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </motion.main>
  );
}
