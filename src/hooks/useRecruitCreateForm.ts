import { useCallback, useMemo, useState } from 'react'
import { toIsoNoZ } from '@src/utils/datetime'

export interface RequiredForm {
  title: string
  content: string
  close_at: string | null
  expected_headcount: number | null
  study_group: number | null
}

interface Notify {
  success: (title: string, content: string) => void
  error: (title: string, content: string) => void
}

interface UseRecruitCreateFormOpts {
  notify: Notify
  onSuccess?: () => void
}

export function useRecruitCreateForm({
  notify,
  onSuccess,
}: UseRecruitCreateFormOpts) {
  const [form, setForm] = useState<RequiredForm>({
    title: '',
    content: '',
    close_at: null,
    expected_headcount: null,
    study_group: null,
  })

  const onTitleChange = useCallback((v: string) => {
    setForm((s) => ({ ...s, title: v }))
  }, [])

  const onStudyGroupIdChange = useCallback((id: number | null) => {
    setForm((s) => ({ ...s, study_group: id }))
  }, [])

  const onDeadlineChange = useCallback((d: Date | null) => {
    setForm((s) => ({ ...s, close_at: toIsoNoZ(d) }))
  }, [])

  const onExpectedHeadcountChange = useCallback((n: number | null) => {
    setForm((s) => ({ ...s, expected_headcount: n }))
  }, [])

  const onContentChange = useCallback((v: string) => {
    setForm((s) => ({ ...s, content: v }))
  }, [])

  const canSubmit = useMemo(() => {
    return (
      form.title.trim().length > 0 &&
      form.content.trim().length > 0 &&
      !!form.close_at &&
      typeof form.expected_headcount === 'number' &&
      form.expected_headcount >= 1 &&
      form.expected_headcount <= 10 &&
      typeof form.study_group === 'number'
    )
  }, [form])

  const validateAndToast = useCallback(() => {
    if (form.title.trim().length === 0) {
      notify.error('등록 실패', '공고 제목을 입력해 주세요.')
      return false
    }
    if (form.study_group == null) {
      notify.error('등록 실패', '대상 스터디 그룹을 선택해 주세요.')
      return false
    }
    if (!form.close_at) {
      notify.error('등록 실패', '마감 기한을 선택해 주세요.')
      return false
    }
    if (
      form.expected_headcount == null ||
      form.expected_headcount < 1 ||
      form.expected_headcount > 10
    ) {
      notify.error('등록 실패', '모집 인원을 세팅해주세요.')
      return false
    }
    if (form.content.trim().length === 0) {
      notify.error('등록 실패', '공고 내용을 입력해 주세요.')
      return false
    }
    return true
  }, [form, notify])

  const handleSubmit = useCallback(() => {
    if (!validateAndToast()) return
    notify.success('검증 통과', '공고 작성이 성공하였습니다.')
    onSuccess?.()
  }, [validateAndToast, notify, onSuccess])

  return {
    form,
    setForm,
    canSubmit,
    onTitleChange,
    onStudyGroupIdChange,
    onDeadlineChange,
    onExpectedHeadcountChange,
    onContentChange,
    handleSubmit,
  }
}
