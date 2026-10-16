import type { Bird } from "./types";

export const GRAVITY = 320;
export const FLAP_STRENGTH = -115;
export const MAX_FALL_SPEED = 160;

export function flapBird(bird: Bird): Bird {
  bird.velocity = FLAP_STRENGTH;
  return bird;
}

export function updateBird(bird: Bird, deltaTime: number): Bird {
  bird.velocity = Math.min(bird.velocity + GRAVITY * deltaTime, MAX_FALL_SPEED);
  bird.y += bird.velocity * deltaTime;

  return bird;
}
