import { GAP_HEIGHT, PIPE_WIDTH } from "./pipes";
import type { Bird, Pipe } from "./types";

const UI_FONT_FAMILY =
  'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

function getUiDimensions(uiCtx: CanvasRenderingContext2D): {
  uiWidth: number;
  uiHeight: number;
} {
  const clientWidth = uiCtx.canvas.clientWidth;
  const clientHeight = uiCtx.canvas.clientHeight;
  if (clientWidth > 0 && clientHeight > 0) {
    return { uiWidth: clientWidth, uiHeight: clientHeight };
  }
  const transform = uiCtx.getTransform();
  return {
    uiWidth: uiCtx.canvas.width / (transform.a || 1),
    uiHeight: uiCtx.canvas.height / (transform.d || 1),
  };
}

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
): void {
  const radius = Math.max(0, Math.min(r, w / 2, h / 2));
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}

function drawOutlinedText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  fillStyle: string,
  strokeStyle: string,
  lineWidth: number,
  shadowOffsetY = 2
): void {
  ctx.lineJoin = "round";
  ctx.miterLimit = 2;

  if (shadowOffsetY > 0) {
    ctx.fillStyle = "rgba(15, 23, 42, 0.35)";
    ctx.fillText(text, x, y + shadowOffsetY);
  }

  ctx.strokeStyle = strokeStyle;
  ctx.lineWidth = lineWidth;
  ctx.strokeText(text, x, y);

  ctx.fillStyle = fillStyle;
  ctx.fillText(text, x, y);
}

export function drawBird(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number
): void {
  const birdX = Math.floor(x);
  const birdPixelY = Math.floor(y);

  ctx.fillStyle = "#23354a";
  ctx.fillRect(birdX - 5, birdPixelY - 3, 11, 7);
  ctx.fillRect(birdX - 3, birdPixelY - 5, 8, 11);

  ctx.fillStyle = "#ffc83d";
  ctx.fillRect(birdX - 4, birdPixelY - 3, 9, 7);
  ctx.fillRect(birdX - 2, birdPixelY - 4, 6, 9);

  ctx.fillStyle = "#ffe380";
  ctx.fillRect(birdX - 2, birdPixelY - 4, 5, 2);

  ctx.fillStyle = "#e59f24";
  ctx.fillRect(birdX - 3, birdPixelY, 4, 3);

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(birdX + 2, birdPixelY - 2, 3, 3);

  ctx.fillStyle = "#23354a";
  ctx.fillRect(birdX + 3, birdPixelY - 1, 1, 2);

  ctx.fillStyle = "#f47b35";
  ctx.fillRect(birdX + 5, birdPixelY + 1, 5, 2);
}

export function drawPipe(
  ctx: CanvasRenderingContext2D,
  pipe: Pipe,
  height: number
): void {
  const pipeX = Math.floor(pipe.x);
  const topHeight = Math.max(0, Math.floor(pipe.gapY - GAP_HEIGHT / 2));
  const bottomY = Math.floor(pipe.gapY + GAP_HEIGHT / 2);
  const groundY = Math.floor(height * 0.91);
  const bottomHeight = Math.max(0, groundY - bottomY);
  const capHeight = 6;

  if (topHeight > 0) {
    ctx.fillStyle = "#145a32";
    ctx.fillRect(pipeX - 1, 0, PIPE_WIDTH + 2, topHeight);

    ctx.fillStyle = "#269b55";
    ctx.fillRect(pipeX, 0, PIPE_WIDTH, topHeight);

    ctx.fillStyle = "#55cf63";
    ctx.fillRect(pipeX + 2, 0, 3, topHeight);

    ctx.fillStyle = "#88e28e";
    ctx.fillRect(pipeX + 1, 0, 1, topHeight);

    ctx.fillStyle = "#187c43";
    ctx.fillRect(pipeX + PIPE_WIDTH - 3, 0, 2, topHeight);

    const topCapY = Math.max(0, topHeight - capHeight);
    ctx.fillStyle = "#145a32";
    ctx.fillRect(pipeX - 3, topCapY - 1, PIPE_WIDTH + 6, capHeight + 2);

    ctx.fillStyle = "#269b55";
    ctx.fillRect(pipeX - 2, topCapY, PIPE_WIDTH + 4, capHeight);

    ctx.fillStyle = "#55cf63";
    ctx.fillRect(pipeX + 1, topCapY, 3, capHeight);

    ctx.fillStyle = "#187c43";
    ctx.fillRect(pipeX + PIPE_WIDTH - 2, topCapY, 3, capHeight);
  }

  if (bottomHeight > 0) {
    ctx.fillStyle = "#145a32";
    ctx.fillRect(pipeX - 1, bottomY, PIPE_WIDTH + 2, bottomHeight);

    ctx.fillStyle = "#269b55";
    ctx.fillRect(pipeX, bottomY, PIPE_WIDTH, bottomHeight);

    ctx.fillStyle = "#55cf63";
    ctx.fillRect(pipeX + 2, bottomY, 3, bottomHeight);

    ctx.fillStyle = "#88e28e";
    ctx.fillRect(pipeX + 1, bottomY, 1, bottomHeight);

    ctx.fillStyle = "#187c43";
    ctx.fillRect(pipeX + PIPE_WIDTH - 3, bottomY, 2, bottomHeight);

    ctx.fillStyle = "#145a32";
    ctx.fillRect(pipeX - 3, bottomY - 1, PIPE_WIDTH + 6, capHeight + 2);

    ctx.fillStyle = "#269b55";
    ctx.fillRect(pipeX - 2, bottomY, PIPE_WIDTH + 4, capHeight);

    ctx.fillStyle = "#55cf63";
    ctx.fillRect(pipeX + 1, bottomY, 3, capHeight);

    ctx.fillStyle = "#187c43";
    ctx.fillRect(pipeX + PIPE_WIDTH - 2, bottomY, 3, capHeight);
  }
}

function drawGround(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  groundY: number
): void {
  const groundHeight = Math.max(0, height - groundY);
  if (groundHeight <= 0) return;

  ctx.fillStyle = "#2e5718";
  ctx.fillRect(0, groundY, width, 1);

  ctx.fillStyle = "#8bc34a";
  ctx.fillRect(0, groundY + 1, width, Math.min(4, groundHeight - 1));

  ctx.fillStyle = "#689f38";
  for (let x = 0; x < width; x += 6) {
    ctx.fillRect(x, groundY + 2, 3, 2);
  }

  if (groundHeight > 5) {
    ctx.fillStyle = "#558b2f";
    ctx.fillRect(0, groundY + 5, width, 1);

    ctx.fillStyle = "#d7c478";
    ctx.fillRect(0, groundY + 6, width, groundHeight - 6);

    ctx.fillStyle = "#c2ad5f";
    for (let x = 2; x < width; x += 8) {
      ctx.fillRect(x, groundY + 8, 2, 2);
    }
  }
}

export function drawScore(
  uiCtx: CanvasRenderingContext2D,
  score: number
): void {
  const { uiWidth, uiHeight } = getUiDimensions(uiCtx);
  uiCtx.clearRect(0, 0, uiWidth, uiHeight);

  const centerX = Math.round(uiWidth / 2);
  const scoreY = Math.max(44, Math.round(uiHeight * 0.09));
  const fontSize = Math.max(32, Math.min(54, Math.round(uiWidth * 0.08)));

  uiCtx.textAlign = "center";
  uiCtx.textBaseline = "middle";
  uiCtx.font = `900 ${fontSize}px ${UI_FONT_FAMILY}`;

  drawOutlinedText(
    uiCtx,
    String(score),
    centerX,
    scoreY,
    "#ffffff",
    "#1e293b",
    6,
    3
  );
}

export function renderGame(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  bird: Bird,
  pipes: Pipe[],
  score?: number,
  uiCtx?: CanvasRenderingContext2D
): void {
  ctx.fillStyle = "#78cce8";
  ctx.fillRect(0, 0, width, height);

  const groundY = Math.floor(height * 0.91);
  const horizonHeight = Math.max(6, Math.floor(height * 0.06));
  ctx.fillStyle = "#95daf0";
  ctx.fillRect(0, groundY - horizonHeight, width, horizonHeight);

  for (const pipe of pipes) {
    drawPipe(ctx, pipe, height);
  }

  drawGround(ctx, width, height, groundY);
  drawBird(ctx, bird.x, bird.y);

  if (score !== undefined && uiCtx) {
    drawScore(uiCtx, score);
  }
}

export function renderReadyScreen(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  bird: Bird,
  pipes: Pipe[],
  bobOffset: number,
  uiCtx?: CanvasRenderingContext2D
): void {
  renderGame(
    ctx,
    width,
    height,
    { ...bird, y: bird.y + bobOffset },
    pipes
  );

  if (!uiCtx) return;

  const { uiWidth, uiHeight } = getUiDimensions(uiCtx);
  uiCtx.clearRect(0, 0, uiWidth, uiHeight);

  const centerX = Math.round(uiWidth / 2);
  const titleY = Math.round(uiHeight * 0.24);
  const instructionY = Math.round(uiHeight * 0.62);

  const titleFontSize = Math.max(34, Math.min(64, Math.round(uiWidth * 0.09)));
  const promptFontSize = Math.max(14, Math.min(20, Math.round(uiWidth * 0.032)));

  uiCtx.textAlign = "center";
  uiCtx.textBaseline = "middle";

  uiCtx.font = `900 ${titleFontSize}px ${UI_FONT_FAMILY}`;
  drawOutlinedText(
    uiCtx,
    "FLAPPY BIRD",
    centerX,
    titleY,
    "#ffffff",
    "#1e293b",
    7,
    4
  );

  const promptText = "PRESS SPACE OR TAP TO START";
  uiCtx.font = `800 ${promptFontSize}px ${UI_FONT_FAMILY}`;
  const textMetrics = uiCtx.measureText(promptText);
  const badgePaddingX = 20;
  const badgeHeight = promptFontSize + 20;
  const badgeWidth = Math.min(
    uiWidth - 24,
    Math.ceil(textMetrics.width) + badgePaddingX * 2
  );
  const badgeX = Math.round(centerX - badgeWidth / 2);
  const badgeY = Math.round(instructionY - badgeHeight / 2);

  uiCtx.fillStyle = "rgba(15, 23, 42, 0.55)";
  drawRoundedRect(uiCtx, badgeX, badgeY, badgeWidth, badgeHeight, badgeHeight / 2);
  uiCtx.fill();

  uiCtx.strokeStyle = "rgba(255, 255, 255, 0.45)";
  uiCtx.lineWidth = 2;
  uiCtx.stroke();

  drawOutlinedText(
    uiCtx,
    promptText,
    centerX,
    instructionY,
    "#ffc83d",
    "#1e293b",
    4,
    1
  );
}

export function renderGameOverScreen(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  bird: Bird,
  pipes: Pipe[],
  score: number,
  uiCtx?: CanvasRenderingContext2D
): void {
  renderGame(ctx, width, height, bird, pipes);

  if (!uiCtx) return;

  const { uiWidth, uiHeight } = getUiDimensions(uiCtx);
  uiCtx.clearRect(0, 0, uiWidth, uiHeight);

  uiCtx.fillStyle = "rgba(15, 23, 42, 0.42)";
  uiCtx.fillRect(0, 0, uiWidth, uiHeight);

  const centerX = Math.round(uiWidth / 2);
  const centerY = Math.round(uiHeight * 0.48);

  const panelWidth = Math.min(340, Math.max(250, Math.round(uiWidth * 0.82)));
  const panelHeight = 200;
  const panelX = Math.round(centerX - panelWidth / 2);
  const panelY = Math.round(centerY - panelHeight / 2);

  uiCtx.textAlign = "center";
  uiCtx.textBaseline = "middle";

  const titleFontSize = Math.max(32, Math.min(50, Math.round(uiWidth * 0.08)));
  uiCtx.font = `900 ${titleFontSize}px ${UI_FONT_FAMILY}`;
  drawOutlinedText(
    uiCtx,
    "GAME OVER",
    centerX,
    panelY - 34,
    "#ffffff",
    "#1e293b",
    7,
    4
  );

  uiCtx.fillStyle = "rgba(15, 23, 42, 0.35)";
  drawRoundedRect(uiCtx, panelX, panelY + 6, panelWidth, panelHeight, 16);
  uiCtx.fill();

  uiCtx.fillStyle = "#f5e6b3";
  drawRoundedRect(uiCtx, panelX, panelY, panelWidth, panelHeight, 16);
  uiCtx.fill();

  uiCtx.strokeStyle = "#334155";
  uiCtx.lineWidth = 4;
  uiCtx.stroke();

  uiCtx.strokeStyle = "#fff8dc";
  uiCtx.lineWidth = 2;
  drawRoundedRect(uiCtx, panelX + 4, panelY + 4, panelWidth - 8, panelHeight - 8, 12);
  uiCtx.stroke();

  uiCtx.font = `800 15px ${UI_FONT_FAMILY}`;
  uiCtx.fillStyle = "#64748b";
  uiCtx.fillText("FINAL SCORE", centerX, panelY + 40);

  uiCtx.font = `900 48px ${UI_FONT_FAMILY}`;
  drawOutlinedText(
    uiCtx,
    String(score),
    centerX,
    panelY + 92,
    "#ffc83d",
    "#1e293b",
    6,
    2
  );

  const restartFontSize = Math.max(13, Math.min(16, Math.round(panelWidth * 0.046)));
  uiCtx.font = `800 ${restartFontSize}px ${UI_FONT_FAMILY}`;
  drawOutlinedText(
    uiCtx,
    "PRESS SPACE OR TAP TO RESTART",
    centerX,
    panelY + 158,
    "#ffffff",
    "#1e293b",
    4,
    1
  );
}
