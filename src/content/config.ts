import { defineCollection, z } from 'astro:content';

const postsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
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
