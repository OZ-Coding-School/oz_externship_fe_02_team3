// src/mock/browser.ts
import { setupWorker } from 'msw/browser'
import { handlers } from './handler'
import { websocketHandlers } from './websocketHandlers'

export const worker = setupWorker(...handlers, ...websocketHandlers)
