export type Puzzle = {
  word: string;
  hint: string;
};

export const PUZZLES: Puzzle[] = [
  { word: "JAVASCRIPT", hint: "Web language" },
  { word: "TYPEWRITER", hint: "Clicky keys" },
  { word: "ASTRONAUT", hint: "Space traveler" },
  { word: "CROISSANT", hint: "Flaky breakfast" },
  { word: "VOLCANO", hint: "Angry mountain" },
  { word: "LIBRARY", hint: "Quiet books" },
  { word: "PENGUIN", hint: "Formal bird" },
  { word: "KEYBOARD", hint: "Tap tap tap" },
  { word: "MOUNTAIN", hint: "Tall hike" },
  { word: "SANDWICH", hint: "Lunch classic" },
  { word: "BICYCLE", hint: "Two wheels" },
  { word: "RAINBOW", hint: "After the storm" },
  { word: "OCTOPUS", hint: "Eight arms" },
  { word: "GUITAR", hint: "Six strings" },
  { word: "PYRAMID", hint: "Desert geometry" },
  { word: "FIREFLY", hint: "Night spark" },
  { word: "UMBRELLA", hint: "Rain shield" },
  { word: "DRAGON", hint: "Mythic lizard" },
  { word: "TELESCOPE", hint: "Star spyglass" },
  { word: "CUPCAKE", hint: "Frosted treat" },
  { word: "SUBMARINE", hint: "Underwater ship" },
  { word: "HURRICANE", hint: "Spinning storm" },
  { word: "CHOCOLATE", hint: "Sweet cocoa" },
  { word: "BACKPACK", hint: "School carry" },
  { word: "LANTERN", hint: "Portable glow" },
  { word: "MERMAID", hint: "Sea legend" },
  { word: "SPACESHIP", hint: "Cosmic ride" },
  { word: "WATERFALL", hint: "Downward river" },
  { word: "JELLYFISH", hint: "Stinging float" },
  { word: "SCARECROW", hint: "Field guardian" },
];

export function pickPuzzle(exclude?: string): Puzzle {
  const pool = exclude
    ? PUZZLES.filter((p) => p.word !== exclude)
    : PUZZLES;
  return pool[Math.floor(Math.random() * pool.length)] ?? PUZZLES[0];
}
