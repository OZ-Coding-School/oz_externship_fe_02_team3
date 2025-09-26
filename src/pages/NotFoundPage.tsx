import { EXTERNAL } from '@src/constants/external'
import { ArrowRight } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="h-[100vh] w-full bg-white px-6 py-6">
      <div className="pb-4">
        <p className="pb-1 text-[18px] font-semibold text-gray-900">
          404 페이지
        </p>
        <p className="text-[14px] font-normal text-gray-600">
          유저가 잘못된 경로로 접근하는 경우
        </p>
      </div>
      <div>
        <p className="pb-3 text-[14px] font-normal text-gray-700">미리보기</p>

        <div className="flex flex-col items-center justify-center rounded-[8px] border border-gray-200 bg-gray-50 p-[25px]">
          <p className="text-primary-500 text-[96px] font-bold">404</p>
          <p className="pb-5 text-[32px] font-medium text-gray-700">
            찾으시는 페이지가 없습니다
          </p>
          <p className="max-w-[640px] pb-7 text-center text-[20px] font-normal text-gray-700">
            방문하시려는 페이지의 주소가 잘못 입력되었거나, 삭제되어 사용하실 수
            없습니다. 입력하신 주소가 정확한지 다시 한번 확인해주세요.
          </p>

          <a
            href={EXTERNAL.ACCOUNT_ROOT}
            className="bg-primary-500 flex items-center justify-center gap-1 rounded-[8px] border-none px-6 py-3 text-white"
          >
            홈으로 가기
            <ArrowRight size={20} />
          </a>
        </div>
      </div>
    </div>
  )
}
