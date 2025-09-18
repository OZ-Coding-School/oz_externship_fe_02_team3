import { notificationHandlers } from './notifications'
import { tagHandlers } from './tags'

export const handlers = [...notificationHandlers, ...tagHandlers]
