import { Bookmark, Eye } from 'lucide-react'

interface JobPostCardProps {
  postTitle: string
  viewCount: number
  commentCount: number
  memberLimit: number
  deadline: string
  courses: string[]
  tags: string[]
  image?: string
}

const JobPostCard = ({
  postTitle,
  viewCount,
  commentCount,
  memberLimit,
  deadline,
  courses,
  tags,
  image,
}: JobPostCardProps) => {
  return (
    <div className="flex flex-col rounded-lg border border-solid border-gray-200 p-[25px]">
      <div className="h-24 w-32 rounded-lg bg-gray-100 bg-cover bg-center bg-no-repeat" />
      <div className="relative box-border flex shrink-0 content-stretch items-start justify-start py-0 pr-0 pl-4">
        <div className="relative flex h-[236px] w-[1022px] shrink-0 flex-col content-stretch items-start justify-start">
          {/* <div className="relative box-border flex shrink-0 content-stretch items-start justify-start px-0 pt-0 pb-3"> */}
          <div className="flex w-full justify-between">
            <p className="text-lg">{postTitle}</p>
            <div className="relative box-border flex shrink-0 content-stretch items-start justify-start py-0 pr-0 pl-4">
              <div className="flex items-center justify-start">
                <div className="flex items-center">
                  <div className="h-[14px] w-[14.58px]">
                    <Eye className="h-full w-full stroke-gray-500" />
                  </div>
                  <p className="text-sm text-gray-500">{viewCount}</p>
                </div>
                <div className="relative flex h-5 w-[42.188px] shrink-0 content-stretch items-center justify-start">
                  <div className="h-[14px] w-[14.58px]">
                    <Bookmark className="h-full w-full stroke-gray-500" />
                  </div>
                  <p className="text-sm text-gray-500">{commentCount}</p>
                </div>
                {/* </div> */}
              </div>
            </div>
          </div>

          <div className="relative box-border flex shrink-0 content-stretch items-start justify-start px-0 pt-0 pb-4">
            <div className="relative flex h-[60px] w-[1022px] shrink-0 flex-col content-stretch items-start justify-start">
              <div className="relative flex h-6 w-[1022px] shrink-0 content-stretch items-center justify-start">
                <div className="relative box-border flex shrink-0 content-stretch items-start justify-start py-0 pr-2 pl-0">
                  <div className="relative flex h-6 w-[16.672px] shrink-0 content-stretch items-center justify-start">
                    <div className="absolute top-1 left-0 h-4 w-[16.656px] overflow-clip">
                      <div className="absolute inset-[8.33%_10%] flex items-center justify-center">
                        <div className="h-[13.333px] w-[13.325px] flex-none scale-y-[-100%]">
                          <svg
                            className="block size-full"
                            fill="none"
                            preserveAspectRatio="none"
                            viewBox="0 0 14 14"
                          >
                            {/* <path d={svgPaths.p29469b00} fill="#9CA3AF" /> */}
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative flex h-5 w-[74.734px] shrink-0 content-stretch items-center justify-start">
                  <div className="relative flex shrink-0 flex-col justify-center font-['Pretendard:Regular',_sans-serif] text-[14px] leading-[0] text-nowrap text-gray-600 not-italic">
                    <p className="leading-[20px] whitespace-pre">
                      모집 인원: {memberLimit}명
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative box-border flex shrink-0 content-stretch items-start justify-start px-0 pt-3 pb-0">
                <div className="relative flex h-6 w-[1022px] shrink-0 content-stretch items-center justify-start">
                  <div className="relative box-border flex shrink-0 content-stretch items-start justify-start py-0 pr-2 pl-0">
                    <div className="relative flex h-6 w-[16.672px] shrink-0 content-stretch items-center justify-start">
                      <div className="absolute top-1 left-0 h-4 w-[16.656px] overflow-clip">
                        <div className="absolute inset-[8.33%_10%] flex items-center justify-center">
                          <div className="h-[13.333px] w-[13.325px] flex-none scale-y-[-100%]">
                            <svg
                              className="block size-full"
                              fill="none"
                              preserveAspectRatio="none"
                              viewBox="0 0 14 14"
                            >
                              {/* <path d={svgPaths.p33266880} fill="#9CA3AF" /> */}
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative flex h-6 w-[172.469px] shrink-0 content-stretch items-center justify-start">
                    <div className="relative box-border flex shrink-0 content-stretch items-start justify-start py-0 pr-2 pl-0">
                      <div className="relative flex h-5 w-[126.375px] shrink-0 content-stretch items-center justify-start">
                        <div className="relative flex shrink-0 flex-col justify-center font-['Pretendard:Regular',_sans-serif] text-[14px] leading-[0] text-nowrap text-gray-600 not-italic">
                          <p className="leading-[20px] whitespace-pre">
                            마감일: {deadline}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative box-border flex shrink-0 content-stretch items-start justify-start px-0 pt-0 pb-4">
            <div className="relative flex h-[72px] w-[1022px] shrink-0 flex-col content-stretch items-start justify-start">
              <div className="relative box-border flex shrink-0 content-stretch items-start justify-start px-0 pt-0 pb-2">
                <div className="relative flex h-5 w-[1022px] shrink-0 content-stretch items-center justify-start">
                  <div className="relative flex shrink-0 flex-col justify-center font-['Pretendard:Regular',_sans-serif] text-[14px] leading-[0] text-nowrap text-gray-600 not-italic">
                    <p className="leading-[20px] whitespace-pre">강의 목록:</p>
                  </div>
                </div>
              </div>
              <div className="relative flex h-11 w-[1022px] shrink-0 flex-col content-stretch items-start justify-start">
                {courses.map((course, courseIndex) => (
                  <div
                    key={courseIndex}
                    className="relative mb-1 flex h-5 w-[1022px] shrink-0 content-stretch items-center justify-start"
                  >
                    <div className="relative flex shrink-0 flex-col justify-center font-['Pretendard:Regular',_sans-serif] text-[14px] leading-[0] text-nowrap text-gray-700 not-italic">
                      <p className="leading-[20px] whitespace-pre">
                        • {course}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative flex h-6 w-[1022px] shrink-0 flex-wrap content-start items-start justify-start gap-2">
            {tags.map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="relative box-border flex h-6 shrink-0 content-stretch items-center justify-start rounded-[4px] bg-yellow-100 px-2 py-1"
              >
                <div className="relative flex shrink-0 flex-col justify-center font-['Pretendard:Regular',_sans-serif] text-[12px] leading-[0] text-nowrap text-yellow-800 not-italic">
                  <p className="leading-[16px] whitespace-pre">{tag}</p>
                </div>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobPostCard
