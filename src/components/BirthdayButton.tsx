"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { Cake } from "lucide-react";

const PIECE_COUNT = 150;
const COLORS = [
  "bg-tone-green-badge",
  "bg-tone-blue-badge",
  "bg-tone-orange-badge",
  "bg-tone-violet-badge",
  "bg-tone-rose-badge",
];

interface Piece {
  left: number;
  delay: number;
  duration: number;
  color: string;
}

function makePieces(): Piece[] {
  return Array.from({ length: PIECE_COUNT }, (_, i) => ({
    left: Math.random() * 100,
    delay: Math.random() * 1.5,
    duration: 2.5 + Math.random() * 2,
    color: COLORS[i % COLORS.length],
  }));
}

export function BirthdayButton() {
  const [burst, setBurst] = useState<{ id: number; pieces: Piece[] } | null>(null);

  return (
    <>
      <button
        type="button"
        onClick={() => setBurst({ id: Date.now(), pieces: makePieces() })}
        className="group aspect-square flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-foreground bg-tone-rose-bg p-4 shadow-[4px_4px_0_0_var(--color-foreground)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[7px_7px_0_0_var(--color-foreground)] active:translate-y-0 active:shadow-[3px_3px_0_0_var(--color-foreground)]"
      >
        <Cake className="h-7 w-7 text-tone-rose-text transition-transform duration-200 group-hover:-rotate-6" />
        <span className="font-extrabold text-sm text-foreground text-center leading-tight">
          +N 生日快樂
        </span>
      </button>

      {/* 卡片 hover 時的 transform 會變成 fixed 的定位基準，特效層一定要掛到 body 才蓋得滿整頁。 */}
      {burst &&
        createPortal(
          <div
            key={burst.id}
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
          >
            {burst.pieces.map((p, i) => (
              <span
                key={i}
                className={`birthday-piece absolute -top-5 h-4 w-2.5 border-2 border-foreground ${p.color}`}
                style={{
                  left: `${p.left}%`,
                  animationDelay: `${p.delay}s`,
                  animationDuration: `${p.duration}s`,
                }}
              />
            ))}
            <p
              onAnimationEnd={() => setBurst(null)}
              className="birthday-banner rounded-2xl border-2 border-foreground bg-card px-6 py-4 text-3xl font-extrabold text-foreground shadow-[7px_7px_0_0_var(--color-foreground)] sm:text-5xl"
            >
              +N 生日快樂
            </p>
          </div>,
          document.body,
        )}
    </>
  );
}
