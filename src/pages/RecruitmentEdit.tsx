import { useParams, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useToast } from '@components/commons/toast'
import {
  getCoursesForGroup,
  sumCoursePrices,
} from '@src/mock/studyGroupCourseMap'
import { patchRecruitment } from '@src/api/recruitments.edit'
import RecEditHeader from '@src/components/recruitment-edit/RecEditHeader'
import RecEditBasicInfo from '@src/components/recruitment-edit/RecEditBasicInfo'
import RecEditContentSection from '@src/components/recruitment-edit/RecEditContentSection'
import RecEditAdditionalInfo from '@src/components/recruitment-edit/RecEditAdditionalInfo'
import RecEditFooter from '@src/components/recruitment-edit/RecEditFooter'
import { recMockDatas } from '@src/mock/recEditData'
import {
  RECRUIT_EDIT_TOAST,
  RECRUIT_EDIT_VALIDATION,
} from '@src/constants/receditmessage'
import { parseCapacity, toFinalPrice } from '@src/utils/recEdit'

export default function RecruitmentEdit() {
  const { recruitment_uuid = 'me-1' } = useParams()
  const navigate = useNavigate()
  const toast = useToast()

  const draftId = useMemo(() => uuidv4(), [])

  const MOCKDATA = recMockDatas[0]
  const [title, setTitle] = useState(MOCKDATA.title)
  const [groupName, setGroupName] = useState<string | undefined>(
    MOCKDATA.groupName
  )
  const [capacityName, setCapacityName] = useState<string | undefined>(
    MOCKDATA.capacityName
  )
  const [deadline, setDeadline] = useState<Date | null>(MOCKDATA.deadline)
  const [markdown, setMarkdown] = useState<string>(MOCKDATA.content)
  const [priceRaw, setPriceRaw] = useState<string>('')

  const groupCourses = useMemo(() => getCoursesForGroup(groupName), [groupName])
  const derivedPrice = useMemo(
    () => String(sumCoursePrices(groupCourses)),
    [groupCourses]
  )
  const finalPrice = toFinalPrice(priceRaw, derivedPrice)

  const validate = () => {
    const messages: string[] = []
    if (!title?.trim()) messages.push(RECRUIT_EDIT_VALIDATION.title)
    if (!groupName) messages.push(RECRUIT_EDIT_VALIDATION.group)
    if (!capacityName) messages.push(RECRUIT_EDIT_VALIDATION.capacity)
    if (!deadline) messages.push(RECRUIT_EDIT_VALIDATION.deadline)
    if (!markdown?.trim()) messages.push(RECRUIT_EDIT_VALIDATION.content)
    return messages
  }

  const m = useMutation({
    mutationFn: () =>
      patchRecruitment(recruitment_uuid, {
        title,
        content: markdown,
        expected_headcount: parseCapacity(capacityName),
        estimated_fee: finalPrice,
        close_at: deadline ? deadline.toISOString() : undefined,
      }),
    onSuccess: () => {
      toast.success(RECRUIT_EDIT_TOAST.success)
      navigate('/recruitment/manage')
    },
    onError: () => {
      toast.error(RECRUIT_EDIT_TOAST.error)
    },
  })

  const handleSubmit = () => {
    const errors = validate()
    if (errors.length > 0) {
      toast.error({
        title: RECRUIT_EDIT_TOAST.invalid.title,
        content: errors[0],
      })
      return
    }
    m.mutate()
  }

  return (
    <div className="min-h-dvh w-full">
      <div className="mx-auto mt-8 flex w-full max-w-[1120px] flex-col items-center gap-8 px-6 lg:px-12">
        <RecEditHeader />
        <RecEditBasicInfo
          title={title}
          groupName={groupName}
          capacityName={capacityName}
          defaultDeadline={deadline}
          onTitleChange={setTitle}
          onGroupChange={setGroupName}
          onCapacityChange={setCapacityName}
          onDeadlineChange={setDeadline}
        />
        <RecEditContentSection
          draftId={draftId}
          defaultMarkDown={markdown}
          onChangeMarkDown={setMarkdown}
        />
        <RecEditAdditionalInfo
          draftId={draftId}
          defaultPrice={derivedPrice}
          onPriceChange={setPriceRaw}
          defaultFiles={MOCKDATA.files}
        />
        <RecEditFooter onSubmit={handleSubmit} submitting={m.isPending} />
      </div>
    </div>
  )
}
