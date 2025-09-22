const IMG_DONE_RE = /!\[[^\]]*]\((?:https?:|data:|blob:)[^)]+\)/g

const IMG_UPLOADING_RE = /!\[Uploading [^\]]*]\(\)/g

export function countMdImages(md: string, includeUploading = false): number {
  const done = (md.match(IMG_DONE_RE) ?? []).length
  if (!includeUploading) return done
  const uploading = (md.match(IMG_UPLOADING_RE) ?? []).length
  return done + uploading
}

export function takeUntilMax<T>(arr: T[] | ArrayLike<T>, max: number): T[] {
  if (!max || max <= 0) return []
  const a = Array.from(arr as ArrayLike<T>)
  return a.slice(0, max)
}
