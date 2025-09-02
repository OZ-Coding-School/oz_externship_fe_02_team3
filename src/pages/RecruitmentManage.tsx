import RecManageHeader from '@src/components/recruitment/manage/RecManageHeader'

const RecruitmentManage = () => {
  return (
    <div className="mx-auto h-auto max-w-[1440px] px-20">
      {/* 내부 시작 */}
      <div className="max-w-7xl p-8">
        {/* 1. 페이지 타이틀 (뒤로가기) , 공고관리 문구, 새 공고 작성하기 */}
        <div className="h-[80px] max-w-[1216px]">
          <RecManageHeader />
        </div>
        {/* 2. 통계 카드 */}
        {/* 3. 필터/정렬 */}
        {/* 4. 공고 목록 (주영님이 만들어주시는 컴포넌트 연결할 예정.) */}
      </div>
    </div>
  )
}

export default RecruitmentManage
