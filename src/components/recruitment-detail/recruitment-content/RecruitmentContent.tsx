import ExPostContent from './ExPostContent'

export default function RecruitmentContent() {
  return (
    <div className="w-full rounded-xl border border-gray-200 bg-white p-8 pb-18">
      <h3 className="mb-4 pb-6 text-2xl font-bold">공고 내용</h3>
      <ExPostContent /> {/* 임시 공고 내용 데이터 */}
    </div>
  )
}
