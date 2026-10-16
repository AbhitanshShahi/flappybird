"use client";

import { useEffect, useRef } from "react";
import { stepGame } from "@/game/game";
import { flapBird } from "@/game/physics";
import { createInitialPipes } from "@/game/pipes";
import {
  renderGame,
  renderGameOverScreen,
  renderReadyScreen,
} from "@/game/render";
import type { Bird, GameState, Pipe } from "@/game/types";

export default function FlappyGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const uiCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const uiCanvas = uiCanvasRef.current;

    if (!canvas || !uiCanvas) return;

    const ctx = canvas.getContext("2d");
    const uiCtx = uiCanvas.getContext("2d");

    if (!ctx || !uiCtx) return;

    const pixelSize = 4;

    let width = 0;
    let height = 0;
    let lastTime = 0;
    let animationId = 0;
    let pipes: Pipe[] = [];
    let spawnTimer = 0;
    let score = 0;
    let gameState: GameState = "ready";

    const bird: Bird = {
      x: 0,
      y: 0,
      velocity: 0,
    };

    const resize = () => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;

      width = Math.ceil(viewportWidth / pixelSize);
      height = Math.ceil(viewportHeight / pixelSize);

      canvas.width = width;
      canvas.height = height;

      uiCanvas.width = Math.round(viewportWidth * dpr);
      uiCanvas.height = Math.round(viewportHeight * dpr);
      uiCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

      bird.x = width * 0.25;
      if (gameState === "ready") {
        bird.y = height * 0.42;
      }

      ctx.imageSmoothingEnabled = false;

      if (gameState === "ready") {
        renderReadyScreen(ctx, width, height, bird, pipes, 0, uiCtx);
      } else if (gameState === "playing") {
        renderGame(ctx, width, height, bird, pipes, score, uiCtx);
      } else if (gameState === "over") {
        renderGameOverScreen(ctx, width, height, bird, pipes, score, uiCtx);
      }
    };

    const startGame = () => {
      cancelAnimationFrame(animationId);
      gameState = "playing";
      score = 0;
      bird.x = width * 0.25;
      bird.y = height * 0.42;
      bird.velocity = 0;
      pipes = createInitialPipes(width, height);
      spawnTimer = 0;
      lastTime = 0;
      flapBird(bird);
      animationId = requestAnimationFrame(gameLoop);
    };

    const handleInput = () => {
      if (gameState === "ready" || gameState === "over") {
        startGame();
        return;
      }

      if (gameState === "playing") {
        flapBird(bird);
      }
    };

    const gameLoop = (timestamp: number) => {
      if (gameState === "ready") {
        const bobOffset = Math.sin(timestamp * 0.006) * 3;
        renderReadyScreen(ctx, width, height, bird, pipes, bobOffset, uiCtx);
        animationId = requestAnimationFrame(gameLoop);
        return;
      }

      if (gameState === "over") {
        animationId = 0;
        return;
      }

      const deltaTime = lastTime
        ? Math.min((timestamp - lastTime) / 1000, 0.033)
        : 0;

      lastTime = timestamp;

      const nextState = stepGame(
        ctx,
        width,
        height,
        bird,
        pipes,
        spawnTimer,
        score,
        deltaTime,
        uiCtx,
      );

      pipes = nextState.pipes;
      spawnTimer = nextState.spawnTimer;
      score = nextState.score;

      if (nextState.gameOver) {
        gameState = "over";
        bird.velocity = 0;
        animationId = 0;
        return;
      }

      animationId = requestAnimationFrame(gameLoop);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        event.preventDefault();
        if (!event.repeat) handleInput();
      }
    };

    resize();
    bird.y = height * 0.42;

    window.addEventListener("resize", resize);
    window.addEventListener("keydown", onKeyDown);
    canvas.addEventListener("pointerdown", handleInput);

    animationId = requestAnimationFrame(gameLoop);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("keydown", onKeyDown);
      canvas.removeEventListener("pointerdown", handleInput);
    };
  }, []);

  return (
    <div
      className="game-container"
      style={{
        position: "relative",
        width: "100vw",
        height: "100dvh",
        overflow: "hidden",
      }}
    >
      <canvas
        ref={canvasRef}
        className="game-canvas"
        aria-label="Flappy Bird game"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
        }}
      />
      <canvas
        ref={uiCanvasRef}
        className="ui-canvas"
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
