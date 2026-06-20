'use client';

import styles from './page.module.css';

const techs = [
  { name: 'React', icon: 'react/react-original.svg' },
  { name: 'Next.js', icon: 'nextjs/nextjs-original.svg' },
  { name: 'Svelte', icon: 'svelte/svelte-original.svg' },
  { name: 'Java', icon: 'java/java-original.svg' },
  { name: 'Python', icon: 'python/python-original.svg' },
  { name: 'JavaScript', icon: 'javascript/javascript-original.svg' },
  { name: 'TypeScript', icon: 'typescript/typescript-original.svg' },
  { name: 'Spring Boot', icon: 'spring/spring-original.svg' },
  { name: 'C', icon: 'c/c-original.svg' },
  { name: 'C++', icon: 'cplusplus/cplusplus-original.svg' },
  { name: 'SQL', icon: 'azuresqldatabase/azuresqldatabase-original.svg' },
  { name: 'Kafka', icon: 'apachekafka/apachekafka-original.svg' },
  { name: 'Kubernetes', icon: 'kubernetes/kubernetes-original.svg' },
  { name: 'Jenkins', icon: 'jenkins/jenkins-original.svg' },
  { name: 'HTML', icon: 'html5/html5-original.svg' },
  { name: 'CSS', icon: 'css3/css3-original.svg' },
  { name: 'Git', icon: 'git/git-original.svg' },
  { name: 'GitHub', icon: 'github/github-original.svg' },
  { name: 'PyTorch', icon: 'pytorch/pytorch-original.svg' },
  { name: 'Pandas', icon: 'pandas/pandas-original.svg' },
  { name: 'NumPy', icon: 'numpy/numpy-original.svg' },
];

const CDN = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/';

export default function TechCarousel() {
  const items = [...techs, ...techs];

  return (
    <div className={styles.carousel}>
      <div className={styles.carouselTrack}>
        {items.map((tech, i) => (
          <div key={`${tech.name}-${i}`} className={styles.carouselItem}>
            <img
              src={`${CDN}${tech.icon}`}
              alt={tech.name}
              className={styles.carouselIcon}
              loading="lazy"
            />
            <span className={styles.carouselLabel}>{tech.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
