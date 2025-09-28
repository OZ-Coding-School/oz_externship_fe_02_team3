import { useEffect, useState } from 'react'
import TagBox from './TagBox'
import TagSearchModal from './TagSearchModal'
import type { Tag } from '@src/types/tag'

export default function TagSection({
  value,
  onChange,
}: {
  value?: Tag[]
  onChange?: React.Dispatch<React.SetStateAction<Tag[]>>
}) {
  const [inner, setInner] = useState<Tag[]>(value ?? [])
  const controlledValue = value ?? inner

  useEffect(() => {
    if (value) setInner(value)
  }, [value])

  const dispatch: React.Dispatch<React.SetStateAction<Tag[]>> = (action) => {
    if (typeof action === 'function') {
      setInner((prev) => {
        const next = (action as (p: Tag[]) => Tag[])(prev)
        onChange?.(next)
        return next
      })
    } else {
      setInner(action)
      onChange?.(action)
    }
  }

  const [open, setOpen] = useState(false)

  return (
    <div>
      <TagBox
        value={controlledValue}
        onChange={dispatch}
        onOpenSearch={() => setOpen(true)}
      />
      <TagSearchModal
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={(next) => dispatch(next)}
        initialSelected={controlledValue}
        max={5}
      />
    </div>
  )
}
