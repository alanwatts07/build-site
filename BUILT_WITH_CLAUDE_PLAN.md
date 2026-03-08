# "Built With Claude" — Anthropic Application Page

## Concept
A dedicated page on the HireMe site that serves as a living case study of what one engineer ships using Claude Code as a development partner. Not a recommendation letter. A verifiable portfolio with commit history, live deployments, and architectural breakdowns.

Target roles: Solutions Architect (Creative), Software Engineer (Claude Code), Software Engineer (Agent SDK)

## Format
Single page on HireMe site (hireme route or subdomain). Clean, visual, evidence-heavy.

## Page Structure

### 1. Hero Section
- Headline: something like "What One Engineer Ships With Claude Code"
- Subline: solo engineer, no team, all projects architected and deployed with Claude Code as primary dev tool
- Link to GitHub profile: https://github.com/alanwatts07

### 2. Open Source Contribution — OpenClaw
Feature this prominently. Shows ecosystem contribution, not just personal projects.

**PR #28199: fix: fail fast on port conflict before heavy gateway initialization**
- URL: https://github.com/openclaw/openclaw/pull/28199
- Issue: https://github.com/openclaw/openclaw/issues/28191
- Problem: Gateway crash-looped 43,000+ times on port conflict, loading 340MB each cycle
- Fix: Fast-fail port probe before heavy init (<1ms detection) + systemd burst limits
- 9 commits, 68 additions, iterative refinement responding to bot reviewer feedback
- All commits co-authored with Claude Opus 4.6
- Shows: real open source contribution, systems thinking, collaborative dev with Claude

### 3. Project Cards (the meat)
Each project gets a card with:
- Project name + one-liner
- Live deployment link
- GitHub repo link
- Key commit links (architectural decisions, not just "fixed typo")
- "What I did vs what Claude did" breakdown
  - I did: architecture decisions, schema design, tech choices, review, deployment strategy
  - Claude did: code generation, boilerplate, refactoring, debugging, documentation

#### Project 1: Clawbr Social Platform
- 82 API endpoints, 15 route modules, live in production
- Repo: https://github.com/alanwatts07/clawbr-social
- Live: https://clawbr.org (feed, debates, leaderboard, tournaments)
- Live API: https://clawbr.org/api/v1 (82 endpoints, discoverable)
- Closed issues (15 tracked & resolved): https://github.com/alanwatts07/clawbr-social/issues?q=is%3Aissue+state%3Aclosed
- Key issues to link:
  - #1 Fix JSON Type Mismatch: https://github.com/alanwatts07/clawbr-social/issues/1
  - #5 Resolve Stuck Debates: https://github.com/alanwatts07/clawbr-social/issues/5
  - #7 20 debates stuck pending: https://github.com/alanwatts07/clawbr-social/issues/7
  - #9 Vote grade inflation bug: https://github.com/alanwatts07/clawbr-social/issues/9
  - #15 Inconsistent error formats: https://github.com/alanwatts07/clawbr-social/issues/15

#### Project 2: Drift Agents — Cognitive Memory + Neo4j GraphRAG
- pgvector, typed edges, Q-value re-ranking, affect system, NOW WITH NEO4J
- Repo: https://github.com/alanwatts07/drift-agents
- Key commits:
  - Wire up cognitive architecture (Phases 0-4): https://github.com/alanwatts07/drift-agents/commit/c2f84f43b6f2a43fe320baf3adc52083ff523946
  - Prevent debate groupthink: https://github.com/alanwatts07/drift-agents/commit/df9a38012a1118651fb891bd2c9af16637a16eda
  - Tighten shared memory filters: https://github.com/alanwatts07/drift-agents/commit/7dc0f86584c81417916860b872f8e073292effbf
  - Add 5th agent (Gerald Boxford): https://github.com/alanwatts07/drift-agents/commit/34f9d29f39d8aece0b271ac7ecd1d37415ec1e2d
  - GraphRAG migration roadmap: https://github.com/alanwatts07/drift-agents/commit/d15a97ab44a2372a79275380b19ed6d5c2e45717
  - Phase 0 Neo4j running with full sync: https://github.com/alanwatts07/drift-agents/commit/52ac68dd8018e5f9b1ce2f447efee8c822b6c4d1
- Key files to highlight:
  - shared/init_schema.sql — full Postgres graph schema (typed_edges, pgvector, q_value_history)
  - shared/memory_wrapper.py — 42KB wake/sleep cognitive lifecycle
- Neo4j stats: 2,320 Memory nodes, 198 SharedMemory nodes, 6,528 typed relationship edges, 5 Agent nodes

#### Project 3: Predictive Maintenance Terminal (NASA Bearing)
- FastAPI + XGBoost backend, Next.js frontend, deployed
- Repo: https://github.com/alanwatts07/predictive-maintenance (verify repo name)
- Live frontend: https://frontend-two-ashy-yla6dtp7w4.vercel.app
- Live API: https://predictive-maintenance-api-production-e4fc.up.railway.app/health

#### Project 4: False Claims Act Intelligence Platform
- Federal data aggregation, ML risk scoring, 82K+ records
- Repo: https://github.com/alanwatts07/false-claims (verify repo name)

#### Project 5: Kalshi Weather Trading Bot
- Gaussian CDF probability model, GFS bias correction, auto-trade
- Repo: https://github.com/alanwatts07/kalshiweather

#### Project 6: TCN Trading Bot
- Custom PyTorch TCN, 200+ features, walk-forward validation

#### Project 7: Audio Profiler
- Whisper + pyannote.audio + Claude API for real-time speaker profiling

### 4. Workflow Section — "How I Work With Claude Code"
- The Swarm approach: architect the system, spin up agents for parallel module builds, synthesize and review
- Research and distillation: use agents to gather docs, distill to bullet points, prevent context rot
- Human-in-the-loop: I make all architecture decisions, tech choices, schema design. Claude generates. I review.
- QA as architecture: verification layer is as important as generation layer
- The OpenClaw PR as example: I found the bug (43K crash loops), I diagnosed it (340MB loaded before port check), Claude helped implement the fix across 9 iterative commits responding to CI and reviewer feedback
- Link to LinkedIn post about QA and agent-driven verification

### 5. The Numbers
Pull real stats from git:
- Total commits across all projects
- Total lines of code (rough)
- Number of production deployments (6+)
- Number of API endpoints built (82 on Clawbr alone)
- Neo4j graph: 2,320 nodes, 6,528 edges
- Clawbr issues tracked and resolved: 15
- OpenClaw PR: 9 commits, 68 additions

### 6. Closing
"I'm not a developer who uses AI as a crutch. I'm an architect who uses Claude Code as a force multiplier. Every decision — what to build, how to structure it, which tools to use and why — is mine. Claude helps me execute at a speed that would normally require a team. I also contribute back to the ecosystem — my OpenClaw PR fixes a real crash loop that affects real users. This is what one engineer ships when the tool is right."

## Data Collection Tasks
- [ ] Run git log stats across all repos (commit counts, date ranges, line counts)
- [ ] Verify all GitHub repos are public and READMEs are clean
- [ ] Verify all live deployments are up
- [ ] Screenshot key pages/dashboards for visual evidence
- [ ] Pull specific commit SHAs for "key architectural decisions" deep links
- [ ] Verify NASA Bearing and False Claims repo names on GitHub
- [ ] Get total line counts per project

## Build Notes
- Add as a route on existing HireMe site (Next.js, already on Vercel)
- Keep the same dark theme as the rest of the site
- Mobile responsive since recruiters check on phones
- No login required, fully public
- Could also export as PDF for direct email attachments
- Consider adding a "live data" section that pulls from Clawbr API in real time (show the feed is active)
