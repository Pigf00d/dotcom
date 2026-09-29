export type Post = {
  /** ISO date (YYYY-MM-DD); the list is sorted on it, newest first. */
  date: string
  title: string
  summary: string
  readTime: string
  href: string
}

// Placeholder rows until real posts exist.
export const posts: Post[] = Array.from({ length: 4 }, () => ({
  date: '[YYYY-MM-DD]',
  title: '[POST TITLE]',
  summary: '[One-line summary of the post]',
  readTime: '[N] min',
  href: '#blog',
}))

export const allPostsHref = '#blog'
