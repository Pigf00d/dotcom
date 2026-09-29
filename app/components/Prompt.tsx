import styles from './Prompt.module.css'

type PromptProps = {
  /** The shell prompt, e.g. `~/projects %`. */
  cwd: string
  command: string
}

export default function Prompt({ cwd, command }: PromptProps) {
  return (
    <div className={styles.prompt}>
      <span className={styles.cwd}>{cwd}</span> {command}
    </div>
  )
}
