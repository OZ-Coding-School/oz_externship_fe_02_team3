import RecruitmentAttachmentFile from './RecruitmentAttachmentFile'

interface FileRow {
  file_url: string
  file_name: string
}

type FileProp =
  React.ComponentProps<typeof RecruitmentAttachmentFile> extends {
    file: infer F
  }
    ? F
    : never

interface Props {
  files: FileRow[]
}

export default function RecruitmentAttachmentList({ files }: Props) {
  if (!files || files.length === 0) return null

  const toFileProp = (f: FileRow): FileProp =>
    ({
      file_url: f.file_url,
      file_name: f.file_name,
    }) as FileProp

  return (
    <div className="w-full rounded-xl border border-gray-200 bg-white p-8">
      <h3 className="mb-4 pb-6 text-2xl font-bold">첨부 파일</h3>
      <div className="flex flex-col gap-4">
        {files.map((f, index) => (
          <RecruitmentAttachmentFile
            key={`${f.file_url}-${index}`}
            file={toFileProp(f)}
          />
        ))}
      </div>
    </div>
  )
}
