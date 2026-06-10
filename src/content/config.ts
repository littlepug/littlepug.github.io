import { defineCollection, z } from 'astro:content';

const postsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    /** briefing | curated | draft | study 等，见 src/utils/categories.ts */
    categories: z.string().optional(),
    /** true 时同 draft 分类：不进入首页/归档/RSS，可通过链接预览 */
    draft: z.boolean().optional(),
    tags: z.array(z.string()).optional(),
    keywords: z.string().optional(),
    excerpt: z.string().optional(),
    cover: z.string().optional(),
  }),
});

export const collections = {
  posts: postsCollection,
};
