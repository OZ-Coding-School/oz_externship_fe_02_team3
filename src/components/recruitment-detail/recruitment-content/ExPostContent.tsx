// 임시 데이터로 API 연결 시 삭제
export default function ExPostContent() {
  const s = {
    article: 'max-w-3xl mx-auto',
    title: 'text-2xl font-bold mb-4',
    paragraph: 'text-base leading-relaxed mb-6',
    sectionTitle: 'text-xl font-semibold mt-8',
    list: 'list-disc list-inside space-y-1 text-base leading-relaxed mb-6 ml-6 mt-3',
    image: 'w-full rounded-lg shadow mb-8',
  }

  return (
    <article className={s.article}>
      {/* 공고 제목 */}
      <h3 className={s.title}>Unity 게임 개발 프로젝트 팀원 모집</h3>
      <p className={s.paragraph}>
        Unity를 활용한 3D 게임 개발 프로젝트를 함께 진행할 팀원을 모집합니다!
      </p>

      {/* 프로젝트 소개 */}
      <h4 className={s.sectionTitle}>프로젝트 소개</h4>
      <ul className={s.list}>
        <li>
          <b>Unity 3D 게임 엔진</b> : 최신 Unity 2022.3 LTS 버전 활용
        </li>
        <li>
          <b>CM 프로젝트</b> : 게임 코어 시스템 구현
        </li>
        <li>
          <b>3D 모델링</b> : Blender를 활용한 3D 에셋 제작
        </li>
        <li>
          <b>게임 디자인</b> : 재미있고 흥미로운 게임플레이 설계
        </li>
      </ul>

      {/* 모집 대상 */}
      <h4 className={s.sectionTitle}>모집 대상</h4>
      <ul className={s.list}>
        <li>C# 기초 지식이 있으신 분</li>
        <li>Unity 엔진에 관심이 있으신 분</li>
        <li>게임 개발 경험을 쌓고 싶으신 분</li>
        <li>팀워크를 통해 성장하고 싶으신 분</li>
      </ul>

      {/* 프로젝트 일정 */}
      <h4 className={s.sectionTitle}>프로젝트 일정</h4>
      <ul className={s.list}>
        <li>기간 : 4개월 (2024년 12월 ~ 2025년 3월)</li>
        <li>방식 : 온라인/오프라인 병행 (월 1회 오프라인)</li>
        <li>미팅 : 주 3회 (화, 목, 토) 오후 7시</li>
      </ul>
      <img
        src="https://placehold.co/120x70?text=ex"
        alt="프로젝트 이미지"
        className={s.image}
      />

      {/* 개발 예정 게임 */}
      <h4 className={s.sectionTitle}>개발 예정 게임</h4>
      <p className={s.paragraph}>
        <b>3D 액션 어드벤처 게임</b>
      </p>
      <ul className={s.list}>
        <li>플레이어는 미지의 행성을 탐험하며 퍼즐을 해결</li>
        <li>몬스터와의 전투 시스템</li>
        <li>아이템 수집 및 캐릭터 성장 요소</li>
        <li>멀티플레이어 협동 모드</li>
      </ul>

      {/* 사용 기술 스택 */}
      <h4 className={s.sectionTitle}>사용 기술 스택</h4>
      <ul className={s.list}>
        <li>
          <b>게임 엔진</b> : Unity 2022.3 LTS
        </li>
        <li>
          <b>프로그래밍</b> : C#
        </li>
        <li>
          <b>버전 관리</b> : Git, GitHub
        </li>
        <li>
          <b>3D 모델링</b> : Blender
        </li>
        <li>
          <b>UI/UX 디자인</b> : Figma
        </li>
      </ul>

      <img
        src="https://placehold.co/120x70?text=ex"
        alt="게임 이미지"
        className={s.image}
      />

      {/* 예상 결과물 */}
      <h4 className={s.sectionTitle}>예상 결과물</h4>
      <ul className={s.list}>
        <li>완성된 3D 게임 프로토타입</li>
        <li>Steam 플랫폼 배포 경험</li>
        <li>게임 개발 프로세스 구축</li>
        <li>Unity 전문 개발자로 성장</li>
      </ul>
    </article>
  )
}
