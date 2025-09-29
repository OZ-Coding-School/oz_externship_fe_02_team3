import { supa } from '@src/lib/supabase'

export interface RecruitmentDetail {
  uuid: string
  title: string
  content: string
  expected_headcount: number | null
  estimated_fee: number | null
  close_at: string | null
  created_at: string | null
  views_count: number | null
  bookmarks_count: number | null
  tags: string[] | null

  // 조인 결과
  study_group_name: string | null

  // 첨부/이미지
  recruitment_attachments: { file_url: string; file_name: string }[] | null
  recruitment_images: { img_url: string }[] | null
}

interface DetailRow {
  uuid: string
  title: string
  content: string
  expected_headcount: number | null
  estimated_fee: number | null
  close_at: string | null
  created_at: string | null
  views_count: number | null
  bookmarks_count: number | null
  tags: string[] | null
  study_groups: { name: string | null } | { name: string | null }[] | null
  recruitment_attachments: { file_url: string; file_name: string }[] | null
  recruitment_images: { img_url: string }[] | null
}

export async function getRecruitmentDetail(
  uuid: string
): Promise<RecruitmentDetail> {
  const { data, error } = await supa
    .from('recruitments')
    .select(
      `
      uuid, title, content,
      expected_headcount, estimated_fee,
      close_at, created_at,
      views_count, bookmarks_count,
      tags,
      study_groups:study_groups ( name ),
      recruitment_attachments ( file_url, file_name ),
      recruitment_images ( img_url )
    `
    )
    .eq('uuid', uuid)
    .single()

  if (error) throw error
  if (!data) throw new Error('Recruitment not found')

  const row = data as DetailRow

  const sg = Array.isArray(row.study_groups)
    ? row.study_groups[0]
    : row.study_groups

  return {
    uuid: row.uuid,
    title: row.title,
    content: row.content,
    expected_headcount: row.expected_headcount ?? null,
    estimated_fee: row.estimated_fee ?? null,
    close_at: row.close_at ?? null,
    created_at: row.created_at ?? null,
    views_count: row.views_count ?? 0,
    bookmarks_count: row.bookmarks_count ?? 0,
    tags: row.tags ?? [],
    study_group_name: sg?.name ?? null,
    recruitment_attachments: row.recruitment_attachments ?? [],
    recruitment_images: row.recruitment_images ?? [],
  }
}

export async function incView(uuid: string): Promise<void> {
  const { error } = await supa.rpc('inc_recruitment_views', { p_uuid: uuid })
  if (error) throw error
}

export async function incBookmark(uuid: string): Promise<void> {
  const { error } = await supa.rpc('inc_recruitment_bookmarks', {
    p_uuid: uuid,
  })
  if (error) throw error
}
