import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { site } from '../site.config';
import { getPublishedPosts, sortPostsByDateDesc } from '../utils/posts';

export async function GET(context) {
  const posts = sortPostsByDateDesc(getPublishedPosts(await getCollection('posts')));

  return rss({
    title: site.title,
    description: site.description,
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.excerpt || post.data.title,
      link: `/${post.id.replace(/\.md$/, '')}/`,
    })),
    customData: `<language>zh-CN</language>`,
  });
}
