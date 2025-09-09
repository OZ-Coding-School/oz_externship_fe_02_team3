import { useState } from 'react'

// 마크다운 미리보기에 사용되는 이미지 렌더링 component
export default function Img(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [err, setErr] = useState(false)
  if (err || !props.src)
    return <span className="text-gray-400">이미지를 불러올 수 없습니다.</span>
  return (
    <img
      {...props}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setErr(true)}
      className={`my-3 rounded-md border border-gray-200 ${props.className ?? ''}`}
      alt={props.alt ?? ''}
    />
  )
}
