/**
 * Post-build SEO prerender.
 *
 * The site is a Vite SPA: the browser gets `<div id="root"></div>` and React
 * paints everything in after JS runs. Crawlers, link-preview bots, and plain
 * HTML readers don't run JS, so they saw an empty body.
 *
 * This script runs AFTER `vite build` and injects real, static HTML — built
 * from the same src/data files the app renders — inside `#root` in the built
 * dist/index.html and dist/ships.html. React's createRoot().render() replaces
 * these children on mount, so humans get the identical live app; bots get the
 * full content. Nothing in the runtime app changes.
 *
 * Because it reads src/data/*.js directly, it can never drift out of sync.
 */
import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

const { projects } = await import(resolve(root, 'src/data/projects.js'))
const { shipsProjects, openSourceContribution } = await import(
  resolve(root, 'src/data/shipsProjects.js')
)

const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

// Wrapper styled inline (no dependency on the CSS bundle) so that on a slow
// connection the brief pre-hydration flash still looks intentional, not raw.
const wrap = (inner) =>
  `<div id="prerender-seo" style="max-width:880px;margin:0 auto;padding:48px 24px;` +
  `font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#e5e7eb;` +
  `background:#0a0a0f;line-height:1.6">${inner}</div>`

const link = (href, label) =>
  href ? ` <a href="${esc(href)}" style="color:#818cf8">${esc(label)}</a>` : ''

function renderHome() {
  const cards = projects
    .map((p) => {
      const tech = (p.technologies || []).map(esc).join(', ')
      const links = [
        p.demoUrl && link(p.demoUrl, 'Live demo'),
        p.githubUrl && link(p.githubUrl, 'Source'),
      ]
        .filter(Boolean)
        .join(' · ')
      return (
        `<article style="margin:0 0 28px">` +
        `<h3 style="margin:0 0 4px;font-size:18px;color:#fff">${esc(p.title)}` +
        ` <span style="font-size:13px;color:#9ca3af;font-weight:400">— ${esc(p.category)} · ${esc(p.status)}</span></h3>` +
        `<p style="margin:0 0 6px">${esc(p.description)}</p>` +
        (tech ? `<p style="margin:0 0 4px;font-size:13px;color:#9ca3af">Stack: ${tech}</p>` : '') +
        (links ? `<p style="margin:0;font-size:13px">${links}</p>` : '') +
        `</article>`
      )
    })
    .join('\n')

  return wrap(
    `<h1 style="font-size:28px;color:#fff;margin:0 0 4px">Matt Corwin — AI &amp; Automation Engineer</h1>` +
      `<p style="margin:0 0 8px;color:#9ca3af">Solutions / Forward-Deployed Engineer. Builds and ships AI-driven systems end to end — LLM orchestration, agentic systems, ML pipelines, REST APIs (Node.js / TypeScript), CI/CD. 11 production systems shipped solo in under three months, every commit verifiable.</p>` +
      `<p style="margin:0 0 24px;font-size:14px">` +
      `<a href="mailto:me@mattcorwin.dev" style="color:#818cf8">me@mattcorwin.dev</a> · ` +
      `<a href="https://github.com/alanwatts07" style="color:#818cf8">GitHub</a> · ` +
      `<a href="https://www.linkedin.com/in/matthew-corwin-b38347a8/" style="color:#818cf8">LinkedIn</a> · ` +
      `<a href="/ships" style="color:#818cf8">What I ship</a></p>` +
      `<h2 style="font-size:20px;color:#fff;margin:0 0 16px">Selected work</h2>` +
      cards,
  )
}

function renderShips() {
  const cards = shipsProjects
    .map((p) => {
      const iDid = (p.iDid || [])
        .map((x) => `<li>${esc(x)}</li>`)
        .join('')
      const claudeDid = (p.claudeDid || [])
        .map((x) => `<li>${esc(x)}</li>`)
        .join('')
      const links = [
        p.live && link(p.live, 'Live'),
        p.repo && link(p.repo, 'Repo'),
      ]
        .filter(Boolean)
        .join(' · ')
      return (
        `<article style="margin:0 0 32px;border-top:1px solid #1f2937;padding-top:20px">` +
        `<h3 style="margin:0 0 4px;font-size:18px;color:#fff">${esc(p.title)}</h3>` +
        `<p style="margin:0 0 6px">${esc(p.oneLiner)}</p>` +
        (p.velocityStat ? `<p style="margin:0 0 10px;font-size:13px;color:#9ca3af">${esc(p.velocityStat)}</p>` : '') +
        (iDid ? `<p style="margin:0 0 2px;font-size:14px;color:#fff"><strong>What I designed &amp; decided:</strong></p><ul style="margin:0 0 10px;padding-left:20px;font-size:14px">${iDid}</ul>` : '') +
        (claudeDid ? `<p style="margin:0 0 2px;font-size:14px;color:#fff"><strong>What Claude Code generated (my direction):</strong></p><ul style="margin:0 0 10px;padding-left:20px;font-size:14px;color:#cbd5e1">${claudeDid}</ul>` : '') +
        (links ? `<p style="margin:0;font-size:13px">${links}</p>` : '') +
        `</article>`
      )
    })
    .join('\n')

  const os = openSourceContribution
  const osBlock = os
    ? `<article style="margin:0 0 16px;border-top:1px solid #1f2937;padding-top:20px">` +
      `<h3 style="margin:0 0 4px;font-size:18px;color:#fff">Open source: ${esc(os.title)}</h3>` +
      `<p style="margin:0 0 6px">${esc(os.description)}</p>` +
      `<p style="margin:0 0 6px;font-size:14px"><strong>Problem:</strong> ${esc(os.problem)}</p>` +
      `<p style="margin:0 0 6px;font-size:14px"><strong>Fix:</strong> ${esc(os.fix)}</p>` +
      `<p style="margin:0;font-size:13px">${link(os.pr, 'Pull request')} · ${link(os.issue, 'Issue')}</p>` +
      `</article>`
    : ''

  return wrap(
    `<h1 style="font-size:28px;color:#fff;margin:0 0 4px">What One Engineer Ships</h1>` +
      `<p style="margin:0 0 8px;color:#9ca3af">Solo engineer using Claude Code as primary dev tool. Every project below separates what I designed and decided from what Claude generated under my direction — every commit verifiable.</p>` +
      `<p style="margin:0 0 24px;font-size:14px">` +
      `<a href="mailto:me@mattcorwin.dev" style="color:#818cf8">me@mattcorwin.dev</a> · ` +
      `<a href="https://github.com/alanwatts07" style="color:#818cf8">GitHub</a> · ` +
      `<a href="/" style="color:#818cf8">Home</a></p>` +
      cards +
      osBlock,
  )
}

async function inject(file, html) {
  const path = resolve(root, 'dist', file)
  const src = await readFile(path, 'utf8')
  if (!/<div id="root">\s*<\/div>/.test(src)) {
    throw new Error(`Could not find empty <div id="root"></div> in ${file}`)
  }
  const out = src.replace(/<div id="root">\s*<\/div>/, `<div id="root">${html}</div>`)
  await writeFile(path, out, 'utf8')
  console.log(`✓ prerendered ${file} (+${html.length} chars of static content)`)
}

await inject('index.html', renderHome())
await inject('ships.html', renderShips())
console.log('SEO prerender complete.')
