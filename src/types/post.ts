export interface Author {
  id: bigint
  nickname: string
}

export interface Attachment {
  file_name: string
  file_url: string
}

export interface Lecture {
  thumbnail_image_url: string
  name: string
  instructor: string
  price: number
  url: string
}

export interface Tag {
  name: string
}

export interface Post {
  id: bigint
  uuid: string
  author: Author
  title: string
  content: string
  attachments: Attachment[]
  recruit_count: number
  cost: number
  lectures: Lecture[]
  tags: Tag[]
  deadline: string
  created_at: string
  view_count: number
  bookmark_count: number
}
