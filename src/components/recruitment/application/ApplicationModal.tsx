import Button from '@src/components/Button'
import BaseModal from '@src/components/modal/BaseModal'
import FormField from '@src/components/modal/FormField'
import ModalFooter from '@src/components/modal/ModalFooter'
import ModalHeader from '@src/components/modal/ModalHeader'
import TextareaWithCounter from '@src/components/modal/TextareaWithCounter'
import { useForm } from 'react-hook-form'
import { Send } from 'lucide-react'

type Props = { open: boolean; onClose: () => void }

type Form = {
  intro: string
  motive: string
  goal: string
  availability: string
  hasExp: boolean
  expDetail?: string
}

export default function ApplicationModal({ open, onClose }: Props) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<Form>({ mode: 'onChange' })

  const intro = watch('intro') ?? ''
  const motive = watch('motive') ?? ''
  const goal = watch('goal') ?? ''
  const availability = watch('availability') ?? ''
  const hasExp = watch('hasExp') ?? false
  const expDetail = watch('expDetail') ?? ''

  // 나중에 api 연결로 post 하기
  const onSubmit = (data: Form) => {
    console.log(data)
    reset()
    onClose()
  }

  // 닫을때 작성한거 리셋
  // 경고 모달 제작해서 사용자한테 닫을 때
  // 확인 다이얼로그 닫기/취소 시 작성 내용이 모두 사라집니다. 정말 닫으시겠습니까? 모달 붙일지 여부 결정.
  const handleClose = () => {
    reset()
    onClose()
  }

  if (!open) return null

  return (
    <BaseModal open={open} onClose={handleClose} size="vertical">
      <div className="flex max-h-[80vh] flex-col">
        <ModalHeader
          title="스터디 지원서 작성"
          subTitle="Unity 게임 개발 프로젝트 팀원 모집 입력"
          // subTitle={title} 나중에 공고 제목 props 으로 내려 줘야함
          onClose={handleClose}
        />
        <div className="min-h-0 flex-1 space-y-6 overflow-y-auto px-10 py-4">
          <FormField
            id="intro"
            label="자기소개"
            required
            error={errors.intro?.message}
          >
            <TextareaWithCounter
              id="intro"
              maxLength={500}
              valueLength={intro.length}
              {...register('intro', {
                required: '자기소개를 입력해주세요.',
                maxLength: 500,
              })}
              placeholder="본인에 대해 간략하게 소개해주세요. (학습, 배경, 관심분야, 현재 수준 등)"
            />
          </FormField>
          <FormField
            id="motive"
            label="지원동기"
            required
            error={errors.motive?.message}
          >
            <TextareaWithCounter
              id="motive"
              maxLength={500}
              valueLength={motive.length}
              {...register('motive', {
                required: '지원동기를 입력해 주세요.',
                maxLength: 500,
              })}
              placeholder="이 스터디에 지원하게 된 동기를 작성해 주세요."
            />
          </FormField>
          <FormField
            id="goal"
            label="스터디목표"
            required
            error={errors.goal?.message}
          >
            <TextareaWithCounter
              id="goal"
              maxLength={500}
              valueLength={goal.length}
              {...register('goal', {
                required: '스터디 목표를 입력해 주세요.',
                maxLength: 500,
              })}
              placeholder="이 스터디를 통해 달성하고 싶은 목표를 작성해주세요."
            />
          </FormField>
          <FormField
            id="availability"
            label="가능한 시간대"
            required
            error={errors.availability?.message}
          >
            {/* 시간대는 maxLength 변경 해야 할듯 
            높이도 줄여보는 방향으로, 아니면 시간 선택관련 컴포넌트를 따로 추가하는것도 좋아보이는데..... */}
            <TextareaWithCounter
              id="availability"
              maxLength={500}
              valueLength={availability.length}
              {...register('availability', {
                required: '가능한 시간을 입력해 주세요.',
                maxLength: 500,
              })}
              placeholder="스터디 참여가 가능한 요일과 시간대를 작성해주세요(예: 평일 저녁 7~9시, 주말 오후)."
            />
          </FormField>
          <FormField id="hasExp" label="스터디 경험 유무">
            <div className="inline-flex items-center gap-2">
              <input
                id="hasExp"
                type="checkbox"
                {...register('hasExp')}
                className="checked:bg-primary-500 h-3 w-3 appearance-none rounded-xs border border-gray-500 checked:border-1"
              />
              <span>스터디 참여 경험이 있습니다</span>
            </div>
          </FormField>
          <FormField
            id="expDetail"
            label="구체적인 스터디 경험"
            error={errors.expDetail?.message}
          >
            <TextareaWithCounter
              id="expDetail"
              maxLength={500}
              valueLength={expDetail.length}
              disabled={!hasExp}
              {...register('expDetail', {
                required: hasExp ? '경험이 있다면 상세히 입력해주세요.' : false,
                maxLength: 500,
              })}
              placeholder="스터디 경험이 없으시면 비워두셔도 됩니다."
            />
          </FormField>
        </div>
      </div>

      <ModalFooter
        left="* 표시된 영역은 필수 입력 사항입니다."
        right={
          <>
            <Button
              buttonInnerText="취소"
              variant="outline"
              bgColor="text-gray-500"
              textColor="text-gray-700"
              borderColor="border-gray-300"
              onClick={handleClose}
            />
            <Button
              buttonInnerText="지원서 제출"
              icon={Send}
              bgColor="bg-primary-500"
              borderColor="border-primary-500"
              disabled={!isValid || isSubmitting}
              onClick={handleSubmit(onSubmit)}
            />
          </>
        }
      />
    </BaseModal>
  )
}
