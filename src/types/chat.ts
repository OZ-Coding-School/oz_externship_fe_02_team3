// export interface ChatList {
//   id: number
//   uuid?: string  
//   title: string
//   date: string
//   unreadCount?: number
//   lastMessage: {  
//     sender: string
//     content: string
//   } | null
//   modifiedAt: string
//   participants: Array<{
//     name: string
//     status: 'online' | 'offline'
//   }>
//   messages: Array<{
//     id: number
//     sender: string
//     message: string
//     time: string
//     isOwn: boolean
//   }>
// }

export interface Chat {
  study_group_uuid: string
  study_group_name: string
  last_message: {
    sender_nickname: string
    content: string
    created_at: string
  } | null
  unread_count: number
}