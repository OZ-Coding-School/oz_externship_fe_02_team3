import Card from '@components/Card'
import DropDown from '@components/DropDown'
import JobPostCard from '@src/components/JobPostCard'
import { ChevronDown, FolderIcon } from 'lucide-react'
import './App.css'

import TestModal from './components/modal/TestModal'

function App() {
  const dropDownData = {
    dropdownTitle: '전체 카테고리',
    leftIcon: FolderIcon,
    rightIcon: ChevronDown,
  }
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

  return (
    <div>
      <DropDown {...dropDownData} />
      <Card {...cardData} />
      <JobPostCard {...JobPostCardProps} />
      <TestModal />
    </div>
  )
}

export default App
