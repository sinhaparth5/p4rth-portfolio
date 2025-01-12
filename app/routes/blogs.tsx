// app/routes/blogs.tsx
import { json, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useEffect, useRef } from "react";
import { getMediumArticles } from "~/services/medium.server";

// Meta information for the page
export const meta: MetaFunction = () => {
  return [
    { title: "Technical Articles | Parth Sinha" },
    { name: "description", content: "Explore articles about AI, ML, and software development" },
  ];
};

// Loader function to fetch articles
export const loader = async () => {
  const username = "parth-sinha";
  const articles = await getMediumArticles(username);

  return json(
    { articles },
    {
      headers: {
        "Cache-Control": "public, max-age=3600",
      },
    }
  );
};

export default function BlogRoute() {
  const { articles } = useLoaderData<typeof loader>();
  const headerRef = useRef<HTMLDivElement>(null);
  const articlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      (async () => {
        const gsap = (await import("gsap")).default;
  
        // Set initial state for header
        gsap.set(headerRef.current, { opacity: 0, y: -100 });
  
        // Get articles and ensure it's not undefined
        const articles = articlesRef.current?.querySelectorAll<HTMLElement>("article");
        if (articles && articles.length > 0) {
          gsap.set(articles, { opacity: 0, y: 100 });
  
          // Animate header
          gsap.to(headerRef.current, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power4.out",
          });
  
          // Animate articles
          gsap.to(articles, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
          });
        }
      })();
    }
  }, []);  

  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      {/* Header Section */}
      <div ref={headerRef} className="relative py-20 px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
          Technical Articles
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Exploring AI, Machine Learning, and Software Development
        </p>
      </div>

      {/* Articles Grid */}
      <div ref={articlesRef} className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <article
              key={article.link}
              className="bg-black/30 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800/50
                         transition-all duration-500 hover:border-purple-500/50 
                         hover:shadow-xl hover:shadow-purple-500/10
                         group"
            >
              <a
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-6 h-full"
              >

                {/* Title */}
                <h2 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                  {article.title}
                </h2>

                {/* Categories */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {article.categories.map((category) => (
                    <span
                      key={category}
                      className="px-3 py-1 text-xs rounded-full bg-purple-500/20 
                                   text-purple-300 border border-purple-500/30"
                    >
                      {category}
                    </span>
                  ))}
                </div>

                {/* Date */}
                <time dateTime={article.pubDate} className="text-sm text-gray-400 block mt-4">
                  {article.formattedDate}
                </time>

                {/* Read More Link */}
                <div className="mt-4 flex items-center text-purple-400 text-sm group-hover:text-purple-300 transition-colors">
                  Read article
                  <svg
                    className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
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
                </div>
              </a>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
