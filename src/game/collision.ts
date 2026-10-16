import type { Bird, Pipe } from "./types";

type CollisionConfig = {
  groundY: number;
  pipeWidth: number;
  gapHeight: number;
};

export function hasCollision(
  bird: Bird,
  pipes: Pipe[],
  config: CollisionConfig
): boolean {
  const { groundY, pipeWidth, gapHeight } = config;

  const birdLeft = bird.x - 3;
  const birdRight = bird.x + 5;
  const birdTop = bird.y - 3;
  const birdBottom = bird.y + 4;

  if (birdTop <= 0 || birdBottom >= groundY) {
    return true;
  }

  for (const pipe of pipes) {
    const pipeLeft = pipe.x;
    const pipeRight = pipe.x + pipeWidth;

    const overlapsHorizontally =
      birdRight > pipeLeft && birdLeft < pipeRight;

    if (!overlapsHorizontally) continue;

    const gapTop = pipe.gapY - gapHeight / 2;
    const gapBottom = pipe.gapY + gapHeight / 2;

    if (birdTop < gapTop || birdBottom > gapBottom) {
      return true;
    }
  }

  return false;
}
