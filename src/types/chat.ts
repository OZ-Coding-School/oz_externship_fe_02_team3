export interface Chat {
  id: number
  title: string
  date: string
  unreadCount?: number
  lastMessage: {
    sender: string
    content: string
  }
  modifiedAt: string
  participants: Array<{
    name: string
    status: 'online' | 'offline'
  }>
  messages: Array<{
    id: number
    sender: string
    message: string
    time: string
    isOwn: boolean
  }>
}
