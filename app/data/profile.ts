export type Fact = {
  label: string
  value: string
}

export type ContactLink = {
  label: string
  text: string
  href: string
}

export const profile = {
  name: 'Henry Burke',
  host: 'henry@bentonville',
  lastLogin: 'Last login: Tue Sep 29 09:41:12 on ttys001',
  about:
    'Software engineer at Walmart Global Tech, building tools for pharmacy teams across 4,500+ stores. On the side I co-own BurntBase, a computer vision app with 86,000+ users.',
}

export const facts: Fact[] = [
  { label: 'loc', value: 'Bentonville, AR' },
  { label: 'edu', value: "William & Mary, CS '25" },
  { label: 'status', value: 'shipping' },
]

export const contactLinks: ContactLink[] = [
  { label: 'github', text: 'github.com/Pigf00d', href: 'https://github.com/Pigf00d' },
  { label: 'linkedin', text: 'linkedin.com/in/hqburke', href: 'https://linkedin.com/in/hqburke' },
  { label: 'email', text: 'hqbcodes@gmail.com', href: 'mailto:hqbcodes@gmail.com' },
  { label: 'resume', text: '[RESUME URL]', href: '#contact' },
]
