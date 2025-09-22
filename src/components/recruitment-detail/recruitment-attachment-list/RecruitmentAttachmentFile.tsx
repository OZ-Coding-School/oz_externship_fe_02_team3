import type { Attachment } from '@src/types/post'
import { Download as DownloadIcon, FileText as FileIcon } from 'lucide-react'

interface RecruitmentAttachmentFileProps {
  file: Attachment
}

export default function RecruitmentAttachmentFile({
  file,
}: RecruitmentAttachmentFileProps) {
  return (
    <div className="flex w-full items-center justify-between rounded-lg border border-gray-200 p-4">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
          <FileIcon className="h-5 w-5 text-blue-600" />
        </div>
        <div>
          <p className="font-medium">{file.file_name}</p>
        </div>
      </div>
      <a
        href={file.file_url}
        download={file.file_name}
        className="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-200 active:bg-gray-300 disabled:bg-gray-100"
      >
        <DownloadIcon className="h-4 w-4" />
        <a href={file.file_url} download={file.file_name}>
          다운로드
        </a>
      </a>
    </div>
  )
}
