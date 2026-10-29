# Phase 2 screenshots: NOT YET CAPTURED

The authoring sandbox could not install npm dependencies (registry blocked), so the site was never
built or run, and no screenshots exist. This folder is intentionally empty of images.

To produce genuine ones: `npm ci && npm run build && npm run preview`, then in a second terminal
`npx playwright install chromium && node scripts/capture-phase2.mjs`.
