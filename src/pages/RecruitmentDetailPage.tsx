import { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import BackButton from '@src/components/commons/BackButton'
import { EmptyState } from '@components/commons/EmptyState'
import { EMPTY_MESSAGES } from '@src/constants/ui'
import RecruitmentBanner from '@components/recruitment-detail/recruitment-banner/RecruitmentBanner'
import RecruitmentAttachmentList from '@src/components/recruitment-detail/recruitment-attachment-list/RecruitmentAttachmentList'
import RecruitmentContent from '@src/components/recruitment-detail/recruitment-content/RecruitmentContent'
import RecuitmentLecture from '@src/components/recruitment-detail/recuitment-lecture/RecuitmentLecture'
import {
  getRecruitmentDetail,
  incBookmark,
  incView,
} from '@src/api/supabase/recDetail.supa'

export default function RecruitmentDetailPage() {
  const { uuid } = useParams<{ uuid: string }>()
  const qc = useQueryClient()
  const viewedRef = useRef(false)

  const { data: post, isLoading } = useQuery({
    queryKey: ['recruitment', uuid],
    queryFn: () => getRecruitmentDetail(uuid!),
    enabled: !!uuid,
  })

  useEffect(() => {
    if (!uuid || viewedRef.current) return
    viewedRef.current = true
    incView(uuid).finally(() => {
      qc.invalidateQueries({ queryKey: ['recruitment', uuid] })
      qc.invalidateQueries({ queryKey: ['jobPosts'] })
    })
  }, [uuid, qc])

  const bookmarkMut = useMutation({
    mutationFn: () => incBookmark(uuid!),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['recruitment', uuid] })
      qc.invalidateQueries({ queryKey: ['jobPosts'] })
    },
  })

  if (isLoading) return <p className="text-gray-600">Loading...</p>

  if (!post) {
    return (
      <EmptyState
        title={EMPTY_MESSAGES.NoData}
        description="해당 공고를 찾을 수 없습니다."
        iconType="NoData"
        iconClassName="stroke-primary-500 w-8 h-8"
        iconContainerClassName="bg-primary-50 rounded-full w-20 h-20 flex items-center justify-center"
      />
    )
  }

  return (
    <div className="flex flex-col items-center">
      <div className="max-w-[896px] p-8 sm:px-16">
        <div className="w-full pb-6">
          <BackButton />
        </div>

        <div className="flex flex-col gap-8">
          <RecruitmentBanner
            post={post}
            onBookmark={() => bookmarkMut.mutate()}
          />

          <RecruitmentContent content={post.content ?? ''} />

          <RecuitmentLecture lectures={[]} />

          <RecruitmentAttachmentList
            files={post.recruitment_attachments ?? []}
          />
        </div>
      </div>
    </div>
  )
}
