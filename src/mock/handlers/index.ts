import { notificationHandlers } from './notifications'
import { tagHandlers } from './tags'
import { chatHandlers } from './chatHandlers'

export const handlers = [
  ...notificationHandlers,
  ...tagHandlers,
  ...chatHandlers,
]
