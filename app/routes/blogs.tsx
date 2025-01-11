import { json, useLoaderData } from "@remix-run/react";
import { getMediumArticles } from "~/services/medium.server";
import { Link } from "@remix-run/react";
import { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
    return [
        { title: "Blogs" },
        { name: "description", content: "This is blogs for Medium articles" }
    ]
}

interface LoaderData {
    articles: Array<{
        title: string;
        link: string;
        pubDate: string;
        formattedDate: string;
        categories: string[];
    }>;
}

export const loader = async () => {
    const username = "parth-sinha";
    const articles = await getMediumArticles(username);

    return json<LoaderData> (
        { articles },
        {
            headers: {
                "Cache-Control": "public, max-age=3600"
            }
        }
    );
};

export default function BlogRoute() {
    const { articles } = useLoaderData<typeof loader>();
    const hasArticles = articles.length > 0;

    return (
        <main className="psContainer">
            <div className="psBlogCon">
                <div className="psBlogConInner">
                    <h1 className="psHeaderText">Medium Articles</h1>

                    { hasArticles ? (
                        <div className="psGrid">
                            { articles.map(article => (
                                <article key={article.link} className="psGridCard">
                                    <Link to={article.link} target="_blank" rel="noopener noreferrer" className="block p-6 h-full group" aria-label={`Read ${article.title}`}>
                                        <h2 className="psCardName">{article.title}</h2>
                                        <time dateTime={ article.pubDate } className="psCardDate">{ article.formattedDate }</time>
                                        {article.categories.length > 0 && (
                                            <div className="psCardXT">
                                                {article.categories.map(category => (
                                                    <span key={category} className="psCardTags">{category}</span>
                                                ))}
                                            </div>
                                        )}
                                    </Link>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <div className="psNoRepo">
                            <p className="psNoRepoText">
                                No articles found. Please check the username or try again later.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
