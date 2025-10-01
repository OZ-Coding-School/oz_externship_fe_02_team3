## 😎프로젝트 소개
오즈 익스턴십은 실무 환경에서의 개발 경험을 미리 가져볼 수 있는 과정으로 정해진 기한 내에 기능을 개발하는 프로젝트 입니다.
저희 팀은 구인 공고 페이지와 구인 공고 관리 페이지, 강의 목록 페이지를 담당하였습니다.
>  2025.08.28 - 2025.10.01


## 🔗배포 링크
**- [구인 공고 페이지](https://learn.ozcoding.site/recruitment)**

**- [구인 공고 관리 페이지](https://learn.ozcoding.site/recruitment/manage)**

**- [강의 목록 페이지](https://learn.ozcoding.site/courses)**


## 🎶시연 영상 및 발표자료
### [발표 자료](https://github.com/user-attachments/files/22630312/_.3.pdf)


## ✒️기술 스택
<img width="1840" height="1258" alt="System_Architecture" src="https://github.com/user-attachments/assets/e84d3ab3-7309-4094-bed2-bc050b46a7c0" />


## 👥팀원 구성
| [![jamminP](https://github.com/jamminP.png)](https://github.com/jamminP) | [![jjub0217](https://github.com/jjub0217.png)](https://github.com/jjub0217) | [![wnduddlekd](https://github.com/wnduddlekd.png)](https://github.com/wnduddlekd) | [![people9953](https://github.com/people9953.png)](https://github.com/people9953) | [![Jungmaba](https://github.com/Jungmaba.png)](https://github.com/Jungmaba) |
|----|----|----|----|----|
| 박재민 | 강주현 | 박주영 | 김태현 | 정동근 |


## 📌프로젝트 규칙
### Code Convention
**1. Path**
- 같은 폴더 내 파일을 import할 경우 → 상대경로 사용
- 그 외 경로 → 절대경로 사용
```ts
// 같은 폴더 내
import Button from './Button'

// 다른 폴더
import Header from 'components/Header'
```

**2. Export**
- 컴포넌트 생성 시 → Default Export 사용
```ts
// Default Export
export default function MyComponent() {
  return <div>MyComponent</div>
}
```

- constants 등 → Named Export 사용
```ts
// Named Export
export const API_URL = 'https://example.com/api'
```


**3. Arrow Function**

모든 함수는 화살표 함수(Arrow Function) 사용
```ts
const sum = (a: number, b: number) => a + b
```


**4. Type**

인터페이스(Interface)로 통일
```
interface User {
  id: number
  name: string
}
```


### Git Convention
**1. 브랜치 컨벤션**
- 브랜치 네이밍은 전부 소문자  `ex) feature/24--modal-ui`

| 종류     | 설명                                       | 예시                          |
| -------- | ------------------------------------------ | ----------------------------- |
| main     | 메인 브랜치                                | main                          |
| develop  | 배포 전 개발 브랜치                        | develop                       |
| feature  | 새로운 기능 개발                           | feature/32--login-ui          |
| hotfix   | 긴급 수정                                  | hotfix/101--critical-bug      |
| release  | 배포용 브랜치                              | release/v1.2.0                |
| fix      | 버그 수정 (이미 개발된 컴포넌트 기능 개선) | fix/45--button-click-bug      |
| refactor | 코드 구조/네이밍 변경 (기능 유지)          | refactor/51--file-cleanup     |
| chore    | 빌드, 환경, 설정, 정리 작업                | chore/12--update-dependencies |
| test     | 테스트 코드 작성/수정                      | test/22--login-unit-test      |
| docs     | 문서 작업만                                | docs/3--readme-update         |


**2. 커밋 컨벤션**
- 타입: 커밋 내용(#이슈번호)  `ex) feat: 로그인 ui 작업(#32)`

| Type     | 설명                                            |
| -------- | ----------------------------------------------- |
| feat     | 새로운 기능 추가                                |
| fix      | 버그 수정                                       |
| refactor | 리팩토링 (동작 변경 없음, 구조 개선)            |
| design   | CSS 및 UI 디자인 변경                           |
| style    | 코드 포맷팅, 세미콜론 누락 등 기능 변경 없음    |
| test     | 테스트 코드 추가/수정/삭제                      |
| chore    | 기타 변경사항 (빌드 스크립트, 패키지 매니저 등) |
| init     | 프로젝트 초기 생성                              |
| rename   | 파일/폴더명 수정 또는 이동                      |
| remove   | 파일 삭제                                       |
| docs     | 문서 작성/수정                                  |


**3. PR 컨벤션**
- 타입: 이슈 내용  `ex) feat: 로그인 ui 작업`


