export const NOTIFICATION_TYPE = {
  APPLICATION: 'application',
  APPROVAL: 'approval',
  REJECTION: 'rejection',
  JOIN: 'join',
  STUDY_END: 'study_end',
  REMINDER: 'reminder',
} as const

export const NOTIFICATION_ICON_CONFIG = [
  {
    type: NOTIFICATION_TYPE.APPLICATION,
    bgColor: 'bg-blue-100',
    strokeColor: 'stroke-[#2563EB]',
    icon: 'UserRoundPlus',
  },
  {
    type: NOTIFICATION_TYPE.APPROVAL,
    bgColor: 'bg-green-100',
    strokeColor: 'stroke-[#16A34A]',
    icon: 'Check',
  },
  {
    type: NOTIFICATION_TYPE.REJECTION,
    bgColor: 'bg-red-100',
    strokeColor: 'stroke-[#DC2626]',
    icon: 'X',
  },
  {
    type: NOTIFICATION_TYPE.JOIN,
    bgColor: 'bg-purple-100',
    strokeColor: 'stroke-[#9333EA]',
    icon: 'UsersRound',
  },
  {
    type: NOTIFICATION_TYPE.STUDY_END,
    bgColor: 'bg-orange-100',
    strokeColor: 'stroke-[#EA580C]',
    icon: 'CalendarCheck',
  },
]

export const Z_INDEX = {
  HEADER: 2,
  DROPDOWN: 2,
  MODAL: 400,
  POPUP: 600,
  TOAST: 1000,
} as const

export const NAV_ITEMS = [
  { to: '/courses', label: '강의목록' },
  { to: '/study-group', label: '스터디 그룹' },
  { to: '/recruitment', label: '구인 공고' },
]
