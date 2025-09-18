import { useState } from 'react'
import TagBox from './TagBox'
import TagSearchModal from './TagSearchModal'
import type { Tag } from '@src/types/tag'

export default function TagSection() {
  const [tags, setTags] = useState<Tag[]>([])
  const [open, setOpen] = useState(false)

  return (
    <>
      <TagBox
        value={tags}
        onChange={setTags}
        onOpenSearch={() => setOpen(true)}
      />
      <TagSearchModal
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={setTags}
        initialSelected={tags}
        max={5}
      />
    </>
  )
}
