import { notificationHandlers } from './notifications'
import { chatHandlers } from './chatHandlers'
import { applicationHandlers, applicationSubmitHandlers } from './applications'

export const handlers = [
  ...notificationHandlers,
  ...chatHandlers,
  ...applicationHandlers,
  ...applicationSubmitHandlers,
]
