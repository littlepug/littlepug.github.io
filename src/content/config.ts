import { defineCollection, z } from 'astro:content';

const postsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    /** briefing=行业快讯 | curated=技术精选 | study=学习笔记，见 src/utils/categories.ts */
    categories: z.string().optional(),
    tags: z.array(z.string()).optional(),
    keywords: z.string().optional(),
    excerpt: z.string().optional(),
    cover: z.string().optional(),
  }),
});

export const collections = {
  posts: postsCollection,
};
