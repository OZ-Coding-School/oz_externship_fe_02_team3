import { useState } from 'react'
import MdToolbar from './markdown-ui/MdToolbar'
import MdPreview from './markdown-ui/MdPreview'
import MdFooter from './markdown-ui/MdFooter'
import { useMdCommands } from './markdown-ui/useMdCommands'

interface StudyIntroProps {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  height?: number
}

export default function StudyIntroMarkdown({
  value,
  onChange,
  placeholder = '# 스터디 소개\nReact 실무 프로젝트를 함께 진행할 팀원을 모집합니다!\n\n## 스터디 내용\n- React 기초부터 실무 적용까지\n- 실제 프로젝트 개발 경험\n- 코드 리뷰 및 피드백',
  height = 282,
}: StudyIntroProps) {
  const [tab, setTab] = useState<'edit' | 'preview'>('edit')

  // 최상단 버튼 Hooks: textarea를 직접 조작하는 커맨드 훅 (굵게/기울임/H1/리스트/링크)
  const { taRef, wrapInline, insertLink, toggleH1, toggleUl, toggleOl } =
    useMdCommands(onChange)

  // 메인 view 부분 분기처리
  const views = {
    edit: (
      <textarea
        ref={taRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{ height }}
        className="block w-full resize-none border-t border-gray-200 bg-white p-3 text-sm outline-none focus:ring-2 focus:ring-blue-500/30"
      />
    ),
    preview: <MdPreview embedded value={value} />,
  } as const

  return (
    <div className="w-full">
      <div className="overflow-hidden rounded-lg border border-gray-200">
        <MdToolbar
          tab={tab}
          setTab={setTab}
          onBold={() => wrapInline('**')}
          onItalic={() => wrapInline('*')}
          onCode={() => wrapInline('`')}
          onLink={insertLink}
          onH1={toggleH1}
          onBullet={toggleUl}
          onNumber={toggleOl}
        />
        {/* 본문  */}
        {views[tab]}

        {/* 풋터(하단의 텍스트 가이드) */}
        <MdFooter />
      </div>
    </div>
  )
}
