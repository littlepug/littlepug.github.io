import type { CollectionEntry } from 'astro:content';

type PostEntry = CollectionEntry<'posts'>;

/** 草稿：categories 为 draft，或 frontmatter 显式 draft: true */
export function isDraft(post: PostEntry): boolean {
  return post.data.categories === 'draft' || post.data.draft === true;
}

/** 公开列表用：排除草稿 */
export function getPublishedPosts(posts: PostEntry[]): PostEntry[] {
  return posts.filter((p) => !isDraft(p));
}

export function sortPostsByDateDesc(posts: PostEntry[]): PostEntry[] {
  return [...posts].sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}
