import type {
  ApplicationDetail,
  ApplicationsResponse,
} from '@src/types/applicant'

export const dummyApplicationsPage1: ApplicationsResponse = {
  next_cursor: 'a1b2c3d4e5',
  results: [
    {
      application_id: 1,
      applicant: {
        nickname: '홍길동',
        gender: 'M',
        profile_img_url: 'https://i.pravatar.cc/150?img=3',
      },
      available_time: '평일 저녁 7~10시, 주말 오후 시간대 참여 가능합니다.',
      has_study_experience: true,
      status: 'PENDING',
      applied_at: '2025-09-02T14:30:00',
    },
    {
      application_id: 2,
      applicant: {
        nickname: '김민지',
        gender: 'F',
        profile_img_url: 'https://i.pravatar.cc/150?img=5',
      },
      available_time: '화요일, 목요일 저녁 7~10시',
      has_study_experience: true,
      status: 'APPROVED',
      applied_at: '2025-09-01T11:15:00',
    },
    {
      application_id: 3,
      applicant: {
        nickname: '박개발자',
        gender: 'M',
        profile_img_url: null,
      },
      available_time: '주 3회 이상 참여 가능',
      has_study_experience: false,
      status: 'REJECTED',
      applied_at: '2025-08-30T16:45:00',
    },
    {
      application_id: 4,
      applicant: {
        nickname: '정동근',
        gender: 'M',
        profile_img_url: 'https://i.pravatar.cc/150?img=7',
      },
      available_time: '주 3회 이상 참여 가능',
      has_study_experience: false,
      status: 'PENDING',
      applied_at: '2025-08-30T16:45:00',
    },
  ],
}

export const dummyApplicationDetailById: Record<number, ApplicationDetail> = {
  1: {
    applicant_info: {
      nickname: '홍길동',
      gender: 'M',
      profile_img_url: 'https://i.pravatar.cc/150?img=3',
    },
    introduction: '안녕하세요, 열정적인 개발자 홍길동입니다.',
    motivation:
      '프론트엔드 실력을 더 키우고 싶어서 지원했습니다. 협업 경험도 쌓고 싶습니다.',
    study_goal: '팀원들과 협업하며 실무 감각을 익히는 것이 목표입니다.',
    available_times: '평일 저녁 7~10시, 주말 오후 시간대 참여 가능합니다.',
    has_study_experience: true,
    specific_experience:
      '작년에 사이드 프로젝트로 2개의 스터디를 진행했습니다.',
    status: 'PENDING',
    applied_at: '2025-09-02T14:30:00',
  },
  2: {
    applicant_info: {
      nickname: '김민지',
      gender: 'F',
      profile_img_url: 'https://i.pravatar.cc/150?img=5',
    },
    introduction: '디자인과 개발을 함께 배우고 있는 김민지입니다.',
    motivation: '풀스택 역량을 기르고 싶습니다.',
    study_goal: '작은 서비스라도 직접 기획부터 개발까지 완성하고 싶습니다.',
    available_times: '화요일, 목요일 저녁 7~10시',
    has_study_experience: true,
    specific_experience: '대학교에서 1년간 스터디 운영 경험이 있습니다.',
    status: 'APPROVED',
    applied_at: '2025-09-01T11:15:00',
  },
  3: {
    applicant_info: {
      nickname: '박개발자',
      gender: 'M',
      profile_img_url: null,
    },
    introduction: '개발을 막 시작한 박개발자입니다.',
    motivation: '꾸준히 공부하는 습관을 들이고 싶어서 신청했습니다.',
    study_goal: '기초 실력을 튼튼히 다지고 싶습니다.',
    available_times: '주 3회 이상 참여 가능',
    has_study_experience: false,
    specific_experience: '스터디 경험은 아직 없습니다.',
    status: 'REJECTED',
    applied_at: '2025-08-30T16:45:00',
  },
  4: {
    applicant_info: {
      nickname: '정동근',
      gender: 'M',
      profile_img_url: 'https://i.pravatar.cc/150?img=7',
    },
    introduction: '안녕하세요, 동근입니다.',
    motivation: '협업 프로젝트 경험을 쌓고 싶습니다.',
    study_goal: '프론트엔드 개발자로 취업 준비를 하고 있습니다.',
    available_times: '주 3회 이상 참여 가능',
    has_study_experience: false,
    specific_experience: '스터디 경험은 없지만 회사 프로젝트 경험은 있습니다.',
    status: 'PENDING',
    applied_at: '2025-08-30T16:45:00',
  },
}
