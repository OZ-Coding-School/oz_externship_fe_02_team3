import { ONLY_NUMBER_RE } from '@src/constants/receditmessage'

export const parseCapacity = (capacityName?: string) =>
  Number((capacityName ?? '1').replace(ONLY_NUMBER_RE, '')) || 1

export const toFinalPrice = (raw: string, fallback: string | number) =>
  Number(String(raw || fallback).replace(/,/g, '')) || 0
