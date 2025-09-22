import Badge from '@components/commons/Badge'
import type { Tag } from '@src/types/post'

interface BannerTagsProps {
  tags: Tag[]
}

export function BannerTags({ tags }: BannerTagsProps) {
  return (
    <div className="flex gap-2">
      {tags.map((tag, index) => (
        <Badge
          key={`${tag.name}-${index}`}
          badgeTitle={tag.name}
          className="bg-primary-100 text-primary-800"
        />
      ))}
    </div>
  )
}
