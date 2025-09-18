import { postDetailAttachments } from '@src/mock/postDetailAttachments'
import RecruitmentAttachmentFile from './RecruitmentAttachmentFile'

export default function RecruitmentAttachmentList() {
  return (
    <div className="w-full rounded-xl border border-gray-200 bg-white p-8">
      <h3 className="mb-4 pb-6 text-2xl font-bold">첨부 파일</h3>
      <div className="flex flex-col gap-4">
        {postDetailAttachments.map((file) => (
          <RecruitmentAttachmentFile key={file.id} file={file} />
        ))}
      </div>
    </div>
  )
}
