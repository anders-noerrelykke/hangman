"use client";

import { useCallback, useEffect, useState } from "react";
import { HangmanFigure } from "@/components/HangmanFigure";
import { Keyboard } from "@/components/Keyboard";
import {
  getStatus,
  MAX_WRONG,
  normalizeLetter,
  revealedWord,
  wrongGuessCount,
} from "@/lib/game";
import { pickPuzzle, type Puzzle } from "@/lib/words";

function createRound(exclude?: string): {
  puzzle: Puzzle;
  guessed: Set<string>;
} {
  return {
    puzzle: pickPuzzle(exclude),
    guessed: new Set(),
  };
}

export function HangmanGame() {
  const [round, setRound] = useState<{
    puzzle: Puzzle;
    guessed: Set<string>;
  } | null>(null);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    setRound(createRound());
  }, []);

  const guess = useCallback((raw: string) => {
    setRound((current) => {
      if (!current) return current;
      const letter = normalizeLetter(raw);
      const status = getStatus(current.puzzle.word, current.guessed);
      if (!letter || status !== "playing" || current.guessed.has(letter)) {
        return current;
      }

      const nextGuessed = new Set(current.guessed);
      nextGuessed.add(letter);

      if (!current.puzzle.word.includes(letter)) {
        setShake(true);
        window.setTimeout(() => setShake(false), 420);
      }

      return { ...current, guessed: nextGuessed };
    });
  }, []);

  const newGame = useCallback(() => {
    setRound((current) => createRound(current?.puzzle.word));
  }, []);

  useEffect(() => {
    if (!round) return;

    const status = getStatus(round.puzzle.word, round.guessed);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (event.key === "Enter" && status !== "playing") {
        newGame();
        return;
      }
      guess(event.key);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [guess, newGame, round]);

  if (!round) {
    return (
      <div className="grid min-h-[40vh] place-items-center font-display text-xl text-ink-soft">
        Loading the gallows…
      </div>
    );
  }

  const { puzzle, guessed } = round;
  const wrong = wrongGuessCount(puzzle.word, guessed);
  const status = getStatus(puzzle.word, guessed);
  const letters = revealedWord(puzzle.word, guessed);
  const remaining = MAX_WRONG - wrong;

  return (
    <div className="grid w-full max-w-[720px] animate-rise-in gap-7">
      <header className="text-center">
        <p className="m-0 font-display text-[clamp(3.4rem,10vw,5.5rem)] font-bold leading-[0.9] tracking-[-0.04em] text-ink">
          Hangman
        </p>
        <h1 className="mx-auto mt-3.5 max-w-[22ch] font-display text-[clamp(1.15rem,2.8vw,1.45rem)] font-medium leading-tight text-ink">
          Guess the word before the figure is complete.
        </h1>
        <p className="mt-3.5 text-base text-ink-soft">
          Hint: <span className="font-semibold text-accent-deep">{puzzle.hint}</span>
        </p>
      </header>

      <section
        className="grid justify-items-center gap-5 rounded-[22px] border border-line bg-panel px-3.5 py-5 shadow-stage backdrop-blur-[10px] sm:rounded-[28px] sm:px-5 sm:py-7"
        aria-live="polite"
      >
        <div
          className={`w-[min(280px,70vw)] text-center ${shake ? "animate-shake" : ""}`}
        >
          <HangmanFigure wrong={wrong} />
          <p className="mt-1.5 text-[0.95rem] text-ink-soft tabular-nums">
            {status === "playing"
              ? `${remaining} miss${remaining === 1 ? "" : "es"} left`
              : status === "won"
                ? "You cracked it"
                : "Out of misses"}
          </p>
        </div>

        <div className="flex min-h-14 flex-wrap justify-center gap-x-2.5 gap-y-1.5">
          {letters.map((letter, index) => (
            <span
              key={`${puzzle.word}-${index}`}
              className={[
                "w-7 border-b-[3px] border-ink text-center transition duration-300 sm:w-[2.1rem]",
                letter
                  ? "translate-y-0 opacity-100"
                  : "translate-y-1 opacity-50",
              ].join(" ")}
            >
              <span className="block font-display text-[1.35rem] font-bold leading-[1.5] tracking-wide sm:text-[1.7rem]">
                {letter || "\u00A0"}
              </span>
            </span>
          ))}
        </div>

        {status !== "playing" && (
          <div
            className={[
              "grid w-full max-w-[360px] animate-pop-in justify-items-center gap-3.5 rounded-[18px] border border-line bg-panel-strong px-4 py-4",
              status === "won" ? "text-correct" : "text-wrong",
            ].join(" ")}
            role="status"
          >
            <p className="m-0 text-center font-semibold">
              {status === "won"
                ? "Nice save — the word was free."
                : `The word was ${puzzle.word}.`}
            </p>
            <button
              type="button"
              className="cursor-pointer rounded-full border-0 bg-accent px-5 py-3 font-bold text-white transition hover:-translate-y-px hover:bg-accent-deep"
              onClick={newGame}
            >
              Play again
            </button>
          </div>
        )}
      </section>

      <Keyboard
        guessed={guessed}
        word={puzzle.word}
        disabled={status !== "playing"}
        onGuess={guess}
      />

      {status === "playing" && (
        <button
          type="button"
          className="justify-self-center cursor-pointer border-0 bg-transparent text-[0.95rem] text-ink-soft underline underline-offset-[3px] hover:text-ink"
          onClick={newGame}
        >
          Skip word
        </button>
      )}
    </div>
  );
}
