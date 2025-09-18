// 이 파일은 'badwords-ko' 라이브러리에 대한 TypeScript 타입 선언입니다
// 해당 패키지는 타입 정의가 제공되지 않아서 직접 작성했습니다.
declare module 'badwords-ko' {
  export default class Filter {
    constructor()
    addWords(...words: string[]): void //사용자 정의 금칙어 추가
    removeWords(...words: string[]): void //특정 금칙어 제거
    clean(text: string): string //입력된 문자열에서 욕설을 치환
    isProfane(text: string): boolean //입력된 문자열에 욕설이 포함되어 있는지 검사
  }
}
