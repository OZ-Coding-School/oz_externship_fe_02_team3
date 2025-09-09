import StudyIntroMarkdown from '@src/components/recruitment-create/StudyIntroMarkdown'
import { useState } from 'react'

export default function RecruitmentCreate() {
  const [intro, setIntro] = useState('')
  return (
    <div className="p-10">
      <StudyIntroMarkdown value={intro} onChange={setIntro} />
    </div>
  )
}
