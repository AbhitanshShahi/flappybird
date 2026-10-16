import type { Pipe } from "./types";

export const PIPE_WIDTH = 16;
export const GAP_HEIGHT = 64;
export const PIPE_SPEED = 48;
export const SPAWN_INTERVAL = 2.4;
const PIPE_EDGE_MARGIN = 18;

export function createPipe(x: number, height: number): Pipe {
  const groundY = height * 0.91;
  const halfGap = Math.min(GAP_HEIGHT / 2, Math.max(16, (groundY - PIPE_EDGE_MARGIN * 2) / 2));
  const minGapY = halfGap + PIPE_EDGE_MARGIN;
  const maxGapY = Math.max(minGapY + 1, groundY - halfGap - PIPE_EDGE_MARGIN);

  return {
    x,
    gapY: minGapY + Math.random() * (maxGapY - minGapY),
    scored: false,
  };
}

export function createInitialPipes(width: number, height: number): Pipe[] {
  return [createPipe(width + 5, height)];
}

export function updatePipes(
  pipes: Pipe[],
  spawnTimer: number,
  deltaTime: number,
  width: number,
  height: number
): { pipes: Pipe[]; spawnTimer: number } {
  let nextSpawnTimer = spawnTimer + deltaTime;

  if (pipes.length === 0 || nextSpawnTimer >= SPAWN_INTERVAL) {
    pipes.push(createPipe(width + 5, height));
    nextSpawnTimer = 0;
  }

  for (const pipe of pipes) {
    pipe.x -= PIPE_SPEED * deltaTime;
  }

  const activePipes = pipes.filter((pipe) => pipe.x + PIPE_WIDTH > 0);

  return {
    pipes: activePipes,
    spawnTimer: nextSpawnTimer,
  };
}

export function updateScore(
  pipes: Pipe[],
  birdX: number,
  score: number
): number {
  let nextScore = score;
  const birdLeft = birdX - 3;

  for (const pipe of pipes) {
    if (!pipe.scored && pipe.x + PIPE_WIDTH < birdLeft) {
      pipe.scored = true;
      nextScore += 1;
    }
  }

  return nextScore;
}
