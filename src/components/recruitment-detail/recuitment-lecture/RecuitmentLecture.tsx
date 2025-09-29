import LectureCard from './LectureCard'

type Lecture = React.ComponentProps<typeof LectureCard>['lecture']

interface Props {
  lectures: Lecture[]
}

export default function RecuitmentLecture({ lectures }: Props) {
  if (!lectures || lectures.length === 0) return null

  return (
    <div className="w-full rounded-xl border border-gray-200 bg-white p-8">
      <h3 className="mb-4 pb-6 text-2xl font-bold">스터디 강의 목록</h3>
      <div className="grid grid-cols-2 gap-6">
        {lectures.map((lecture, idx) => (
          <LectureCard
            key={lecture.url || `lecture-${idx}`}
            lecture={lecture}
          />
        ))}
      </div>
    </div>
  )
}
