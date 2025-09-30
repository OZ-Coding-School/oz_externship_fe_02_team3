import { notificationHandlers } from './notifications'
import { chatHandlers } from './chatHandlers'
import { applicationHandlers, applicationSubmitHandlers } from './applications'
import { sseHandlers } from './sseHandlers'

export const handlers = [
  ...sseHandlers,
  ...notificationHandlers,
  ...chatHandlers,
  ...applicationHandlers,
  ...applicationSubmitHandlers,
]
