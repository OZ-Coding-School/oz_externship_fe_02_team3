import { notificationHandlers } from './notifications'
import { tagHandlers } from './tags'
import { chatHandlers } from './chatHandlers'
import { recruitmentEditHandlers } from '../recruitmentEditHandlers'
import { applicationHandlers, applicationSubmitHandlers } from './applications'

export const handlers = [
  ...notificationHandlers,
  ...tagHandlers,
  ...chatHandlers,
  ...recruitmentEditHandlers,
  ...applicationHandlers,
  ...applicationSubmitHandlers,
]
