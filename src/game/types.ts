
export type Bird = {
  x: number;
  y: number;
  velocity: number;
};

export type Pipe = {
  x: number;
  gapY: number;
  scored: boolean;
};

export type GameState = "ready" | "playing" | "over";
