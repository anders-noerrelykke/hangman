const ROWS = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];

type KeyboardProps = {
  guessed: Set<string>;
  word: string;
  disabled: boolean;
  onGuess: (letter: string) => void;
};

function keyClass(correct: boolean, wrong: boolean) {
  if (correct) {
    return "border-correct/35 bg-correct/16 text-correct";
  }
  if (wrong) {
    return "border-wrong/30 bg-wrong/12 text-wrong opacity-70";
  }
  return "border-line bg-panel-strong text-ink hover:border-accent/45 hover:-translate-y-0.5";
}

export function Keyboard({ guessed, word, disabled, onGuess }: KeyboardProps) {
  return (
    <div className="grid gap-1.5" role="group" aria-label="Letter keyboard">
      {ROWS.map((row) => (
        <div key={row} className="flex justify-center gap-1.5">
          {row.split("").map((letter) => {
            const used = guessed.has(letter);
            const correct = used && word.includes(letter);
            const wrong = used && !word.includes(letter);

            return (
              <button
                key={letter}
                type="button"
                className={[
                  "h-10 min-w-7 rounded-xl border px-1.5 text-sm font-bold tracking-wide transition",
                  "sm:h-[2.65rem] sm:min-w-8 sm:px-1.5 sm:text-base",
                  "active:enabled:translate-y-0 disabled:cursor-default",
                  keyClass(correct, wrong),
                ].join(" ")}
                disabled={disabled || used}
                onClick={() => onGuess(letter)}
                aria-label={`Guess ${letter}`}
              >
                {letter}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
