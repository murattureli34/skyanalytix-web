# SkyAnalytix Web (Production Scaffold)

This package is a *deployable* Next.js + Tailwind site scaffold created from the 4 zip parts you provided.

## 1) Local run
```bash
npm install
npm run dev
```
Then open http://localhost:3000 (auto redirects to /en)

## 2) Build (production)
```bash
npm run build
npm run start
```

## 3) Deploy options
### Option A: Cloudflare Pages (recommended for static marketing sites)
- Framework preset: Next.js
- Build command: `npm run build`
- Output directory: `.next`
- Environment: Node 18+

### Option B: Vercel
- Import GitHub repo
- Framework: Next.js
- No special settings needed

## 4) Payload CMS (optional)
You have `payload.config.ts` and `PAYLOAD-SETUP.md` included. Follow the guide to add dependencies and routes.

## Notes
- Pages are intentionally concise placeholders because the full long page files referenced in PAGES-INFO.txt were not included in the zips.
- Components (Heatmap/Detection/Mobile/DashboardMetrics) are included and already used in pages.
