import Button from '@src/components/button/Button'
import Modal from '@src/components/modal'
import FormField from '@src/components/modal/FormField'
import TextareaWithCounter from '@src/components/modal/TextareaWithCounter'
import { Send as SendIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'

interface Props {
  open: boolean
  onClose: () => void
  title?: string
}

interface Form {
  intro: string
  motive: string
  goal: string
  availability: string
  hasExp: boolean
  expDetail?: string
}

export default function ApplicationModal({
  open,
  onClose,
  title = '공고 제목',
}: Props) {
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

  const onSubmit = (data: Form) => {
    console.log(data)
    reset()
    onClose()
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  if (!open) return null

  return (
    <Modal
      open={open}
      onClose={handleClose}
      size="md"
      closeOnOutsideClick={false}
    >
      <Modal.Header onClose={handleClose}>
        <h2 className="truncate text-xl font-semibold text-gray-900">
          스터디 지원서 작성
        </h2>
        <p className="mt-1 text-sm text-gray-500">{title}</p>
      </Modal.Header>

      <div className="max-h-[80vh] min-h-0 flex-1 space-y-6 overflow-y-auto px-10 py-4">
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

      <Modal.Footer>
        <div className="text-sm text-gray-500">
          * 표시된 영역은 필수 입력 사항입니다.
        </div>
        <div className="flex items-center gap-2">
          <Button
            buttonInnerText="취소"
            variant="outline"
            onClick={handleClose}
          />
          <Button
            buttonInnerText="지원서 제출"
            icon={SendIcon}
            iconSize="sm"
            disabled={!isValid || isSubmitting}
            onClick={handleSubmit(onSubmit)}
          />
        </div>
      </Modal.Footer>
    </Modal>
  )
}
