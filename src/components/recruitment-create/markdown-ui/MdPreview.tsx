import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks'
import rehypeSanitize from 'rehype-sanitize'
import { mdSanitizeSchema } from './sanitizeSchema'
import Img from './useImageRender'

export default function MdPreview({
  value,
}: {
  value: string
  embedded?: boolean
}) {
  return (
    <div
      className={['bg-white p-3 text-sm', 'border-t border-gray-200'].join(' ')}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkBreaks]} // GFM + 개행(\n) 처리
        rehypePlugins={[[rehypeSanitize, mdSanitizeSchema]]} // XSS 방지 화이트리스트
        components={{
          // 디자인 일관성을 위해 주요 태그 스타일 오버라이드
          h1: (p) => <h1 {...p} className="mt-2 mb-2 text-2xl font-semibold" />,
          h2: (p) => <h2 {...p} className="mt-2 mb-2 text-xl font-semibold" />,
          h3: (p) => <h3 {...p} className="mt-2 mb-1 text-lg font-semibold" />,
          p: (p) => <p {...p} className="my-3" />,
          ul: (p) => <ul {...p} className="my-2 ml-5 list-disc" />,
          ol: (p) => <ol {...p} className="my-2 ml-5 list-decimal" />,
          li: (p) => <li {...p} className="my-1" />,
          a: (p) => (
            <a
              {...p}
              className="text-blue-600 underline"
              target="_blank"
              rel="noopener noreferrer"
            />
          ),
          code: (p) => (
            <code {...p} className="rounded bg-gray-100 px-1 py-0.5" />
          ),
          blockquote: (p) => (
            <blockquote
              {...p}
              className="my-2 border-l-4 pl-3 text-gray-700 italic"
            />
          ),
          input: (p) => <input {...p} className="mr-2 align-middle" disabled />,
          img: (p) => <Img {...p} />,
        }}
      >
        {value || '미리보기 내용이 없습니다.'}
      </ReactMarkdown>
    </div>
  )
}
