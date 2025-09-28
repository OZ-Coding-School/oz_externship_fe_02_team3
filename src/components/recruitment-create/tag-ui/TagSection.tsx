import { useEffect, useState } from 'react'
import TagBox from './TagBox'
import TagSearchModal from './TagSearchModal'
import type { Tag } from '@src/types/tag'

interface Props {
  value?: Tag[]
  onChange?: React.Dispatch<React.SetStateAction<Tag[]>>
}

export default function TagSection({ value, onChange }: Props) {
  const [tags, setTags] = useState<Tag[]>(value ?? [])
  const [open, setOpen] = useState(false)

  useEffect(() => setTags(value ?? []), [value])

  const proxyChange: React.Dispatch<React.SetStateAction<Tag[]>> = (
    updater
  ) => {
    setTags((prev) => {
      const next =
        typeof updater === 'function'
          ? (updater as (p: Tag[]) => Tag[])(prev)
          : updater
      onChange?.(next)
      return next
    })
  }

  return (
    <div>
      <TagBox
        value={tags}
        onChange={proxyChange}
        onOpenSearch={() => setOpen(true)}
      />
      <TagSearchModal
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={(picked) => proxyChange(picked)}
        initialSelected={tags}
        max={5}
      />
    </div>
  )
}
