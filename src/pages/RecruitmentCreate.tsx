<<<<<<< HEAD
import { FileUploadBox } from '@src/components/recruitment-create/FileUploadBox'
import { ImageUploadBox } from '@src/components/recruitment-create/ImageUploadBox'
import StudyIntroMarkdown from '@src/components/recruitment-create/StudyIntroMarkdown'
import TagBox from '@src/components/recruitment-create/tag-ui/TagBox'
import { useState } from 'react'
import RecBasicInfo from '@src/components/recruitment-create/RecBasicInfo'
=======
import RecCreateBasicInfo from '@src/components/recruitment-create/RecCreateBasicInfo'
>>>>>>> 78d62f9 (chore: rename으로 수정된 RecCreateBasicInfo에 맞춰서 수정(#100))
import RecCreateHeader from '@src/components/recruitment-create/RecCreateHeader'

export default function RecruitmentCreate() {
  return (
    <div className="min-h-dvh w-full">
      <div className="mx-auto mt-8 w-full max-w-[1120px] px-6 lg:px-12">
        <div className="mb-8">
          <RecCreateHeader />
        </div>
        <div className="space-y-8">
          <RecCreateBasicInfo />
        </div>
      </div>
      <div className="mt-20">
        <TagBox />
      </div>
    </div>
  )
}
