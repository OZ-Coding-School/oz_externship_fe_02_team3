export interface TagOption {
  id: number
  label: string
}

export const toNumberArray = (arr: Array<number | undefined>): number[] =>
  arr.filter((v): v is number => typeof v === 'number')

export const toTagOptions = (
  arr: Array<{ id: number | undefined; label: string }>
): TagOption[] => arr.filter((t): t is TagOption => typeof t.id === 'number')
