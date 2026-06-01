import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('posts');
  const sorted = posts.sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime()
  );

  return rss({
    title: "littlepug's blog",
    description: 'Java & Big Data 技术博客 — 专注 Spring / Elasticsearch / Kafka',
    site: context.site!,
    items: sorted.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.excerpt || post.data.title,
      link: `/${post.id.replace(/\.md$/, '')}/`,
    })),
    customData: `<language>zh-CN</language>`,
  });
}
