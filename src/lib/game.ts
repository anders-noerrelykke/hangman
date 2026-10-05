export const MAX_WRONG = 6;

export type GameStatus = "playing" | "won" | "lost";

export function normalizeLetter(input: string): string | null {
  const letter = input.toUpperCase();
  if (letter.length !== 1 || letter < "A" || letter > "Z") return null;
  return letter;
}

export function revealedWord(word: string, guessed: Set<string>): string[] {
  return word.split("").map((ch) => (guessed.has(ch) ? ch : ""));
}

export function wrongGuessCount(word: string, guessed: Set<string>): number {
  return [...guessed].filter((letter) => !word.includes(letter)).length;
}

export function getStatus(
  word: string,
  guessed: Set<string>,
): GameStatus {
  const wrong = wrongGuessCount(word, guessed);
  if (wrong >= MAX_WRONG) return "lost";
  if (word.split("").every((ch) => guessed.has(ch))) return "won";
  return "playing";
}
