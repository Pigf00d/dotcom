'use client';

import { useEffect, useState } from 'react';
import styles from './ThemeToggle.module.css';

type Theme = 'light' | 'dark';

const STORAGE_KEY = 'dev-theme';

function readTheme(): Theme {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'light' ? 'light' : 'dark';
  } catch {
    return 'dark';
  }
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const next = readTheme();
    setTheme(next);
    applyTheme(next);
  }, []);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    applyTheme(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore quota / private mode */
    }
  };

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={toggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <span className={styles.dev}>dev</span>
      {theme === 'dark' ? 'Light' : 'Dark'}
    </button>
  );
}
