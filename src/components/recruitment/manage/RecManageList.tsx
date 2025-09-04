import JobPostCard from '@src/components/JobPostCard'

const mock: Parameters<typeof JobPostCard>[0] = {
  postTitle: 'Unity 게임 개발 프로젝트 팀원 모집',
  viewCount: 412,
  commentCount: 105,
  memberLimit: 0,
  deadline: '2025. 12. 30.',
  courses: ['Unity 게임 개발 마스터클래스 - 박유니티'],
  tags: ['Unity', '', '게임개발', '3D게임'],
  image: '/images/RecManageDummyImg.svg',
}

const RecManageList = () => {
  const items: Parameters<typeof JobPostCard>[0][] = Array.from(
    { length: 4 },
    () => ({ ...mock })
  )

  return (
    <section>
      <p className="mb-6 text-[20px] leading-7 font-semibold">
        내 공고 목록 (4)
      </p>

      <ul className="space-y-4">
        {items.map((item, i) => (
          <li key={i} className="rounded-lg bg-white">
            <JobPostCard {...item} />
          </li>
        ))}
      </ul>
    </section>
  )
}

export default RecManageList
