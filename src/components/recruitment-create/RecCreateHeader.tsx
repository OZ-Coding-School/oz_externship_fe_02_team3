import BackButton from '@components/commons/BackButton'

export default function RecCreateHeader() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex h-16 w-full max-w-[832px] items-center">
        <BackButton />
        <div className="ml-4 flex flex-col">
          <p className="text-[30px] leading-9 font-bold text-gray-900">
            스터디 구인 공고 작성
          </p>
          <p className="text-[16px] leading-6 font-normal text-gray-600">
            스터디 그룹의 새로운 멤버를 모집하는 공고를 작성해보세요
          </p>
        </div>
      </div>
    </div>
  )
}
