import type { StaticImageData } from 'next/image'
import burntbaseShot from '@/public/burntbase.png'

export type ProjectMedia =
  | { kind: 'image'; src: StaticImageData; alt: string }
  | { kind: 'placeholder'; label: string; path?: string; alt: string }

export type Project = {
  /** Shown as `./<path>` in the listing line. */
  path: string
  /** A directory gets `drwxr-xr-x`, a file gets `-rw-r--r--`. */
  type: 'dir' | 'file'
  when: string
  title: string
  /** Opens when anywhere on the card is clicked. */
  href?: string
  stat?: { value: string; caption: string }
  description: string
  tags: string[]
  link?: { label: string; href: string }
  media: ProjectMedia
}

export const projects: Project[] = [
  {
    path: 'burntbase',
    type: 'dir',
    when: '2025 → now',
    title: 'BurntBase',
    href: 'https://burntbase.com',
    description:
      'A Clash of Clans base analyzer I co-own. A YOLO vision model trained on 34 building types reads a screenshot of your base, and one shared core powers every platform.',
    tags: ['react-native', 'yolo', 'revenuecat', 'stripe'],
    media: {
      kind: 'image',
      src: burntbaseShot,
      alt: 'BurntBase: instantly scan bases for 3-star attacks',
    },
  },
  {
    path: 'urinalbench',
    type: 'dir',
    when: '2026 · in progress',
    title: 'UrinalBench',
    stat: { value: 'AI vs. humans', caption: 'who picks the right urinal' },
    description:
      'An agent benchmark that drops models into bathroom layouts with different urinal counts, sometimes stalls too, and compares their picks against each other and against real people. No reward weighting, just the choice.',
    tags: ['agents', 'evals', 'benchmarks'],
    media: {
      kind: 'placeholder',
      label: '[ COMING SOON ]',
      alt: 'UrinalBench screenshot coming soon',
    },
  },
  // Home Lab is parked for now; uncomment to bring the card back.
  // {
  //   path: 'homelab',
  //   type: 'dir',
  //   when: 'ongoing',
  //   title: 'Home Lab',
  //   stat: { value: 'self-hosted', caption: 'local AI agents on a Mac mini' },
  //   description:
  //     'My Mac mini runs as a home server for local AI agents. Each one lives in a Docker sandbox under its own macOS user, with Ollama as the model backend.',
  //   tags: ['docker', 'ollama', 'macos'],
  //   media: {
  //     kind: 'placeholder',
  //     label: '[ PHOTO ]',
  //     path: 'img/homelab.jpg',
  //     alt: 'Home lab photo placeholder',
  //   },
  // },
  {
    path: 'icsme-paper.pdf',
    type: 'file',
    when: 'research',
    title: 'LLMs for Code',
    stat: { value: 'ICSME', caption: 'published, SEMERU lab' },
    description:
      'I co-authored a paper on large language models for source code with the SEMERU lab at William & Mary.',
    tags: ['llms', 'software-engineering'],
    link: { label: 'read paper ↗', href: 'https://arxiv.org/abs/2308.12415' },
    media: {
      kind: 'placeholder',
      label: '[ FIGURE ]',
      path: 'img/icsme-paper.png',
      alt: 'Paper figure placeholder',
    },
  },
]
