"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { gameAudio } from "@/lib/gameAudio";
import { Volume2, VolumeX, RotateCcw, Play } from "lucide-react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
  life: number;
}

interface Brick {
  x: number;
  y: number;
  w: number;
  h: number;
  alive: boolean;
  color: string;
  glow: string;
  points: number;
}

export default function BreakoutGame() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isWon, setIsWon] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Game internal state ref to keep 60 FPS animation loop smooth without re-renders
  const stateRef = useRef({
    paddleX: 150,
    paddleW: 76,
    paddleH: 14,
    ballX: 180,
    ballY: 280,
    ballVx: 3.2,
    ballVy: -3.6,
    ballRadius: 7,
    isLaunched: false,
    bricks: [] as Brick[],
    particles: [] as Particle[],
    trail: [] as { x: number; y: number; alpha: number }[],
    canvasW: 360,
    canvasH: 340,
    comboCount: 0,
    scoreCount: 0,
  });

  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    gameAudio.isMuted = next;
  };

  // Initialize Bricks matching the golden metallic video layout
  const initBricks = useCallback((w: number) => {
    const rows = 4;
    const cols = 5;
    const padding = 10;
    const topOffset = 34;
    const brickW = (w - padding * (cols + 1)) / cols;
    const brickH = 16;

    const brickColors = [
      { fill: "#fef08a", glow: "rgba(254, 240, 138, 0.7)", pts: 40 }, // Bright Gold
      { fill: "#fde047", glow: "rgba(253, 224, 71, 0.6)", pts: 30 },  // Warm Gold
      { fill: "#eab308", glow: "rgba(234, 179, 8, 0.5)", pts: 20 },   // Amber Gold
      { fill: "#ca8a04", glow: "rgba(202, 138, 4, 0.4)", pts: 10 },   // Deep Bronze
    ];

    const bricks: Brick[] = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        bricks.push({
          x: padding + c * (brickW + padding),
          y: topOffset + r * (brickH + padding),
          w: brickW,
          h: brickH,
          alive: true,
          color: brickColors[r % brickColors.length].fill,
          glow: brickColors[r % brickColors.length].glow,
          points: brickColors[r % brickColors.length].pts,
        });
      }
    }
    return bricks;
  }, []);

  // Reset Game
  const resetGame = useCallback(() => {
    const s = stateRef.current;
    s.canvasW = 360;
    s.canvasH = 340;
    s.paddleW = 78;
    s.paddleX = (s.canvasW - s.paddleW) / 2;
    s.ballX = s.canvasW / 2;
    s.ballY = s.canvasH - 42;
    s.ballVx = 3.2 * (Math.random() > 0.5 ? 1 : -1);
    s.ballVy = -3.8;
    s.isLaunched = false;
    s.bricks = initBricks(s.canvasW);
    s.particles = [];
    s.trail = [];
    s.comboCount = 0;
    s.scoreCount = 0;

    setScore(0);
    setCombo(0);
    setIsGameOver(false);
    setIsWon(false);
    setIsPlaying(false);
  }, [initBricks]);

  // Launch ball
  const launchBall = () => {
    if (!stateRef.current.isLaunched) {
      stateRef.current.isLaunched = true;
      setIsPlaying(true);
      gameAudio.playPaddleBounce();
    }
  };

  // Particle explosion upon brick hit
  const spawnParticles = (x: number, y: number, color: string) => {
    const count = 14;
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.5 + Math.random() * 3.5;
      stateRef.current.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: 1.5 + Math.random() * 2.5,
        color,
        alpha: 1,
        life: 0.95,
      });
    }
  };

  // Main Canvas Render & Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    resetGame();

    let animId: number;

    const render = () => {
      const s = stateRef.current;
      const { canvasW, canvasH } = s;

      ctx.clearRect(0, 0, canvasW, canvasH);

      // 1. Draw Subtle Background Grid / Glow inside game court
      const gradient = ctx.createRadialGradient(
        canvasW / 2,
        canvasH / 2,
        20,
        canvasW / 2,
        canvasH / 2,
        canvasW
      );
      gradient.addColorStop(0, "rgba(234, 179, 8, 0.06)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvasW, canvasH);

      // 2. Draw Bricks
      let remainingBricks = 0;
      s.bricks.forEach((b) => {
        if (!b.alive) return;
        remainingBricks++;

        // Metallic rounded brick styling
        ctx.save();
        ctx.shadowColor = b.glow;
        ctx.shadowBlur = 12;

        const brickGrad = ctx.createLinearGradient(b.x, b.y, b.x, b.y + b.h);
        brickGrad.addColorStop(0, "#ffffff");
        brickGrad.addColorStop(0.35, b.color);
        brickGrad.addColorStop(1, "#854d0e");

        ctx.fillStyle = brickGrad;
        ctx.beginPath();
        const r = 4;
        ctx.roundRect(b.x, b.y, b.w, b.h, [r]);
        ctx.fill();

        // Subtle top bevel highlight
        ctx.strokeStyle = "rgba(255, 255, 255, 0.6)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(b.x + 2, b.y + 1);
        ctx.lineTo(b.x + b.w - 2, b.y + 1);
        ctx.stroke();

        ctx.restore();
      });

      // Check win condition
      if (remainingBricks === 0 && s.bricks.length > 0 && !isWon) {
        setIsWon(true);
        setIsPlaying(false);
        gameAudio.playWin();
      }

      // 3. Draw & Update Particle Sparks
      for (let i = s.particles.length - 1; i >= 0; i--) {
        const p = s.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.08; // gravity
        p.alpha *= p.life;

        if (p.alpha <= 0.04) {
          s.particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 4. Draw Ball Light Trail
      if (s.isLaunched) {
        s.trail.push({ x: s.ballX, y: s.ballY, alpha: 0.6 });
        if (s.trail.length > 8) s.trail.shift();
      }

      s.trail.forEach((t) => {
        t.alpha *= 0.85;
        ctx.save();
        ctx.globalAlpha = t.alpha;
        ctx.fillStyle = "rgba(253, 224, 71, 0.4)";
        ctx.beginPath();
        ctx.arc(t.x, t.y, s.ballRadius * 0.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // 5. Draw Paddle (Glowing Metallic Capsule)
      const paddleY = canvasH - 24;
      ctx.save();
      ctx.shadowColor = "rgba(250, 204, 21, 0.65)";
      ctx.shadowBlur = 18;

      const paddleGrad = ctx.createLinearGradient(
        s.paddleX,
        paddleY,
        s.paddleX,
        paddleY + s.paddleH
      );
      paddleGrad.addColorStop(0, "#ffffff");
      paddleGrad.addColorStop(0.3, "#fef08a");
      paddleGrad.addColorStop(0.7, "#ca8a04");
      paddleGrad.addColorStop(1, "#713f12");

      ctx.fillStyle = paddleGrad;
      ctx.beginPath();
      ctx.roundRect(s.paddleX, paddleY, s.paddleW, s.paddleH, [s.paddleH / 2]);
      ctx.fill();

      // Metallic top rim
      ctx.strokeStyle = "rgba(255, 255, 255, 0.9)";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(s.paddleX + 6, paddleY + 1.5);
      ctx.lineTo(s.paddleX + s.paddleW - 6, paddleY + 1.5);
      ctx.stroke();
      ctx.restore();

      // 6. Draw Ball (Glowing Sphere)
      ctx.save();
      ctx.shadowColor = "rgba(255, 255, 255, 0.95)";
      ctx.shadowBlur = 16;

      const ballGrad = ctx.createRadialGradient(
        s.ballX - 2,
        s.ballY - 2,
        1,
        s.ballX,
        s.ballY,
        s.ballRadius
      );
      ballGrad.addColorStop(0, "#ffffff");
      ballGrad.addColorStop(0.4, "#fef08a");
      ballGrad.addColorStop(1, "#eab308");

      ctx.fillStyle = ballGrad;
      ctx.beginPath();
      ctx.arc(s.ballX, s.ballY, s.ballRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 7. Ball Physics & Collisions (Only if launched)
      if (s.isLaunched && !isGameOver && !isWon) {
        s.ballX += s.ballVx;
        s.ballY += s.ballVy;

        // Left / Right Wall Bounce
        if (s.ballX - s.ballRadius <= 0) {
          s.ballX = s.ballRadius;
          s.ballVx = Math.abs(s.ballVx);
          gameAudio.playPaddleBounce();
        } else if (s.ballX + s.ballRadius >= canvasW) {
          s.ballX = canvasW - s.ballRadius;
          s.ballVx = -Math.abs(s.ballVx);
          gameAudio.playPaddleBounce();
        }

        // Top Wall Bounce
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
          // Angle depends on where ball hits paddle
          const hitOffset = (s.ballX - (s.paddleX + s.paddleW / 2)) / (s.paddleW / 2);
          const maxAngle = Math.PI / 3; // 60 deg
          const angle = hitOffset * maxAngle;
          const speed = Math.sqrt(s.ballVx * s.ballVx + s.ballVy * s.ballVy);

          s.ballVx = speed * Math.sin(angle);
          s.ballVy = -Math.abs(speed * Math.cos(angle));
          s.comboCount = 0;
          setCombo(0);
          gameAudio.playPaddleBounce();
        }

        // Brick Collisions
        s.bricks.forEach((b) => {
          if (!b.alive) return;
          if (
            s.ballX + s.ballRadius >= b.x &&
            s.ballX - s.ballRadius <= b.x + b.w &&
            s.ballY + s.ballRadius >= b.y &&
            s.ballY - s.ballRadius <= b.y + b.h
          ) {
            b.alive = false;
            s.ballVy = -s.ballVy; // reverse Y
            spawnParticles(b.x + b.w / 2, b.y + b.h / 2, b.color);

            s.comboCount++;
            s.scoreCount += b.points * s.comboCount;
            setScore(s.scoreCount);
            setCombo(s.comboCount);

            gameAudio.playBrickHit(s.comboCount);
          }
        });

        // Bottom Boundary (Miss / Fall)
        if (s.ballY - s.ballRadius > canvasH) {
          s.isLaunched = false;
          setIsPlaying(false);
          setIsGameOver(true);
          gameAudio.playMiss();
        }
      } else if (!s.isLaunched) {
        // Ball rests on paddle before launch
        s.ballX = s.paddleX + s.paddleW / 2;
        s.ballY = paddleY - s.ballRadius - 2;
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [isGameOver, isWon, resetGame]);

  // Handle Scroll to Play
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    const s = stateRef.current;
    const delta = e.deltaY * 0.35;
    s.paddleX = Math.max(0, Math.min(s.canvasW - s.paddleW, s.paddleX + delta));

    // Scrolling also launches ball if not launched
    if (!s.isLaunched) {
      launchBall();
    }
  };

  // Handle Mouse Movement over Game Court
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const s = stateRef.current;
    s.paddleX = Math.max(0, Math.min(s.canvasW - s.paddleW, mouseX - s.paddleW / 2));
  };

  // Handle Touch Drag for Mobile
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!canvasRef.current || !e.touches[0]) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const touchX = e.touches[0].clientX - rect.left;
    const s = stateRef.current;
    s.paddleX = Math.max(0, Math.min(s.canvasW - s.paddleW, touchX - s.paddleW / 2));
    if (!s.isLaunched) launchBall();
  };

  // Handle Keyboard Arrows
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const s = stateRef.current;
      const step = 24;
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        s.paddleX = Math.max(0, s.paddleX - step);
      } else if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        s.paddleX = Math.min(s.canvasW - s.paddleW, s.paddleX + step);
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
      className="relative flex flex-col items-center justify-center p-4 sm:p-6 rounded-2xl bg-gradient-to-b from-[#141210]/90 to-[#0a0908]/95 border border-amber-500/20 shadow-[0_0_35px_rgba(234,179,8,0.1)] backdrop-blur-xl select-none max-w-sm sm:max-w-md w-full"
    >
      {/* Top Header inside Game Court */}
      <div className="w-full flex items-center justify-between mb-3 px-1 text-xs font-mono">
        <div className="flex items-center gap-3">
          <span className="text-zinc-400">
            SCORE: <strong className="text-amber-400 font-bold">{score}</strong>
          </span>
          {combo > 1 && (
            <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold animate-pulse">
              {combo}x COMBO!
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleMute}
            aria-label="Toggle sound"
            className="p-1.5 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-amber-400" />}
          </button>
          <button
            onClick={resetGame}
            aria-label="Restart game"
            className="p-1.5 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Canvas Court */}
      <div className="relative rounded-xl overflow-hidden border border-amber-500/15 bg-black/70 cursor-crosshair">
        <canvas
          ref={canvasRef}
          width={360}
          height={340}
          className="w-[320px] sm:w-[360px] h-[300px] sm:h-[340px] block"
        />

        {/* Start / Launch Overlay */}
        {!isPlaying && !isGameOver && !isWon && (
          <div
            onClick={launchBall}
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex flex-col items-center justify-center cursor-pointer group"
          >
            <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500 text-black font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(245,158,11,0.6)] group-hover:scale-105 transition-transform">
              <Play className="w-3.5 h-3.5 fill-black" />
              <span>Click or Scroll to Play</span>
            </button>
            <p className="mt-2 text-[11px] text-zinc-400 font-mono">Use mouse, scroll or arrow keys</p>
          </div>
        )}

        {/* Game Over Overlay */}
        {isGameOver && (
          <div className="absolute inset-0 bg-black/75 backdrop-blur-sm flex flex-col items-center justify-center">
            <span className="text-xl font-black text-red-500 tracking-wider mb-1">BALL OUT!</span>
            <p className="text-xs text-zinc-400 font-mono mb-3">Final Score: {score}</p>
            <button
              onClick={resetGame}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wide transition-all shadow-[0_0_15px_rgba(245,158,11,0.5)]"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Try Again</span>
            </button>
          </div>
        )}

        {/* Victory Overlay */}
        {isWon && (
          <div className="absolute inset-0 bg-black/75 backdrop-blur-sm flex flex-col items-center justify-center">
            <span className="text-xl font-black text-amber-400 tracking-wider mb-1 animate-bounce">
              STAGE CLEARED! 🏆
            </span>
            <p className="text-xs text-zinc-300 font-mono mb-3">Master Score: {score}</p>
            <button
              onClick={resetGame}
              className="px-4 py-1.5 rounded-full bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wide transition-all shadow-[0_0_15px_rgba(245,158,11,0.5)]"
            >
              <span>Play Again</span>
            </button>
          </div>
        )}
      </div>

      {/* Hand-drawn speech bubble pointing to scroll */}
      <div className="mt-3 flex items-center justify-center gap-2 text-zinc-400 text-xs font-mono">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
        <span>Scroll up/down or drag to slide paddle</span>
      </div>
    </div>
  );
}
