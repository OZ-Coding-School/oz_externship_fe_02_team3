import { useRef } from 'react'

export function useMdCommands(onChange: (v: string) => void) {
  const taRef = useRef<HTMLTextAreaElement>(null)

  // #1.공통 헬퍼: textarea 참조를 안전하게 얻고
  // - 조작 함수 실행 → onChange 호출 → 포커스 유지
  const withTA = (fn: (ta: HTMLTextAreaElement) => void) => {
    const ta = taRef.current
    if (!ta) return
    fn(ta)
    onChange(ta.value)
    ta.focus()
  }

  // #2. 토큰 버튼: 선택 영역을 인라인 토큰(pre/post)로 감싸기 (굵게/기울임/코드)
  const wrapInline = (pre: string, post = pre) =>
    withTA((ta) => {
      const { selectionStart: s, selectionEnd: e, value: v } = ta
      ta.setRangeText(`${pre}${v.slice(s, e)}${post}`, s, e, 'end')
    })

  /* #3. 링크 삽입:
   * - 선택 영역이 있으면 '선택 영역을 URL'로 간주하고 [Link](선택URL)로 감쌉니다.
   * - 선택이 없으면 커서 주변 '토큰(공백으로 구분된 단어/URL)'을 찾아 같은 처리.
   * - 둘 다 없으면 빈 링크 [Link]()를 넣습니다. (사용자가 이후 채우기 쉽게)
   */
  const insertLink = () =>
    withTA((ta) => {
      const { selectionStart: s, selectionEnd: e, value: v } = ta
      const wrap = (url: string) => `[Link](${url})`

      // if: 선택이 있으면 그대로 URL로 사용
      if (s !== e) {
        const selected = v.slice(s, e).trim()
        ta.setRangeText(wrap(selected), s, e, 'end')
        return
      }

      // if: 선택이 없으면 커서 주변의 "토큰(공백으로 구분된 단어/URL)" 잡기
      const isSpace = (ch: string) => /\s/.test(ch)
      let L = s
      while (L > 0 && !isSpace(v[L - 1])) L--
      let R = e
      while (R < v.length && !isSpace(v[R])) R++

      const token = v.slice(L, R).trim()
      if (token) {
        ta.setSelectionRange(L, R)
        ta.setRangeText(wrap(token), L, R, 'end')
      } else {
        // if: 아무것도 없으면 빈 링크 삽입
        ta.setRangeText('[Link]()', s, e, 'end')
      }
    })

  /* #4. 블록 토글(라인 prefix 토글):
   * - 선택된 줄들의 앞에 prefix를 붙이거나, 이미 있으면 제거합니다.
   * - 여러 줄 선택 시 각 줄에 동일 규칙을 적용합니다.
   * - 정규식 특수문자는 이스케이프하여 안전하게 처리합니다.
   */
  const toggleLinePrefix = (prefix: string, removeRe?: RegExp) =>
    withTA((ta) => {
      const { selectionStart: s, selectionEnd: e, value: v } = ta
      const start = v.lastIndexOf('\n', s - 1) + 1
      const nextNL = v.indexOf('\n', e)
      const end = e === v.length ? e : nextNL === -1 ? v.length : nextNL
      const block = v.slice(start, end)
      const lines = block.split('\n')
      const re =
        removeRe ??
        new RegExp(`^${prefix.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')}`)
      const allHave = lines.every((l) => re.test(l))
      const next = lines
        .map((l) =>
          allHave ? l.replace(re, '') : l ? `${prefix}${l}` : prefix
        )
        .join('\n')
      ta.setRangeText(next, start, end, 'end')
    })

  const toggleH1 = () => toggleLinePrefix('# ', /^#\s+/)
  const toggleUl = () => toggleLinePrefix('- ', /^-\s+/)
  const toggleOl = () => toggleLinePrefix('1. ', /^\d+\.\s+/)

  return { taRef, wrapInline, insertLink, toggleH1, toggleUl, toggleOl }
}
