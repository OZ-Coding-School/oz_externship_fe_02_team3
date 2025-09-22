export const TOAST_MESSAGES = {
  IMAGE: {
    LIMIT: (max: number) => ({
      title: '이미지 업로드 제한',
      content: `이미지는 최대 ${max}장까지 업로드할 수 있어요.`,
    }),
    NOT_IMAGE: {
      title: '이미지 파일만 업로드',
      content: 'PNG, JPG, GIF, WEBP 등을 지원해요.',
    },
    UPLOAD_FAIL: (msg?: string) => ({
      title: '업로드 실패',
      content: msg || '이미지 업로드 중 오류가 발생했습니다.',
    }),
  },
} as const
