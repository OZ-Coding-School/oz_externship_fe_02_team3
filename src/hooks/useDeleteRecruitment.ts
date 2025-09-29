import { useMutation, useQueryClient } from '@tanstack/react-query'
import { supa } from '@src/lib/supabase'

interface Args {
  uuid: string
}

export function useDeleteRecruitment() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: async ({ uuid }: Args) => {
      // 1) uuid -> id 조회
      const { data: rec, error: e1 } = await supa
        .from('recruitments')
        .select('id, author_id')
        .eq('uuid', uuid)
        .single()
      if (e1) throw e1
      const id = rec.id as number

      // 2) 자식 테이블 선삭제 (FK on delete cascade 없으므로)
      const delChild = async (table: string) => {
        const { error } = await supa
          .from(table)
          .delete()
          .eq('recruitment_id', id)
        if (error) throw error
      }
      await delChild('recruitment_attachments')
      await delChild('recruitment_images')
      await delChild('recruitment_tags')
      await delChild('recruitment_bookmarks')
      await delChild('applications')

      // 3) 본문 삭제
      const { error: eDel } = await supa
        .from('recruitments')
        .delete()
        .eq('id', id)
      if (eDel) throw eDel

      return { id, uuid }
    },
    onSuccess: () => {
      // 목록/상세 등 갱신
      qc.invalidateQueries({ queryKey: ['recruitments'] })
      qc.invalidateQueries({ queryKey: ['myRecruitments'] })
    },
  })
}
