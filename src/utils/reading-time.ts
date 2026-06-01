/** 中文约 400 字/分钟，英文约 200 词/分钟 */
export function getReadingMinutes(body: string): number {
  const chineseChars = (body.match(/[\u4e00-\u9fff]/g) || []).length;
  const englishWords = (body.match(/[a-zA-Z]+/g) || []).length;
  return Math.max(1, Math.ceil(chineseChars / 400 + englishWords / 200));
}
