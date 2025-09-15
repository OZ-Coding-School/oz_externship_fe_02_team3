import { useState } from 'react'
import DropDown from '../commons/dropdown/DropDown'
import Calendar from '../commons/calendar/Calendar'

const studyGroup = [
  { id: 1, name: '스터디 그룹1' },
  { id: 2, name: '스터디 그룹2' },
  { id: 3, name: '스터디 그룹3' },
  { id: 4, name: '스터디 그룹4' },
]

const capacityGroup = [
  { id: 1, name: '스터디 그룹1' },
  { id: 2, name: '스터디 그룹2' },
  { id: 3, name: '스터디 그룹3' },
  { id: 4, name: '스터디 그룹4' },
]

export default function RecBasicInfo() {
  const [selectedGroup, setSelectedGroup] = useState<string>()
  const [selectedCapacity, setSelectedCapacity] = useState<string>()
  const [deadLine, setDeadLine] = useState<Date | null>(null)

  return (
    <div className="w-full max-w-[832px] rounded-xl border border-gray-200 bg-white p-6 text-[#111827]">
      <p className="text-[20px] leading-7 font-semibold">기본 정보</p>
      {/* 공고 제목 field*/}
      <label className="mt-6 mb-2 block text-sm leading-5 font-medium text-[#374151]">
        공고 제목
        <span className="text-[#EF4444]"> *</span>
      </label>
      <input
        type="text"
        className="h-[50px] w-full rounded-lg border border-gray-300 px-4 text-gray-900 placeholder:text-gray-400"
        aria-label="공고 제목 input"
        placeholder="예: React 스터디 함께하실 분을 찾습니다!"
      />

      {/* 대상 스터디 그룹 field*/}
      <label className="mt-6 mb-2 block text-sm leading-5 font-medium text-[#374151]">
        대상 스터디 그룹
        <span className="text-[#EF4444]"> *</span>
      </label>
      <DropDown
        selected={selectedGroup}
        options={studyGroup}
        onSelect={setSelectedGroup}
        placeholder="스터디 그룹을 선택해주세요"
      />

      {/* 공고 마감 기한 & 예상 모집 인원 field*/}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* 공고 마감 기한 field */}
        <div>
          <label className="mb-2 block text-sm leading-5 font-medium text-[#374151]">
            공고 마감 기한
            <span className="text-[#EF4444]"> *</span>
          </label>
          <Calendar
            value={deadLine}
            onChange={setDeadLine}
            fullWidth
            placeholder="-/-/-"
          />
        </div>

        {/* 예상 모집 인원 field */}
        <div>
          <label className="mb-2 block text-sm leading-5 font-medium text-[#374151]">
            예상 모집 인원
            <span className="text-[#EF4444]"> *</span>
          </label>
          <DropDown
            selected={selectedCapacity}
            options={capacityGroup}
            onSelect={setSelectedCapacity}
            placeholder="1명"
          />
        </div>
      </div>
    </div>
  )
}
