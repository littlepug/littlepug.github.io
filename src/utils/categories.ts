/** 分类 slug（frontmatter 里填写）→ 中文展示名 */
export const CATEGORY_META: Record<
  string,
  { label: string; description: string }
> = {
  briefing: {
    label: '行业快讯',
    description: 'AI、大模型与科技行业的动态、解读与短讯',
  },
  curated: {
    label: '技术精选',
    description: '精选文章、开源项目、工具与阅读清单整理',
  },
  study: {
    label: '学习笔记',
    description: '框架原理、集群搭建与实战操作记录',
  },
  bigdata: {
    label: '大数据',
    description: 'Elasticsearch、Kafka 等大数据组件相关',
  },
  spring: { label: 'Spring', description: 'Spring 生态' },
  elasticsearch: { label: 'Elasticsearch', description: 'Elasticsearch 相关' },
  kafka: { label: 'Kafka', description: 'Kafka 相关' },
};

export function getCategoryLabel(category?: string): string {
  if (!category) return '未分类';
  return CATEGORY_META[category]?.label ?? category;
}

export function getCategoryDescription(category: string): string {
  return CATEGORY_META[category]?.description ?? '';
}

/** 有文章使用的分类列表（按展示名排序） */
export function getKnownCategories(): string[] {
  return Object.keys(CATEGORY_META);
}

/** 根据 slug 生成稳定的卡片渐变索引 0–3 */
export function getCardAccentIndex(slug: string): number {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash + slug.charCodeAt(i)) % 997;
  }
  return hash % 4;
}
