import type { LoaderFunction } from "@remix-run/node";

interface SitemapUrl {
    loc: string;
    lastmod: string;
    changefreq: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
    priority: string;
}

export const loader: LoaderFunction = async () => {
    const urls: SitemapUrl[] = [
        {
            loc: "https://parthsinha.com",
            lastmod: new Date().toISOString().split("T")[0],
            changefreq: "daily",
            priority: "1.0",
        },
        {
            loc: "https://parthsinha.com/blogs",
            lastmod: new Date().toISOString().split("T")[0],
            changefreq: "weekly",
            priority: "0.8"
        },
        {
            loc: "https://parthsinha.com/projects",
            lastmod: new Date().toISOString().split("T")[0],
            changefreq: "weekly",
            priority: "0.8"
        }
    ];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
        ${urls
            .map(
                (url) => `
                <url>
                    <loc>${url.loc}</loc>
                    <lastmod>${url.lastmod}</lastmod>
                    <changefreq>${url.changefreq}</changefreq>
                    <priority>${url.priority}</priority>
                </url>
                `
            )
            .join("")
        }
            </urlset>
    `;
    return new Response(sitemap, {
        headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=86400"
        }
    });
};