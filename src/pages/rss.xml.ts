import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { site } from '../site.config';

export async function GET(context) {
  const posts = await getCollection('posts');
  const sorted = posts.sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime()
  );

  return rss({
    title: site.title,
    description: site.description,
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
