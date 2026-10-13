"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { gameAudio } from "@/lib/gameAudio";
import { Volume2, VolumeX, RotateCcw, Play, Pause } from "lucide-react";

// 5x7 Pixel Matrix Font for "HELLO WORLD"
const LETTER_PATTERNS: Record<string, number[][]> = {
  H: [
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
  ],
  E: [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1],
  ],
  L: [
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1],
  ],
  O: [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],
  W: [
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1],
    [1, 1, 0, 1, 1],
    [1, 0, 0, 0, 1],
  ],
  R: [
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 0],
    [1, 0, 1, 0, 0],
    [1, 0, 0, 1, 0],
    [1, 0, 0, 0, 1],
  ],
  D: [
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 0],
  ],
};

interface PixelBrick {
  x: number;
  y: number;
  w: number;
  h: number;
  alive: boolean;
  alpha: number;
}

interface SparkParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
}

export default function BreakoutGame() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isWon, setIsWon] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Canvas internal dimensions
  const CANVAS_W = 740;
  const CANVAS_H = 460;

  const stateRef = useRef({
    paddleX: 320,
    paddleW: 96,
    paddleH: 10,
    ballX: 370,
    ballY: 410,
    ballVx: 3.8,
    ballVy: -4.2,
    ballRadius: 5.5,
    isLaunched: false,
    bricks: [] as PixelBrick[],
    particles: [] as SparkParticle[],
    trail: [] as { x: number; y: number; alpha: number }[],
    comboCount: 0,
    scoreCount: 0,
    brokenCount: 0,
  });

  // Generate the "HELLO WORLD" pixel brick matrix matching Image 2
  const buildHelloWorldBricks = useCallback(() => {
    const bricks: PixelBrick[] = [];

    // Dot brick properties
    const dotW = 9.5;
    const dotH = 9.5;
    const dotGap = 3.5;
    const letterSpacing = 16;
    const rowSpacing = 28;

    // Word 1: HELLO
    const line1 = ["H", "E", "L", "L", "O"];
    // Word 2: WORLD
    const line2 = ["W", "O", "R", "L", "D"];

    // Compute width of one 5-letter word
    // Each letter is 5 dots wide: 5 * dotW + 4 * dotGap = 47.5 + 14 = 61.5px
    const singleLetterW = 5 * dotW + 4 * dotGap;
    const totalLineW = 5 * singleLetterW + 4 * letterSpacing;

    const startX = (CANVAS_W - totalLineW) / 2;
    const startY = 70; // Top offset

    // Helper to add a word to bricks
    const renderWord = (word: string[], topY: number) => {
      word.forEach((char, charIdx) => {
        const pattern = LETTER_PATTERNS[char];
        if (!pattern) return;

        const charOffsetX = startX + charIdx * (singleLetterW + letterSpacing);

        pattern.forEach((row, rIdx) => {
          row.forEach((cell, cIdx) => {
            if (cell === 1) {
              const bx = charOffsetX + cIdx * (dotW + dotGap);
              const by = topY + rIdx * (dotH + dotGap);
              bricks.push({
                x: bx,
                y: by,
                w: dotW,
                h: dotH,
                alive: true,
                alpha: 1,
              });
            }
          });
        });
      });
    };

    // Row 1: HELLO
    renderWord(line1, startY);

    // Row 2: WORLD
    const line1H = 7 * dotH + 6 * dotGap;
    renderWord(line2, startY + line1H + rowSpacing);

    return bricks;
  }, []);

  const resetGame = useCallback(() => {
    const s = stateRef.current;
    s.paddleW = 96;
    s.paddleX = (CANVAS_W - s.paddleW) / 2;
    s.ballX = CANVAS_W / 2;
    s.ballY = CANVAS_H - 40;
    s.ballVx = 3.8 * (Math.random() > 0.5 ? 1 : -1);
    s.ballVy = -4.4;
    s.isLaunched = false;
    s.bricks = buildHelloWorldBricks();
    s.particles = [];
    s.trail = [];
    s.comboCount = 0;
    s.scoreCount = 0;
    s.brokenCount = 0;

    setScore(0);
    setCombo(0);
    setIsGameOver(false);
    setIsWon(false);
    setIsPlaying(false);
  }, [buildHelloWorldBricks]);

  const launchBall = () => {
    if (!stateRef.current.isLaunched) {
      stateRef.current.isLaunched = true;
      setIsPlaying(true);
      gameAudio.playPaddleBounce();
    }
  };

  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    gameAudio.isMuted = next;
  };

  // Particle explosion on brick hit
  const spawnSparks = (x: number, y: number) => {
    const count = 10;
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.2 + Math.random() * 3.2;
      stateRef.current.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 1.2 + Math.random() * 2,
        alpha: 1,
      });
    }
  };

  // Main 60 FPS Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    resetGame();
    let animId: number;

    const render = () => {
      const s = stateRef.current;

      ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

      // 1. Draw Clean Solid Black Court with Subtle Border
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

      // 2. Draw "HELLO WORLD" Pixel Dot Bricks (Image 2 style)
      let aliveCount = 0;
      s.bricks.forEach((b) => {
        if (!b.alive) return;
        aliveCount++;

        ctx.save();
        ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
        ctx.shadowColor = "rgba(255, 255, 255, 0.85)";
        ctx.shadowBlur = 6;

        // Clean slightly rounded pixel square
        ctx.beginPath();
        ctx.roundRect(b.x, b.y, b.w, b.h, [2]);
        ctx.fill();
        ctx.restore();
      });

      // Check win condition
      if (aliveCount === 0 && s.bricks.length > 0 && !isWon) {
        setIsWon(true);
        setIsPlaying(false);
        gameAudio.playWin();
      }

      // 3. Draw & Update Particle Sparks
      for (let i = s.particles.length - 1; i >= 0; i--) {
        const p = s.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.06; // gravity
        p.alpha *= 0.93;

        if (p.alpha <= 0.05) {
          s.particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = "#ffffff";
        ctx.shadowColor = "#ffffff";
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 4. Ball Light Trail
      if (s.isLaunched) {
        s.trail.push({ x: s.ballX, y: s.ballY, alpha: 0.5 });
        if (s.trail.length > 6) s.trail.shift();
      }

      s.trail.forEach((t) => {
        t.alpha *= 0.82;
        ctx.save();
        ctx.globalAlpha = t.alpha;
        ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
        ctx.beginPath();
        ctx.arc(t.x, t.y, s.ballRadius * 0.75, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // 5. Draw Paddle (Clean White Pill, Image 2 style)
      const paddleY = CANVAS_H - 26;
      ctx.save();
      ctx.fillStyle = "#ffffff";
      ctx.shadowColor = "rgba(255, 255, 255, 0.85)";
      ctx.shadowBlur = 14;

      ctx.beginPath();
      ctx.roundRect(s.paddleX, paddleY, s.paddleW, s.paddleH, [s.paddleH / 2]);
      ctx.fill();
      ctx.restore();

      // 6. Draw Ball (Glowing White Orb)
      ctx.save();
      ctx.fillStyle = "#ffffff";
      ctx.shadowColor = "rgba(255, 255, 255, 1)";
      ctx.shadowBlur = 16;

      ctx.beginPath();
      ctx.arc(s.ballX, s.ballY, s.ballRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 7. Physics & Collisions
      if (s.isLaunched && !isGameOver && !isWon) {
        s.ballX += s.ballVx;
        s.ballY += s.ballVy;

        // Left / Right Walls
        if (s.ballX - s.ballRadius <= 0) {
          s.ballX = s.ballRadius;
          s.ballVx = Math.abs(s.ballVx);
          gameAudio.playPaddleBounce();
        } else if (s.ballX + s.ballRadius >= CANVAS_W) {
          s.ballX = CANVAS_W - s.ballRadius;
          s.ballVx = -Math.abs(s.ballVx);
          gameAudio.playPaddleBounce();
        }

        // Top Wall
        if (s.ballY - s.ballRadius <= 0) {
          s.ballY = s.ballRadius;
          s.ballVy = Math.abs(s.ballVy);
          gameAudio.playPaddleBounce();
        }

        // Paddle Collision
        if (
          s.ballY + s.ballRadius >= paddleY &&
          s.ballY - s.ballRadius <= paddleY + s.paddleH &&
          s.ballX >= s.paddleX &&
          s.ballX <= s.paddleX + s.paddleW &&
          s.ballVy > 0
        ) {
          const hitOffset = (s.ballX - (s.paddleX + s.paddleW / 2)) / (s.paddleW / 2);
          const maxAngle = Math.PI / 3;
          const angle = hitOffset * maxAngle;
          const speed = Math.sqrt(s.ballVx * s.ballVx + s.ballVy * s.ballVy);

          s.ballVx = speed * Math.sin(angle);
          s.ballVy = -Math.abs(speed * Math.cos(angle));
          s.comboCount = 0;
          setCombo(0);
          gameAudio.playPaddleBounce();
        }

        // Brick Collisions (Pixel dots of HELLO WORLD)
        for (let i = 0; i < s.bricks.length; i++) {
          const b = s.bricks[i];
          if (!b.alive) continue;

          if (
            s.ballX + s.ballRadius >= b.x &&
            s.ballX - s.ballRadius <= b.x + b.w &&
            s.ballY + s.ballRadius >= b.y &&
            s.ballY - s.ballRadius <= b.y + b.h
          ) {
            b.alive = false;
            s.ballVy = -s.ballVy;
            spawnSparks(b.x + b.w / 2, b.y + b.h / 2);

            s.comboCount++;
            s.brokenCount++;
            s.scoreCount += 10 * s.comboCount;

            setScore(s.scoreCount);
            setCombo(s.comboCount);
            gameAudio.playBrickHit(s.comboCount);
            break;
          }
        }

        // Miss (Bottom Fall)
        if (s.ballY - s.ballRadius > CANVAS_H) {
          s.isLaunched = false;
          setIsPlaying(false);
          setIsGameOver(true);
          gameAudio.playMiss();
        }
      } else if (!s.isLaunched) {
        // Ball stays on paddle
        s.ballX = s.paddleX + s.paddleW / 2;
        s.ballY = paddleY - s.ballRadius - 2;
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [isGameOver, isWon, resetGame]);

  // Controls: Wheel / Scroll
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    const s = stateRef.current;
    const delta = e.deltaY * 0.45;
    s.paddleX = Math.max(0, Math.min(CANVAS_W - s.paddleW, s.paddleX + delta));
    if (!s.isLaunched) launchBall();
  };

  // Controls: Mouse
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const scaleX = CANVAS_W / rect.width;
    const mouseX = (e.clientX - rect.left) * scaleX;
    const s = stateRef.current;
    s.paddleX = Math.max(0, Math.min(CANVAS_W - s.paddleW, mouseX - s.paddleW / 2));
  };

  // Controls: Touch
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!canvasRef.current || !e.touches[0]) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const scaleX = CANVAS_W / rect.width;
    const touchX = (e.touches[0].clientX - rect.left) * scaleX;
    const s = stateRef.current;
    s.paddleX = Math.max(0, Math.min(CANVAS_W - s.paddleW, touchX - s.paddleW / 2));
    if (!s.isLaunched) launchBall();
  };

  // Controls: Keyboard
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const s = stateRef.current;
      const step = 30;
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        s.paddleX = Math.max(0, s.paddleX - step);
      } else if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        s.paddleX = Math.min(CANVAS_W - s.paddleW, s.paddleX + step);
      } else if (e.key === " " || e.key === "Enter") {
        launchBall();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div
      ref={containerRef}
      onWheel={handleWheel}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      className="relative w-full max-w-4xl mx-auto flex flex-col items-center justify-center select-none"
    >
      {/* Top Tag matching Image 2: "Break it if you can / it will reset" */}
      <div className="w-full flex items-center justify-between mb-3 px-2 sm:px-4">
        <div className="flex items-center gap-2">
          <div className="px-3 py-1 rounded-sm border border-white/20 bg-black/60 text-[11px] font-mono tracking-wider text-zinc-400">
            Break it if you can / it will reset
          </div>
          {combo > 1 && (
            <span className="px-2 py-0.5 rounded-full bg-white/10 text-white text-[10px] font-mono tracking-wider animate-pulse">
              {combo}x COMBO
            </span>
          )}
        </div>

        {/* Audio Mute & Restart controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleMute}
            aria-label="Toggle sound"
            className="p-1.5 rounded-md border border-white/10 bg-white/5 hover:bg-white/15 text-zinc-300 hover:text-white transition-colors"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={resetGame}
            aria-label="Restart game"
            className="p-1.5 rounded-md border border-white/10 bg-white/5 hover:bg-white/15 text-zinc-300 hover:text-white transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="relative w-full aspect-[740/460] rounded-xl overflow-hidden border border-white/15 bg-black shadow-[0_0_50px_rgba(255,255,255,0.03)] cursor-crosshair">
        <canvas
          ref={canvasRef}
          width={CANVAS_W}
          height={CANVAS_H}
          className="w-full h-full block"
        />

        {/* Right Action Button matching Image 2: [ PLAY ] */}
        <div className="absolute right-4 sm:right-8 bottom-6 z-20 pointer-events-auto">
          {!isPlaying && !isGameOver && !isWon ? (
            <button
              onClick={launchBall}
              className="px-4 py-1.5 rounded-sm border border-white/40 hover:border-white bg-black/80 hover:bg-white/10 text-white font-mono text-xs uppercase tracking-widest transition-all cursor-pointer shadow-[0_0_15px_rgba(255,255,255,0.15)] hover:scale-105"
            >
              PLAY
            </button>
          ) : (
            <button
              onClick={resetGame}
              className="px-3.5 py-1.5 rounded-sm border border-white/30 hover:border-white bg-black/80 hover:bg-white/10 text-zinc-300 hover:text-white font-mono text-[11px] uppercase tracking-wider transition-all"
            >
              RESET
            </button>
          )}
        </div>

        {/* Bottom Right Coordinate / Status matching Image 2: [0_SCORE_AND_ETC] */}
        <div className="absolute right-4 sm:right-8 bottom-1 z-10 pointer-events-none">
          <span className="text-[10px] font-mono text-zinc-600 tracking-widest uppercase">
            [SCORE: {score}_PTS]
          </span>
        </div>

        {/* Start Overlay Notice (Only when stopped) */}
        {!isPlaying && !isGameOver && !isWon && (
          <div
            onClick={launchBall}
            className="absolute inset-0 bg-transparent flex flex-col items-center justify-end pb-14 pointer-events-auto cursor-pointer"
          >
            <p className="text-[11px] font-mono text-zinc-400 bg-black/80 px-3 py-1 rounded border border-white/10 shadow-[0_0_10px_rgba(0,0,0,0.8)]">
              Scroll or Click to Play
            </p>
          </div>
        )}

        {/* Game Over Notice */}
        {isGameOver && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-[2px] flex flex-col items-center justify-center z-30">
            <span className="text-2xl font-mono font-bold tracking-widest text-white mb-1">
              GAME OVER
            </span>
            <p className="text-xs font-mono text-zinc-400 mb-4">Bricks Cleared: {score} pts</p>
            <button
              onClick={resetGame}
              className="px-5 py-2 rounded-sm border border-white bg-white text-black font-mono font-bold text-xs uppercase tracking-widest transition-all hover:bg-zinc-200"
            >
              REPLAY
            </button>
          </div>
        )}

        {/* Victory Notice */}
        {isWon && (
          <div className="absolute inset-0 bg-black/85 backdrop-blur-[2px] flex flex-col items-center justify-center z-30">
            <span className="text-3xl font-mono font-black tracking-widest text-white mb-2 animate-pulse">
              ALL CLEARED! 🏆
            </span>
            <p className="text-xs font-mono text-zinc-300 mb-4">Total Score: {score}</p>
            <button
              onClick={resetGame}
              className="px-5 py-2 rounded-sm border border-white bg-white text-black font-mono font-bold text-xs uppercase tracking-widest transition-all hover:bg-zinc-200"
            >
              PLAY AGAIN
            </button>
          </div>
        )}
      </div>

      {/* Subtle Hint */}
      <div className="mt-3 text-center">
        <p className="text-[11px] font-mono text-zinc-500">
          Move mouse horizontally, scroll wheel, or touch to slide paddle
        </p>
      </div>
    </div>
  );
}
