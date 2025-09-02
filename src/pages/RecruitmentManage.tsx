import RecManageHeader from '@src/components/recruitment/manage/RecManageHeader'
import RecManageTotalCard from '@src/components/recruitment/manage/RecManageTotalCard'

const RecruitmentManage = () => {
  return (
    <div className="mx-auto h-auto max-w-[1440px] px-20">
      {/* 내부 시작 */}
      <div className="max-w-7xl p-8">
        {/* 1. 페이지 타이틀 (뒤로가기) , 공고관리 문구, 새 공고 작성하기 */}
        <div className="rec-manage-section h-[80px]">
          <RecManageHeader />
        </div>
        {/* 2. 통계 카드 */}
        <div className="rec-manage-section h-[102px]">
          <RecManageTotalCard />
        </div>
        {/* 3. 필터/정렬 */}
        <div className="rec-manage-section h-[117px]"></div>
        {/* 4. 공고 목록 (주영님이 만들어주시는 컴포넌트 연결할 예정.) */}
      </div>
    </div>
  )
}

export default RecruitmentManage
