import { z } from 'zod'
import Filter from 'badwords-ko'

const filter = new Filter() // 한국어 비속어 필터

const ALLOWED = /^[가-힣a-zA-Z0-9_-]+$/ // 공백 X, _, - 허용

export const tagSchema = z
  .string()
  .trim()
  .min(2, '태그는 2자 이상이어야 합니다.')
  .max(20, '태그는 20자 이하여야 합니다.')
  .regex(ALLOWED, '한글/영문/숫자 및 특수문자는 _ - 만 사용할 수 있습니다.')

export const checkTagValidity = (raw: string) => {
  const result = tagSchema.safeParse(raw)
  if (!result.success)
    return result.error.issues[0]?.message ?? '입력이 올바르지 않습니다.'
  if (filter.isProfane(result.data)) return '부적절한 단어가 포함되어 있습니다.'
  return null // 통과
}
