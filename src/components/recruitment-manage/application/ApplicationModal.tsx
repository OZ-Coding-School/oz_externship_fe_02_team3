import Button from '@src/components/button/Button'
import Modal from '@src/components/modal'
import { FormField, TextareaWithCounter } from '@src/components/form'
import { MousePointer2 as MousePointer2Icon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'

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

const TEXT_MAX = 500

//반복되는 필드들
const TEXT_FIELDS: Array<{
  name: keyof Pick<Form, 'intro' | 'motive' | 'goal' | 'availability'>
  label: string
  placeholder: string
}> = [
  {
    name: 'intro',
    label: '자기소개',
    placeholder:
      '본인에 대해 간략하게 소개해주세요. (학습, 배경, 관심분야, 현재 수준 등)',
  },
  {
    name: 'motive',
    label: '지원동기',
    placeholder: '이 스터디에 지원하게 된 동기를 작성해 주세요.',
  },
  {
    name: 'goal',
    label: '스터디목표',
    placeholder: '이 스터디를 통해 달성하고 싶은 목표를 작성해주세요.',
  },
  {
    name: 'availability',
    label: '가능한 시간대',
    placeholder:
      '스터디 참여가 가능한 요일과 시간대를 작성해주세요(예: 평일 저녁 7~9시, 주말 오후).',
  },
]

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
    clearErrors,
    setValue,
    formState: { errors, isValid, isSubmitting },
  } = useForm<Form>({ mode: 'onChange' })

  const hasExp = watch('hasExp') ?? false

  const onSubmit = (data: Form) => {
    console.log(data)
    reset()
    onClose()
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  // 경험 체크 박스 풀었을때 에러메시지 초기화
  useEffect(() => {
    if (!hasExp) {
      clearErrors('expDetail')
      setValue('expDetail', '') // 내용도 초기화
    }
  }, [hasExp, clearErrors])

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
        {/* 반복되는 텍스트영역 map */}
        {TEXT_FIELDS.map(({ name, label, placeholder }) => {
          const value = (watch(name) as string) ?? ''
          const errMsg = (errors[name]?.message as string) || undefined
          return (
            <FormField
              key={name}
              id={name}
              label={label}
              required
              error={errMsg}
            >
              <TextareaWithCounter
                id={name}
                maxLength={TEXT_MAX}
                valueLength={value.length}
                placeholder={placeholder}
                {...register(name, {
                  required: `${label}를 입력해주세요.`,
                  maxLength: TEXT_MAX,
                })}
              />
            </FormField>
          )
        })}
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
            valueLength={(watch('expDetail') ?? '').length}
            disabled={!hasExp}
            {...register('expDetail', {
              validate: (value) =>
                !hasExp ||
                (value as string).trim()?.length > 0 ||
                '경험이 있다면 상세히 입력해주세요.',
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
            icon={MousePointer2Icon}
            variant="primary"
            size="base"
            fontWeight="medium"
            iconClassName="rotate-[90deg]"
            disabled={!isValid || isSubmitting}
            onClick={handleSubmit(onSubmit)}
            iconSize="sm"
          />
        </div>
      </Modal.Footer>
    </Modal>
  )
}
