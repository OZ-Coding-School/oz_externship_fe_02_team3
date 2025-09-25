import { http, HttpResponse } from 'msw'

const ABS = 'https://ozcoding.site/api/v1/recruitments/'
const REL = '/api/v1/recruitments/'

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

const MAX_IMAGE_COUNT = 5
const MAX_ATTACHMENT_COUNT = 3

interface AttachmentDTO {
  file_url: string
  file_name: string
}
interface RecruitmentCreatePayload {
  title: string
  content: string
  close_at: string
  expected_headcount: number
  study_group: number
  images?: string[]
  attachments?: AttachmentDTO[]
  estimated_fee?: number | null
  tags?: number[]
}

function isIsoNoZ(s: unknown): s is string {
  if (typeof s !== 'string') return false
  const d = new Date(s)
  return !isNaN(d.getTime()) && /T\d{2}:\d{2}:\d{2}$/.test(s)
}

function validate(body: Record<string, unknown>) {
  const errors: Record<string, string[]> = {}

  const title = body?.title
  if (typeof title !== 'string' || !title.trim()) {
    errors.title = ['This field may not be blank.']
  } else if (title.length > 50) {
    errors.title = ['50자 이내로 입력해 주세요.']
  }

  const content = body?.content
  if (typeof content !== 'string' || !content.trim()) {
    errors.content = ['This field may not be blank.']
  }

  if (!isIsoNoZ(body?.close_at)) {
    errors.close_at = ['YYYY-MM-DDTHH:MM:SS 형식의 시간이 필요합니다.']
  }

  const head = body?.expected_headcount
  if (
    typeof head !== 'number' ||
    !Number.isInteger(head) ||
    head < 1 ||
    head > 10
  ) {
    errors.expected_headcount = ['1에서 10 사이의 정수를 입력해 주세요.']
  }

  if (typeof body?.study_group !== 'number') {
    errors.study_group = ['유효한 스터디 그룹 ID가 필요합니다.']
  }

  const images = body?.images
  if (images !== undefined) {
    if (!Array.isArray(images)) {
      errors.images = ['배열이어야 합니다.']
    } else if (images.length > MAX_IMAGE_COUNT) {
      errors.images = [
        `이미지는 최대 ${MAX_IMAGE_COUNT}개까지 업로드할 수 있습니다.`,
      ]
    }
  }

  const attachments = body?.attachments
  if (attachments !== undefined) {
    if (!Array.isArray(attachments)) {
      errors.attachments = ['배열이어야 합니다.']
    } else if (attachments.length > MAX_ATTACHMENT_COUNT) {
      errors.attachments = [
        `첨부 파일은 최대 ${MAX_ATTACHMENT_COUNT}개까지 등록 가능합니다.`,
      ]
    } else {
      ;(attachments as unknown[]).forEach((f, i) => {
        const file = f as Partial<AttachmentDTO> | undefined
        if (
          !file ||
          typeof file.file_url !== 'string' ||
          typeof file.file_name !== 'string'
        ) {
          errors[`attachments[${i}]`] = ['file_url, file_name이 필요합니다.']
        }
      })
    }
  }

  const estimatedFee = body?.estimated_fee
  if (estimatedFee !== undefined && estimatedFee !== null) {
    if (typeof estimatedFee !== 'number' || estimatedFee < 0) {
      errors.estimated_fee = ['0 이상의 숫자를 입력해 주세요.']
    }
  }

  const tags = body?.tags
  if (tags !== undefined) {
    if (!Array.isArray(tags)) {
      errors.tags = ['배열이어야 합니다.']
    } else if (
      !(tags as unknown[]).every((t) => Number.isInteger(t as number))
    ) {
      errors.tags = ['태그는 정수 ID 배열이어야 합니다.']
    }
  }

  return errors
}

async function handleCreate({ request }: { request: Request }) {
  const raw = (await request.json().catch(() => ({}))) as Record<
    string,
    unknown
  >
  const errors = validate(raw)
  if (Object.keys(errors).length) {
    return HttpResponse.json(errors, { status: 400 })
  }

  const body = raw as unknown as RecruitmentCreatePayload

  return HttpResponse.json(
    {
      uuid: uuidv4(),
      title: body.title,
    },
    { status: 201 }
  )
}

export const recruitCreateHandlers = [
  http.post(REL, handleCreate),
  http.post(ABS, handleCreate),
]
