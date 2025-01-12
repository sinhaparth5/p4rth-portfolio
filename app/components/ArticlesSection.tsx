// app/components/ArticlesSection.tsx
import { Link } from "@remix-run/react";

interface MediumArticle {
  title: string;
  link: string;
  pubDate: string;
  formattedDate: string;
  categories: string[];
}

interface ArticlesSectionProps {
  articles: MediumArticle[];
}

export default function ArticlesSection({ articles }: ArticlesSectionProps) {
  return (
    <section className="relative py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent mb-4">
            Latest Articles
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Sharing insights and experiences in AI, machine learning, and software development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {articles.map((article) => (
            <div 
              key={article.link}
              className="group relative bg-black/40 backdrop-blur-sm rounded-xl overflow-hidden
                       border border-gray-800/50 p-6
                       transition-all duration-500 hover:border-pink-500/50 
                       hover:shadow-xl hover:shadow-pink-500/10"
            >

              {/* Title */}
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-pink-400 transition-colors line-clamp-2">
                {article.title}
              </h3>

              {/* Categories */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                {article.categories.map(category => (
                  <span 
                    key={category}
                    className="px-3 py-1 text-xs rounded-full bg-pink-500/20 text-pink-400 border border-pink-500/30"
                  >
                    {category}
                  </span>
                ))}
              </div>

              {/* Date & Read More */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-800/50">
                <span className="text-gray-500 text-sm">{article.formattedDate}</span>
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="text-pink-400 text-sm group-hover:text-pink-300 transition-colors"
                >
                  Read article →
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full
                     bg-gradient-to-r from-pink-600 to-blue-600 text-white font-semibold
                     transition-all duration-300 transform hover:scale-105
                     hover:from-pink-500 hover:to-blue-500 hover:shadow-lg 
                     hover:shadow-pink-500/25"
          >
            Read All Articles
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