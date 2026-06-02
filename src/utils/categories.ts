const CATEGORY_LABELS: Record<string, string> = {
  study: '学习笔记',
  bigdata: '大数据',
  spring: 'Spring',
  elasticsearch: 'Elasticsearch',
  kafka: 'Kafka',
};

export function getCategoryLabel(category?: string): string {
  if (!category) return '未分类';
  return CATEGORY_LABELS[category] ?? category;
}

/** 根据 slug 生成稳定的卡片渐变索引 0–3 */
export function getCardAccentIndex(slug: string): number {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash + slug.charCodeAt(i)) % 997;
  }
  return hash % 4;
}
