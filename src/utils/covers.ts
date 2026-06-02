/**
 * 分类默认封面（SVG 须为纯 ASCII，避免特殊字符导致浏览器无法渲染）
 */
export const DEFAULT_COVERS: Record<string, string> = {
  briefing: '/images/covers/briefing-default.svg',
  curated: '/images/covers/curated-default.svg',
};

export function resolveCover(cover?: string, category?: string): string | undefined {
  if (cover) return cover;
  if (category && DEFAULT_COVERS[category]) return DEFAULT_COVERS[category];
  return undefined;
}
