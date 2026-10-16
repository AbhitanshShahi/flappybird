import { updateBird } from "./physics";
import { PIPE_WIDTH, GAP_HEIGHT, updatePipes, updateScore } from "./pipes";
import { renderGame, renderGameOverScreen } from "./render";
import { hasCollision } from "./collision";
import type { Bird, Pipe } from "./types";

export function stepGame(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  bird: Bird,
  pipes: Pipe[],
  spawnTimer: number,
  score: number,
  deltaTime: number,
  uiCtx?: CanvasRenderingContext2D,
): {
  pipes: Pipe[];
  spawnTimer: number;
  score: number;
  gameOver: boolean;
} {
  bird.x = width * 0.25;

  updateBird(bird, deltaTime);

  const nextPipeState = updatePipes(
    pipes,
    spawnTimer,
    deltaTime,
    width,
    height,
  );

  const groundY = height * 0.91;

  const gameOver = hasCollision(bird, nextPipeState.pipes, {
    groundY,
    pipeWidth: PIPE_WIDTH,
    gapHeight: GAP_HEIGHT,
  });

  const nextScore = gameOver
    ? score
    : updateScore(nextPipeState.pipes, bird.x, score);

  if (gameOver) {
    renderGameOverScreen(
      ctx,
      width,
      height,
      bird,
      nextPipeState.pipes,
      nextScore,
      uiCtx,
    );
  } else {
    renderGame(
      ctx,
      width,
      height,
      bird,
      nextPipeState.pipes,
      nextScore,
      uiCtx,
    );
  }

  return {
    ...nextPipeState,
    score: nextScore,
    gameOver,
  };
}
