<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

共通規則（auth、UI、指令、DB 紅線）見 ../AGENTS.md，先讀它。

本 repo 是**消費端參考實作**（id：`portal`）：`src/config/portal.ts` 與
`src/app/api/auth/{callback,logout}/route.ts` 這三個檔會被其他團隊照抄——
改動它們前先想清楚，並同步更新上層 `docs/handbook/01-new-service.md` 裡的範例 code。
