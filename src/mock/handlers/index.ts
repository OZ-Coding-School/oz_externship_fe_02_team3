import { notificationHandlers } from './notifications'
import { tagHandlers } from './tags'
import { chatHandlers } from './chatHandlers'
import { recruitManageHandlers } from '../recruitManageHandlers'

export const handlers = [
  ...notificationHandlers,
  ...tagHandlers,
  ...chatHandlers,
  ...recruitManageHandlers,
]
