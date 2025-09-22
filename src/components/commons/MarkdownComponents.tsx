import React from 'react'
import { markdownStyles } from '@src/styles/markdownStyles'
import { cn } from '@src/utils/cn'

const styles = markdownStyles

// 헬퍼 함수
function createComponent<T extends keyof React.JSX.IntrinsicElements>(
  tag: T,
  styleClass: string
) {
  function Component(props: React.JSX.IntrinsicElements[T]) {
    const { className, ...rest } = props
    return React.createElement(tag, {
      ...rest,
      className: cn(styleClass, className as string),
    })
  }

  Component.displayName = `Markdown${tag.toString().charAt(0).toUpperCase() + tag.toString().slice(1)}`
  return Component
}

export const MarkdownComponents = {
  // 헤딩
  h1: createComponent('h1', styles.h1),
  h2: createComponent('h2', styles.h2),
  h3: createComponent('h3', styles.h3),
  h4: createComponent('h4', styles.h4),
  h5: createComponent('h5', styles.h5),
  h6: createComponent('h6', styles.h6),

  // 텍스트 요소
  p: createComponent('p', styles.p),
  ul: createComponent('ul', styles.ul),
  ol: createComponent('ol', styles.ol),
  li: createComponent('li', styles.li),
  blockquote: createComponent('blockquote', styles.blockquote),
  pre: createComponent('pre', styles.pre),
  a: createComponent('a', styles.a),
  strong: createComponent('strong', styles.strong),
  em: createComponent('em', styles.em),
  hr: createComponent('hr', styles.hr),

  // 테이블
  table: createComponent('table', styles.table),
  th: createComponent('th', styles.th),
  td: createComponent('td', styles.td),
  tr: createComponent('tr', styles.tr),

  // 이미지
  img: createComponent('img', styles.img),

  // 코드 (특수 처리 필요)
  code: function CodeComponent({
    className,
    ...props
  }: React.HTMLAttributes<HTMLElement>) {
    const isInline = !className?.includes('language-')
    return isInline ? (
      <code className={cn(styles.code, className)} {...props} />
    ) : (
      <code className={className} {...props} />
    )
  },
}
