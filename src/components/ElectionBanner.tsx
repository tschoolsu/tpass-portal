// 大廳頂端的選舉橫幅：有場次在登記或投票時才出現，整條可點，直接帶去該場選舉頁。
// async server component，頁面用 <Suspense> 包著——vote 回得慢時大廳先出來，橫幅晚點補上。
import { ArrowRight, Vote } from "lucide-react";
import { fetchActiveElections, type ActiveElection } from "@/lib/active-elections";

const STATUS_COPY = {
  registration: { label: "候選人登記中", cta: "登記參選", deadline: "登記截止", cls: "bg-tone-blue-bg" },
  voting: { label: "投票中", cta: "去投票", deadline: "投票截止", cls: "bg-tone-green-bg" },
} satisfies Record<ActiveElection["status"], { label: string; cta: string; deadline: string; cls: string }>;

function formatDeadline(iso: string): string {
  return new Date(iso).toLocaleString("zh-TW", {
    timeZone: "Asia/Taipei",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export async function ElectionBanners() {
  const elections = await fetchActiveElections();
  if (elections.length === 0) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 flex flex-col gap-3">
      {elections.map((e) => {
        const copy = STATUS_COPY[e.status];
        return (
          <a
            key={e.url}
            href={e.url}
            className={`flex flex-wrap items-center gap-x-4 gap-y-2 rounded-2xl border-2 border-foreground px-4 py-3 shadow-[3px_3px_0_0_var(--color-foreground)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_var(--color-foreground)] ${copy.cls}`}
          >
            <Vote className="h-5 w-5 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="font-mono text-[11px] font-bold text-muted-foreground">{copy.label}</p>
              <p className="font-extrabold">{e.title}</p>
              {e.endsAt && (
                <p className="text-xs font-bold text-muted-foreground">
                  {copy.deadline} {formatDeadline(e.endsAt)}
                </p>
              )}
            </div>
            <span className="inline-flex items-center gap-1 rounded-xl border-2 border-foreground bg-card px-3 py-1.5 text-sm font-bold">
              {copy.cta} <ArrowRight className="h-4 w-4" />
            </span>
          </a>
        );
      })}
    </div>
  );
}
