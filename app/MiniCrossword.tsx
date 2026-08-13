'use client';

import { useRef, useState } from 'react';
import styles from './MiniCrossword.module.css';

const SIZE = 5;

/*
 * The grid is a perfect word square — every across answer is also a
 * down answer. Rows and columns both read FEAST, EAGER, AGREE, SEEDS, TRESS.
 */
const SOLUTION = ('FEAST' + 'EAGER' + 'AGREE' + 'SEEDS' + 'TRESS').split('');

const CELL_NUMBERS: Record<number, number> = {
  0: 1,
  1: 2,
  2: 3,
  3: 4,
  4: 5,
  5: 6,
  10: 7,
  15: 8,
  20: 9,
};

const ACROSS_CLUES = [
  { number: 1, text: 'Holiday spread' },
  { number: 6, text: 'Raring to go' },
  { number: 7, text: 'See eye to eye' },
  { number: 8, text: 'Packet contents, to a gardener' },
  { number: 9, text: 'Lock of hair' },
];

const DOWN_CLUES = [
  { number: 1, text: 'Banquet' },
  { number: 2, text: 'Champing at the bit' },
  { number: 3, text: 'Concur' },
  { number: 4, text: 'Tournament rankings' },
  { number: 5, text: 'Rapunzel’s rope, e.g.' },
];

type Direction = 'across' | 'down';

export default function MiniCrossword() {
  const [letters, setLetters] = useState<string[]>(() =>
    Array(SIZE * SIZE).fill('')
  );
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState<Direction>('across');
  const [wrong, setWrong] = useState<Set<number>>(new Set());
  const [revealed, setRevealed] = useState(false);

  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const wasActiveOnMouseDown = useRef(false);

  const solved = letters.every((letter, i) => letter === SOLUTION[i]);
  const activeRow = Math.floor(active / SIZE);
  const activeCol = active % SIZE;

  const currentClue =
    direction === 'across' ? ACROSS_CLUES[activeRow] : DOWN_CLUES[activeCol];
  const currentClueLabel = `${currentClue.number}${
    direction === 'across' ? 'A' : 'D'
  }`;

  const focusCell = (index: number, nextDirection?: Direction) => {
    if (nextDirection) setDirection(nextDirection);
    setActive(index);
    inputRefs.current[index]?.focus();
  };

  const toggleDirection = () => {
    setDirection((current) => (current === 'across' ? 'down' : 'across'));
  };

  const setLetter = (index: number, letter: string) => {
    setLetters((prev) => {
      const next = [...prev];
      next[index] = letter;
      return next;
    });
    setWrong((prev) => {
      if (!prev.has(index)) return prev;
      const next = new Set(prev);
      next.delete(index);
      return next;
    });
  };

  const handleChange = (index: number, rawValue: string) => {
    const letter = rawValue
      .replace(/[^a-zA-Z]/g, '')
      .slice(-1)
      .toUpperCase();
    setLetter(index, letter);
    if (!letter) return;

    const col = index % SIZE;
    const row = Math.floor(index / SIZE);
    if (direction === 'across' && col < SIZE - 1) focusCell(index + 1);
    if (direction === 'down' && row < SIZE - 1) focusCell(index + SIZE);
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    const col = index % SIZE;
    const row = Math.floor(index / SIZE);

    switch (event.key) {
      case 'Backspace': {
        event.preventDefault();
        if (solved) return;
        if (letters[index]) {
          setLetter(index, '');
        } else {
          const prev =
            direction === 'across'
              ? col > 0
                ? index - 1
                : null
              : row > 0
                ? index - SIZE
                : null;
          if (prev !== null) {
            setLetter(prev, '');
            focusCell(prev);
          }
        }
        break;
      }
      case 'ArrowRight':
        event.preventDefault();
        if (direction !== 'across') setDirection('across');
        else if (col < SIZE - 1) focusCell(index + 1);
        break;
      case 'ArrowLeft':
        event.preventDefault();
        if (direction !== 'across') setDirection('across');
        else if (col > 0) focusCell(index - 1);
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (direction !== 'down') setDirection('down');
        else if (row < SIZE - 1) focusCell(index + SIZE);
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (direction !== 'down') setDirection('down');
        else if (row > 0) focusCell(index - SIZE);
        break;
      case ' ':
        event.preventDefault();
        toggleDirection();
        break;
    }
  };

  const check = () => {
    const incorrect = new Set<number>();
    letters.forEach((letter, i) => {
      if (letter && letter !== SOLUTION[i]) incorrect.add(i);
    });
    setWrong(incorrect);
  };

  const reveal = () => {
    setLetters([...SOLUTION]);
    setWrong(new Set());
    setRevealed(true);
  };

  const clear = () => {
    setLetters(Array(SIZE * SIZE).fill(''));
    setWrong(new Set());
    setRevealed(false);
    focusCell(0, 'across');
  };

  const selectClue = (clueDirection: Direction, wordIndex: number) => {
    const start = clueDirection === 'across' ? wordIndex * SIZE : wordIndex;
    focusCell(start, clueDirection);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.playArea}>
        <div className={styles.clueBar} aria-live="polite">
          <span className={styles.clueBarNum}>{currentClueLabel}</span>
          <span>{currentClue.text}</span>
        </div>

        <div
          className={`${styles.grid} ${solved ? styles.solved : ''}`}
          role="group"
          aria-label="Mini crossword grid"
        >
          {SOLUTION.map((_, i) => {
            const row = Math.floor(i / SIZE);
            const col = i % SIZE;
            const inWord =
              direction === 'across' ? row === activeRow : col === activeCol;
            const cellClasses = [
              styles.cell,
              inWord ? styles.cellInWord : '',
              i === active ? styles.cellActive : '',
              wrong.has(i) ? styles.cellWrong : '',
            ]
              .filter(Boolean)
              .join(' ');

            return (
              <div
                key={i}
                className={cellClasses}
                style={{ '--cell-index': i } as React.CSSProperties}
              >
                {CELL_NUMBERS[i] !== undefined && (
                  <span className={styles.num}>{CELL_NUMBERS[i]}</span>
                )}
                <input
                  ref={(el) => {
                    inputRefs.current[i] = el;
                  }}
                  className={styles.cellInput}
                  type="text"
                  value={letters[i]}
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  onFocus={() => setActive(i)}
                  onMouseDown={() => {
                    wasActiveOnMouseDown.current = i === active;
                  }}
                  onClick={() => {
                    if (wasActiveOnMouseDown.current) toggleDirection();
                  }}
                  readOnly={solved}
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="characters"
                  spellCheck={false}
                  aria-label={`Row ${row + 1}, column ${col + 1}`}
                />
              </div>
            );
          })}
        </div>

        <div className={styles.toolbar}>
          <button
            type="button"
            className={styles.toolBtn}
            onClick={check}
            disabled={solved}
          >
            Check
          </button>
          <button
            type="button"
            className={styles.toolBtn}
            onClick={reveal}
            disabled={solved}
          >
            Reveal
          </button>
          <button type="button" className={styles.toolBtn} onClick={clear}>
            Clear
          </button>
        </div>

        {solved && (
          <p className={styles.solvedMsg} aria-live="polite">
            {revealed
              ? 'The full grid — no shame in peeking.'
              : 'Solved! Bonus: it’s a perfect word square — every across answer is also a down answer.'}
          </p>
        )}
      </div>

      <div className={styles.clueCols}>
        <div>
          <p className={styles.clueHeading}>Across</p>
          <ul className={styles.clueList}>
            {ACROSS_CLUES.map((clue, wordIndex) => (
              <li key={clue.number}>
                <button
                  type="button"
                  className={`${styles.clue} ${
                    direction === 'across' && activeRow === wordIndex
                      ? styles.clueSelected
                      : ''
                  }`}
                  onClick={() => selectClue('across', wordIndex)}
                >
                  <span className={styles.clueNum}>{clue.number}</span>
                  {clue.text}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className={styles.clueHeading}>Down</p>
          <ul className={styles.clueList}>
            {DOWN_CLUES.map((clue, wordIndex) => (
              <li key={clue.number}>
                <button
                  type="button"
                  className={`${styles.clue} ${
                    direction === 'down' && activeCol === wordIndex
                      ? styles.clueSelected
                      : ''
                  }`}
                  onClick={() => selectClue('down', wordIndex)}
                >
                  <span className={styles.clueNum}>{clue.number}</span>
                  {clue.text}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
