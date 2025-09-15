export interface Chat {
  study_group_uuid: string
  study_group_name: string
  last_message: {
    sender_nickname: string
    content: string
    created_at: string
  } | null

  unread_count: number
  created_at: string
}

export interface MessagesResponse {
  next_cursor: string | null
  results: Array<{
    message_id: number
    sender: {
      user_uuid: string
      nickname: string
      profile_img_url: string
    }
    content: string
    created_at: string
  }>
}

export interface ChatMessage {
  message_id: number
  sender: {
    user_uuid: string
    nickname: string
    profile_img_url: string
  }
  content: string
  created_at: string
}
