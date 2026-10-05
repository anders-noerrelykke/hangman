type HangmanFigureProps = {
  wrong: number;
};

const PARTS = [
  { id: "head", d: "M130 58 a18 18 0 1 1 0.01 0" },
  { id: "body", d: "M130 76 L130 128" },
  { id: "armL", d: "M130 90 L108 112" },
  { id: "armR", d: "M130 90 L152 112" },
  { id: "legL", d: "M130 128 L110 158" },
  { id: "legR", d: "M130 128 L150 158" },
] as const;

export function HangmanFigure({ wrong }: HangmanFigureProps) {
  return (
    <svg
      viewBox="0 0 200 190"
      className="h-auto w-full max-w-[280px]"
      role="img"
      aria-label={`Hangman figure with ${wrong} of 6 parts drawn`}
    >
      <g
        className="stroke-ink"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      >
        <path d="M28 175 L172 175" />
        <path d="M52 175 L52 28" />
        <path d="M52 28 L130 28" />
        <path d="M130 28 L130 52" className="stroke-ink-soft" />
      </g>

      {PARTS.map((part, index) => {
        const visible = index < wrong;
        return (
          <path
            key={part.id}
            d={part.d}
            className={`body-part stroke-accent ${visible ? "is-visible" : ""}`}
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        );
      })}
    </svg>
  );
}
