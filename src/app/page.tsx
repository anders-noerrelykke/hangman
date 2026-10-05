import { HangmanGame } from "@/components/HangmanGame";

export default function Home() {
  return (
    <main className="relative z-10 flex flex-1 items-center justify-center px-5 pb-12 pt-8">
      <HangmanGame />
    </main>
  );
}
