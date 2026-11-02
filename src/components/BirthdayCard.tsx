// 限時的假模組：不連到任何服務，也不進 tpass-registry。過了 ENDS_AT 就不再渲染，之後整檔可刪。
import { Cake } from "lucide-react";

const ENDS_AT = Date.parse("2026-11-03T00:00:00+08:00");

function isOver() {
  return Date.now() >= ENDS_AT;
}

export function BirthdayCard() {
  if (isOver()) return null;

  return (
    <div className="group aspect-square flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-foreground bg-tone-rose-bg p-4 shadow-[4px_4px_0_0_var(--color-foreground)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[7px_7px_0_0_var(--color-foreground)] active:translate-y-0 active:shadow-[3px_3px_0_0_var(--color-foreground)]">
      <Cake className="h-7 w-7 text-tone-rose-text transition-transform duration-200 group-hover:-rotate-6" />
      <span className="font-extrabold text-sm text-foreground text-center leading-tight">
        +N 生日快樂
      </span>
    </div>
  );
}
