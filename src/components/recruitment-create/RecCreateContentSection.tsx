import { useState } from 'react'
import StudyIntroMarkdown from './StudyIntroMarkdown'
import { ImageUploadBox } from './ImageUploadBox'

const STUDY_INTRO_PLACEHOLDER = `# 스터디 소개
React 실무 프로젝트를 함께 진행할 팀원을 모집합니다!

## 스터디 내용
- React 기초부터 실무 적용까지
- 실제 프로젝트 개발 경험
- 코드 리뷰 및 피드백

## 이런 분을 찾습니다
- JavaScript 기초 지식이 있으신 분
- 꾸준히 참여 가능하신 분
- 함께 성장하고 싶으신 분

## 스터디 일정
- 주 2회 (화, 목) 오후 7시
- 온라인/오프라인 병행

![이미지 설명](이미지URL)`

export default function RecCreateContentSection() {
  const [markDown, setMarkDown] = useState('')

  return (
    <div className="w-full max-w-[832px] rounded-xl border border-gray-200 bg-white p-6 text-[#111827]">
      <p className="text-[20px] leading-7 font-semibold">공고 내용</p>
      <label className="mt-6 mb-2 block text-sm leading-5 font-medium text-gray-700">
        공고 내용
        <span className="text-[#EF4444]"> *</span>
      </label>
      <div className="flex justify-between text-[12px] font-normal text-gray-500">
        <p>마크다운 문법을 사용할 수 있습니다</p>
        <p>이미지 0/5개</p>
      </div>
      <label className="mt-2 mb-2 block text-sm leading-5 font-medium text-gray-700">
        스터디 그룹 소개(선택사항)
      </label>
      <StudyIntroMarkdown
        value={markDown}
        onChange={setMarkDown}
        placeholder={STUDY_INTRO_PLACEHOLDER}
        height={320}
      />
      <div className="pt-2 text-[12px] leading-4 font-normal text-gray-500">
        <p>• 마크다운 문법: **굵게**, *기울임*, # 제목, - 목록 등</p>
        <p>• 이미지 추가: ![설명](이미지URL) - 최대 5개, 각 5MB 이하</p>
      </div>

      <div className="mt-8">
        <label className="mt-2 mb-2 block text-sm leading-5 font-medium text-gray-700">
          스터디 그룹 대표 이미지(선택사항)
        </label>
        <ImageUploadBox />
      </div>
    </div>
  )
}
