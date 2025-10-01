// src/mock/handlers/sseHandlers.ts
import { http, passthrough } from 'msw'

export const sseHandlers = [
  http.get('https://api.ozcoding.site/events/me', () => passthrough()),
  http.get('/events/me', () => passthrough()),
  http.get('https://ozcoding.site/events/me', () => passthrough()),
]
