import { notificationHandlers } from './notifications'
import { tagHandlers } from './tags'
import { chatHandlers } from './chatHandlers'
import { applicationHandlers, applicationSubmitHandlers } from './applications'

export const handlers = [
  ...notificationHandlers,
  ...tagHandlers,
  ...chatHandlers,
  ...applicationHandlers,
  ...applicationSubmitHandlers,
]
