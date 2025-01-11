import Parser from "rss-parser";

export interface MediumArticle {
    title: string;
    link: string;
    pubDate: string;
    formattedDate: string;
    categories: string[];
}

const parser = new Parser();

export async function getMediumArticles(username: string): Promise<MediumArticle[]> {
    try {
        const feed = await parser.parseURL(`https://medium.com/feed/@${username}`);
        return feed.items.map(item => ({
            title: item.title || '',
            link: item.link || '',
            pubDate: item.pubDate || '',
            formattedDate: new Date(item.pubDate || '').toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            }),
            categories: item.categories || [],
        }));
    } catch (error) {
        console.error('Error fetching Medium articles:', error);
        return [];
    }
}