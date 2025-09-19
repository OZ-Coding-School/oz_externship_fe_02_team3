import LectureCard from './LectureCard'
import { post } from '@src/mock/post'

export default function RecuitmentLecture() {
  return (
    <div className="w-full rounded-xl border border-gray-200 bg-white p-8">
      <h3 className="mb-4 pb-6 text-2xl font-bold">스터디 강의 목록</h3>
      <div className="grid grid-cols-2 gap-6">
        {post.lectures.map((lecture) => (
          <LectureCard key={lecture.url} lecture={lecture} />
        ))}
      </div>
    </div>
  )
}
