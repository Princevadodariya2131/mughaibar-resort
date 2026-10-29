// Captures every route at 1440x900 and 390x844 into screenshots/phase-2/, and reports
// console errors, failed requests, broken images and horizontal overflow.
// UNTESTED when written (the authoring sandbox could not install dependencies).
// Usage:  npm run build && npm run preview &   then:   npx playwright install chromium && node scripts/capture-phase2.mjs
import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'

const BASE = process.env.BASE_URL ?? 'http://localhost:4173'
const ROUTES = ['/', '/stay', '/experiences', '/gallery', '/location', '/contact', '/no-such-page']
const SIZES = [{ name: 'desktop', width: 1440, height: 900 }, { name: 'mobile', width: 390, height: 844 }]
mkdirSync('screenshots/phase-2', { recursive: true })

const browser = await chromium.launch()
let problems = 0
for (const size of SIZES) {
  const ctx = await browser.newContext({ viewport: { width: size.width, height: size.height } })
  for (const route of ROUTES) {
    const page = await ctx.newPage()
    const errors = []
    page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()) })
    page.on('pageerror', (e) => errors.push(String(e)))
    page.on('requestfailed', (r) => errors.push(`request failed: ${r.url()}`))
    await page.goto(BASE + route, { waitUntil: 'networkidle' })
    await page.waitForTimeout(1500)
    // scroll through so reveal animations and lazy images settle
    await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)) } window.scrollTo(0, 0) })
    await page.waitForTimeout(600)
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
    const broken = await page.evaluate(() => [...document.images].filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.src))
    const h1 = await page.locator('h1').count()
    const slug = route === '/' ? 'home' : route.slice(1)
    await page.screenshot({ path: `screenshots/phase-2/${slug}-${size.name}.png`, fullPage: size.name === 'mobile' ? false : false })
    const bad = errors.length || overflow > 0 || broken.length || h1 !== 1
    if (bad) problems++
    console.log(`${size.name} ${route}: overflow=${overflow}px h1=${h1} broken=${broken.length} errors=${errors.length}${bad ? '  <-- CHECK' : ''}`)
    errors.forEach((e) => console.log('   ', e))
    await page.close()
  }
  await ctx.close()
}
await browser.close()
process.exit(problems ? 1 : 0)
