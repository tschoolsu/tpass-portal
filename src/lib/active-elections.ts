// 大廳的選舉橫幅資料：問 vote 現在有哪些場次在登記／投票。
// 這是大廳唯一一個 runtime 依賴別的服務的地方，所以規則只有一條：vote 慢、掛、回垃圾，
// 大廳都照常顯示，只是沒有橫幅。逾時壓短、任何錯誤一律吞成空陣列。
import "server-only";
import { registry, urlFor } from "@/lib/registry";
import { portalConfig } from "@/config/portal";

export interface ActiveElection {
  title: string;
  status: "registration" | "voting";
  // vote 回 ISO 字串；未排定時為 null。
  endsAt: string | null;
  // 由 vote 的網址＋slug 在這裡組，不採用 API 回來的任何連結。
  url: string;
}

const TIMEOUT_MS = 1500;

function parse(raw: unknown, base: string): ActiveElection | null {
  if (typeof raw !== "object" || raw === null) return null;
  const r = raw as Record<string, unknown>;
  if (typeof r.slug !== "string" || typeof r.title !== "string") return null;
  if (r.status !== "registration" && r.status !== "voting") return null;
  return {
    title: r.title,
    status: r.status,
    endsAt: typeof r.endsAt === "string" ? r.endsAt : null,
    url: `${base}/e/${encodeURIComponent(r.slug)}`,
  };
}

export async function fetchActiveElections(): Promise<ActiveElection[]> {
  const vote = registry.services.find((s) => s.id === "vote" && s.enabled && s.deployed);
  if (!vote) return [];
  const base = urlFor(vote, portalConfig.selfUrl);
  try {
    const res = await fetch(`${base}/api/active-elections`, {
      signal: AbortSignal.timeout(TIMEOUT_MS),
      // 全校同時打開大廳時，不要每個人都去敲一次 vote。
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const body: unknown = await res.json();
    const list = (body as { elections?: unknown })?.elections;
    if (!Array.isArray(list)) return [];
    return list.map((x) => parse(x, base)).filter((x): x is ActiveElection => x !== null);
  } catch {
    return [];
  }
}
