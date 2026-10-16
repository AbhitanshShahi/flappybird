# Flappy Bird (`flappybird`)

A classic Flappy Bird-style arcade game built with Next.js, TypeScript, and HTML Canvas.

## Deployed URL

- **Live Demo:** `[Add deployed URL here]`

## Features

- **Pixel-Art Game World & Crisp UI:** Low-resolution pixelated canvas for classic arcade sprites paired with a high-DPI overlay canvas for sharp typography.
- **Ready Screen:** Animated idle bird bobbing with title and start prompt before gameplay begins.
- **Responsive Controls:** Flap using the `Space` key (with key-repeat prevention) or mouse click / touch tap (`pointerdown`).
- **Delta-Time Physics:** Smooth, frame-rate-independent gravity, terminal fall velocity, and upward flap impulse.
- **Randomized Pipes:** Dynamic pipe spawning with randomized vertical gap positions bounded within safe, playable margins.
- **Live Scoring:** Awards 1 point per passed pipe pair and displays the live score at the top-center of the screen.
- **Collision Detection:** Detects collisions against upper and lower pipes, the ceiling, and the ground.
- **Game Over & Instant Restart:** Displays a Game Over summary card with the final score and allows immediate restart via `Space` or tap/click.
- **Full-Screen Responsive Layout:** Automatically adapts to desktop and mobile viewport resizing.

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **UI Library:** [React 19](https://react.dev/)
- **Language:** [TypeScript 5](https://www.typescriptlang.org/)
- **Rendering:** HTML5 2D Canvas API
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) & CSS
- **Linting:** ESLint 9 (`eslint-config-next`)

## Prerequisites

- **Node.js** 20.x or later
- **npm** (included with Node.js)

## Installation & Local Development

1. Clone the repository and navigate into the project directory:

   ```bash
   git clone <your-repository-url>
   cd flappy_bird
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to play the game.

## Running & Playing the Game Locally

- On initial load, the game starts on the **Ready** screen with the bird bobbing in place.
- Press **`Space`** or **click/tap** anywhere on the game canvas to start gameplay and flap upward.
- Guide the bird through the randomized green pipe gaps to earn points (`+1` per pipe pair passed).
- If the bird hits a pipe, the ceiling, or the ground, the **Game Over** screen appears with your final score.
- Press **`Space`** or **click/tap** on the **Game Over** screen to start a fresh run.

## Build, Typecheck & Lint Commands

- **Typecheck with TypeScript:**

  ```bash
  npx tsc --noEmit
  ```

- **Run ESLint:**

  ```bash
  npm run lint
  ```

- **Create a production build:**

  ```bash
  npm run build
  ```

- **Start the production server (after building):**

  ```bash
  npm run start
  ```

## Project Structure

```text
src/
├── app/
│   ├── globals.css        # Global styles and stacked canvas layout
│   ├── layout.tsx         # Root layout and document metadata
│   └── page.tsx           # Homepage entry rendering FlappyGame
├── components/
│   └── FlappyGame.tsx     # Canvas lifecycle, resize handling, input, and animation loop
└── game/
    ├── collision.ts       # Bird vs. pipe, ceiling, and ground collision checks
    ├── game.ts            # Frame-step orchestration
    ├── physics.ts         # Bird gravity, flap impulse, and velocity updates
    ├── pipes.ts           # Pipe spawning, randomized gap placement, movement, and scoring
    ├── render.ts          # Pixel-art world rendering and high-DPI UI overlay rendering
    └── types.ts           # Shared TypeScript types (Bird, Pipe, GameState)
```
# flappybird
