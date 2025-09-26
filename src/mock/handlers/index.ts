import { notificationHandlers } from './notifications'
import { tagHandlers } from './tags'
import { chatHandlers } from './chatHandlers'
import { recruitManageHandlers } from '../recruitManageHandlers'
import { recruitmentEditHandlers } from '../recruitmentEditHandlers'

export const handlers = [
  ...notificationHandlers,
  ...tagHandlers,
  ...chatHandlers,
  ...recruitManageHandlers,
  ...recruitmentEditHandlers,
]
