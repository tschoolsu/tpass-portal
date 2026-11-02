// 限時的假模組：不連到任何服務，也不進 tpass-registry。過了 ENDS_AT 就不再渲染，之後連同 BirthdayButton 可刪。
import { BirthdayButton } from "@/components/BirthdayButton";

const ENDS_AT = Date.parse("2026-11-03T00:00:00+08:00");

function isOver() {
  return Date.now() >= ENDS_AT;
}

export function BirthdayCard() {
  if (isOver()) return null;

  return <BirthdayButton />;
}
