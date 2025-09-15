import { useState } from 'react'

export default function PriceInput() {
  const [value, setValue] = useState<string>('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/,/g, '')

    if (!isNaN(Number(raw))) {
      setValue(raw)
    }
  }

  const formatNumber = (num: string) => {
    return new Intl.NumberFormat('ko-KR').format(Number(num))
  }

  return (
    <input
      type="text"
      value={value ? formatNumber(value) : ''}
      onChange={handleChange}
      placeholder="미입력시 강의 비용 자동 계산"
      className="w-full rounded-[8px] border border-gray-300 px-[17px] py-[13px] focus:outline-none"
    />
  )
}
