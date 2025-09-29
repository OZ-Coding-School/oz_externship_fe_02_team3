export function extractFirstImageFromMarkdown(
  md?: string | null
): string | null {
  if (!md) return null

  const mdRe = /!\[[^\]]*]\(\s*<?([^)\s>]+)>?(?:\s+"[^"]*")?\s*\)/
  const m1 = mdRe.exec(md)
  if (m1?.[1]) return m1[1]

  const htmlRe = /<img[^>]*src=["']([^"']+)["'][^>]*>/i
  const m2 = htmlRe.exec(md)
  if (m2?.[1]) return m2[1]

  return null
}
