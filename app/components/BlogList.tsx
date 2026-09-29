// The post list is parked until there are real posts; uncomment these imports
// and the JSX below to bring it back.
// import { allPostsHref, posts } from '../data/posts'
import ComingSoon from './ComingSoon'
import Section from './Section'
import SectionHeader from './SectionHeader'
import styles from './BlogList.module.css'

export default function BlogList() {
  // const newestFirst = [...posts].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <Section id="blog" className={styles.blog}>
      <SectionHeader
        cwd="~/blog %"
        command="ls -t"
        title="Blog"
        // aside={
        //   <a href={allPostsHref} className={styles.all}>
        //     cat all posts →
        //   </a>
        // }
      />
      <ComingSoon label="COMING SOON" />
      {/*
      <ul className={styles.list}>
        {newestFirst.map((post, i) => (
          <li key={i}>
            <a href={post.href} className={styles.row}>
              <span className={styles.mode}>-rw-r--r--</span>
              <span className={styles.date}>{post.date}</span>
              <span className={styles.body}>
                <span className={styles.title}>{post.title}</span>
                <span className={styles.summary}>{post.summary}</span>
              </span>
              <span className={styles.readTime}>{post.readTime}</span>
            </a>
          </li>
        ))}
      </ul>
      */}
    </Section>
  )
}
