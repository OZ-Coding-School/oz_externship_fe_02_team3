import { http, HttpResponse, type HttpHandler } from 'msw'
import { recruitmentDB, type RecruitmentDetailDTO } from './recruitments.store'

export type PatchPayload = Partial<
  Pick<
    RecruitmentDetailDTO,
    'title' | 'content' | 'expected_headcount' | 'estimated_fee' | 'close_at'
  >
> & { tags?: string[] }

const REL = '/api/v1/recruitments/:recruitment_uuid'
const ABS = 'https://ozcoding.site/api/v1/recruitments/:recruitment_uuid'

function toTagObjects(names?: string[]) {
  return (names ?? []).map((name, idx) => ({ id: idx + 1, name }))
}

function handleGet(params: { recruitment_uuid?: string }) {
  const uuid = String(params.recruitment_uuid ?? '')
  const row = recruitmentDB.get(uuid)
  if (!row) return HttpResponse.json({ detail: 'not found' }, { status: 404 })
  return HttpResponse.json(row, { status: 200 })
}

async function handlePatch(
  params: { recruitment_uuid?: string },
  request: Request
) {
  const uuid = String(params.recruitment_uuid ?? '')
  const row = recruitmentDB.get(uuid)
  if (!row) return HttpResponse.json({ detail: 'not found' }, { status: 404 })

  const body = (await request.json()) as PatchPayload

  const updated: RecruitmentDetailDTO = {
    ...row,
    ...('title' in body ? { title: body.title ?? row.title } : {}),
    ...('content' in body ? { content: body.content ?? row.content } : {}),
    ...('expected_headcount' in body
      ? {
          expected_headcount: body.expected_headcount ?? row.expected_headcount,
        }
      : {}),
    ...('estimated_fee' in body
      ? { estimated_fee: body.estimated_fee ?? row.estimated_fee }
      : {}),
    ...('close_at' in body ? { close_at: body.close_at ?? row.close_at } : {}),
    ...(Array.isArray(body.tags) ? { tags: toTagObjects(body.tags) } : {}),
  }

  recruitmentDB.set(uuid, updated)
  return HttpResponse.json(updated, { status: 200 })
}

export const recruitmentEditHandlers: HttpHandler[] = [
  http.get(REL, ({ params }) => handleGet(params)),
  http.get(ABS, ({ params }) => handleGet(params)),
  http.patch(REL, ({ params, request }) => handlePatch(params, request)),
  http.patch(ABS, ({ params, request }) => handlePatch(params, request)),
]
