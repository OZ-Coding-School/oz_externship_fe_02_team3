export const RECRUIT_PAGE_SIZE = 10

export const RECRUIT_EDIT_TOAST = {
  success: { title: '수정 완료', content: '공고가 성공적으로 수정되었습니다.' },
  error: {
    title: '수정 실패',
    content: '수정 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
  },
  invalid: { title: '입력값을 확인해주세요' },
} as const

export const RECRUIT_EDIT_VALIDATION = {
  title: '공고 제목을 입력해주세요.',
  group: '대상 스터디 그룹을 선택해주세요.',
  capacity: '예상 모집 인원을 선택해주세요.',
  deadline: '공고 마감 기한을 선택해주세요.',
  content: '공고 내용을 입력해주세요.',
} as const

export const ONLY_NUMBER_RE = /[^0-9]/g

export const MD_MAX_IMAGES = 5

export const MD_PLACEHOLDER =
  '# 스터디 소개\nReact 실무 프로젝트를 함께 진행할 팀원을 모집합니다!\n\n## 스터디 내용\n- React 기초부터 실무 적용까지\n- 실제 프로젝트 개발 경험\n- 코드 리뷰 및 피드백'
