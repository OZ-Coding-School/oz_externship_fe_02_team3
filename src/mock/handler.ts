// src/mocks/handler.ts
import { notificationHandlers } from './notificationHandlers'
import { chatHandlers } from './chatHandlers'

export const handlers = [...notificationHandlers, ...chatHandlers]
