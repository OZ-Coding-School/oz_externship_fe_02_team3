import { useState } from 'react'
import Badge from '@components/Badge'
import Button from '@components/Button'
import Card from '@components/Card'
import DropDown from '@components/DropDown'
import JobPostCard from '@components/JobPostCard'
import PageLink from '@components/PageLink'
import CoursesPage from './pages/CoursesPage'
import {
  ChevronDown,
  FolderIcon,
  LogIn,
  MousePointer2,
  UserRoundPlus,
  X,
} from 'lucide-react'
import './App.css'

function App() {
  const cardData = {
    cardTitle: 'AWS 클라우드 아키텍처',
    author: '최자바',
    cardDescription:
      'AWS를 활용한 확장 가능한 클라우드 아키텍처 설계를 배웁니다.',
    reviewRating: 4.8,
    reviewCount: 2,
    originalPrice: 18000,
    price: 12900,
  }
  const JobPostCardProps = {
    id: 1,
    postTitle: 'Unity 게임 개발 프로젝트 팀원 모집',
    viewCount: 412,
    commentCount: 105,
    memberLimit: 6,
    deadline: '2025.01.15',
    courses: [
      'Unity 기초부터 심화까지',
      'C# 프로그래밍 완벽 가이드',
      '게임 개발 포트폴리오 제작',
    ],
    tags: ['Unity', '게임개발', '팀프로젝트', 'C#'],
    image: undefined,
  }

  // 강의 페이지 보기/숨기기 상태
  const [showCoursesPage, setShowCoursesPage] = useState(true)

  return (
    <div>
      {showCoursesPage ? (
        <div>
          {/* 강의 페이지 토글 버튼 */}
          <div className="fixed top-4 right-4 z-50">
            <button
              onClick={() => setShowCoursesPage(false)}
              className="rounded-lg bg-red-500 px-4 py-2 text-sm text-white"
            >
              컴포넌트 테스트 보기
            </button>
          </div>
          <CoursesPage />
        </div>
      ) : (
        <div>
          {/* 강의 페이지로 돌아가는 버튼 */}
          <div className="fixed top-4 right-4 z-50">
            <button
              onClick={() => setShowCoursesPage(true)}
              className="bg-primary-500 rounded-lg px-4 py-2 text-sm text-white"
            >
              강의 페이지 보기
            </button>
          </div>

          {/* 기존 컴포넌트 테스트들 */}
          <div className="space-y-4 p-4">
            {/* 드롭다운에서 아이콘이 있는 버전 */}
            <DropDown
              dropdownTitle="전체 카테고리"
              leftIcon={FolderIcon}
              rightIcon={ChevronDown}
            />
            {/* 드롭다운에서 아이콘이 없는 버전 */}
            <DropDown dropdownTitle="전체" />
            <Card {...cardData} />
            <JobPostCard {...JobPostCardProps} />
            {/* iconClassName 없는 버전 */}
            <PageLink pageLinkInnerText="로그인 후 공고 작성" icon={LogIn} />
            {/* iconClassName 있는 버전 */}
            <PageLink
              pageLinkInnerText="지원하기"
              icon={MousePointer2}
              iconClassName="rotate-[90deg]"
            />
            {/* outline 만 있는 버전 */}
            <PageLink
              pageLinkInnerText="회원가입하기"
              icon={UserRoundPlus}
              variant="outline"
            />
            {/* button 에서 아이콘이 있는 버전 */}
            <Button
              buttonInnerText="지원서 제출"
              icon={MousePointer2}
              iconClassName="rotate-[90deg]"
              size="base"
            />
            {/* button 에서 아이콘이 없고 border 만 있는 버전 */}
            <Button
              buttonInnerText="취소"
              size="base"
              variant="outline"
              bgColor="bg-transparent"
              borderColor="border-gray-300"
            />
            {/* button 에서 아이콘이 있으며, background color 만 있고, 텍스트 컬러 white 버전 */}
            <Button
              buttonInnerText="거절"
              size="base"
              variant="outline"
              bgColor="bg-danger-500"
              borderColor="border-danger-500"
              textColor="text-white"
              icon={X}
            />
            {/* button 에서 disabled 버전 */}
            <Button
              buttonInnerText="선택 완료"
              size="base"
              variant="outline"
              disabled
            />
            {/* 뱃지 */}
            <Badge
              badgeTitle="거절됨"
              sideClass="bg-danger-100 text-danger-800"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default App
