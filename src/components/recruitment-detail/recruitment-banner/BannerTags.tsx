import Badge from '@components/commons/Badge'

interface BannerTagsProps {
  tags: string[]
}

export function BannerTags({ tags }: BannerTagsProps) {
  return (
    <div className="flex gap-2">
      {tags.map((tag) => (
        <Badge
          key={tag}
          badgeTitle={tag}
          className="bg-primary-100 text-primary-800"
        />
      ))}
    </div>
  )
}
