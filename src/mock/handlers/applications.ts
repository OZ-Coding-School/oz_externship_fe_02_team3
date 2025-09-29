import { http, HttpResponse } from 'msw'
import {
  dummyApplicationsPage1,
  dummyApplicationDetailById,
} from '@src/mock/applicants'
import type {
  ApplicationsItem,
  ApplicantStatus,
  ApplicationDetail,
} from '@src/types/applicant'

// 원본 4개 기준
const base = dummyApplicationsPage1.results

// 목록 30개로 확장
const EXPAND = 30
export const listStore: ApplicationsItem[] = Array.from(
  { length: EXPAND },
  (_, i) => {
    const src = base[i % base.length]
    const id = i + 1
    return {
      ...src,
      application_id: id,
      applicant: {
        ...src.applicant,
        nickname: `${src.applicant.nickname}-${id}`,
      },
      applied_at: `2025-09-${String((i % 28) + 1).padStart(2, '0')}T1${i % 10}:00:00`,
    }
  }
)

// 디테일 정보도 추가로 넣기
const seedDetail = (i: number): ApplicationDetail => {
  const src = dummyApplicationDetailById[((i - 1) % 4) + 1]
  return {
    ...src,
    applicant_info: {
      ...src.applicant_info,
      nickname: `${src.applicant_info.nickname}-${i}`,
    },
    status: listStore[i - 1].status as ApplicantStatus,
    applied_at: listStore[i - 1].applied_at,
  }
}

let detailStore: Record<number, ApplicationDetail> = {}
for (let i = 1; i <= EXPAND; i++) {
  detailStore[i] = seedDetail(i)
}

const PAGE_SIZE = 8
const readCursor = (sp: URLSearchParams) => {
  const raw = sp.get('cursor')
  if (!raw) return 0
  if (raw.startsWith('offset:')) {
    const n = Number(raw.split(':')[1])
    return Number.isFinite(n) ? n : 0
  }
  return 0
}
const nextCursor = (offset: number, total: number) => {
  const next = offset + PAGE_SIZE
  return next < total ? `offset:${next}` : null
}

export const applicationHandlers = [
  // 목록
  http.get(
    'https://ozcoding.site/api/v1/recruitments/:recruitmentUuid/applications',
    ({ request }) => {
      const url = new URL(request.url)
      const offset = readCursor(url.searchParams)
      const total = listStore.length
      const page = listStore.slice(offset, offset + PAGE_SIZE)
      return HttpResponse.json({
        results: page,
        next_cursor: nextCursor(offset, total),
      })
    }
  ),

  // 상세
  http.get(
    'https://ozcoding.site/api/v1/applications/:applicationId',
    ({ params }) => {
      const id = Number(params.applicationId)
      const detail = detailStore[id]
      if (!detail) {
        return HttpResponse.json(
          { detail: '찾을 수 없습니다.' },
          { status: 404 }
        )
      }
      return HttpResponse.json(detail)
    }
  ),

  // 승인
  http.post(
    'https://ozcoding.site/api/v1/applications/:applicationId/approve',
    ({ params }) => {
      const id = Number(params.applicationId)
      const t = listStore.find((a) => a.application_id === id)
      if (!t || !detailStore[id]) {
        return HttpResponse.json(
          { detail: '찾을 수 없습니다.' },
          { status: 404 }
        )
      }
      t.status = 'APPROVED'
      detailStore[id] = { ...detailStore[id], status: 'APPROVED' }
      return HttpResponse.json({
        message: '지원이 승인되었습니다.',
        status: 'APPROVED',
      })
    }
  ),

  // 거절
  http.post(
    'https://ozcoding.site/api/v1/applications/:applicationId/reject',
    ({ params }) => {
      const id = Number(params.applicationId)
      const t = listStore.find((a) => a.application_id === id)
      if (!t || !detailStore[id]) {
        return HttpResponse.json(
          { detail: '찾을 수 없습니다.' },
          { status: 404 }
        )
      }
      t.status = 'REJECTED'
      detailStore[id] = { ...detailStore[id], status: 'REJECTED' }
      return HttpResponse.json({
        message: '지원이 거절되었습니다.',
        status: 'REJECTED',
      })
    }
  ),
]

//지원서 제출 핸들러
export const applicationSubmitHandlers = [
  http.post(
    'https://ozcoding.site/api/v1/recruitments/:recruitmentId/applications',
    async () => {
      return HttpResponse.json({
        application_id: 1000,
        message: '스터디 공고 참여 신청 성공',
      })
    }
  ),
]
