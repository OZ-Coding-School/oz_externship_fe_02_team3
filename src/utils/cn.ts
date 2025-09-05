<<<<<<< HEAD
export const cn = (
  ...classes: (string | undefined | null | boolean)[]
): string => {
  return classes.filter(Boolean).join(' ')
=======
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs))
>>>>>>> 73aacfec757e4f136a2007d7b71ede96103d64a9
}
