# Choppies Play & Discover — Project Contract

## Product identity
- Repository: `gatshaayanda/choppies-play-and-discover`.
- Product: **Choppies Play & Discover** — a Choppies-branded interactive destination for shoppers and families, not one single branded game.
- Customer journey: branded intro → main menu → honest activity selection → play → return.
- Product owner is final reviewer. GitHub `main` is the shared checkpoint.
- Do not imply Choppies corporate approval, official partnership, or access to private customer/store data unless explicitly confirmed.

## Development workflow
- Existing project: UNDERSTAND → INSPECT → PLAN → IMPLEMENT → VERIFY → CHECKPOINT.
- Unexpected result: STOP → inspect actual state → find earliest failure → fix → verify.
- Preserve working game mechanics. Use Vula's Car Wash racing as a source reference for handling/collision only after inspecting its real implementation.
- Do not draw primitive shapes as substitute game art, invent missing sprites, stretch mismatched perspective, or list a planned game as playable.
- Inspect asset contents, view/perspective, animation, format, performance, and licence/attribution before selecting runtime assets. Keep original source packs out of `public/`; only approved, optimized runtime assets belong there.
- Keep an asset provenance/licence manifest. Do not delete licence/readme files when extracting packs.

## Audience and design
- Primary context: Botswana shoppers, children, caregivers, and extended families; mobile-first, low-friction, quick sessions.
- Design for agency, achievable mastery, friendly connection, inclusion, and safe-by-design play. Avoid manipulative streaks, forced purchases, public chat, and unnecessary personal data.
- Consider data cost, slower devices/connections, portrait touch use, readable text, reduced motion, keyboard access, offline/recovery states, and Setswana localization.
- Future online/social features require a separate safeguarding and moderation design.

## Infrastructure and security
- Never reuse another app's production Firebase project, credentials, private data, or identity. Inspect Firebase configuration before enabling inherited backend features.
- Keep PWA installation optional. Preserve native `beforeinstallprompt`, user-click prompt, dismissal, update handling, and mobile controls while changing branding.
- Do not deploy, merge, mutate live data, or change production services without explicit authorization.

## Verification and checkpoints
- Distinguish source inspection, automated checks, local runtime, deployed integration, and real-device QA.
- Use PASS / FAIL / NOT RUN / BLOCKED with evidence. A commit or successful build is not proof of gameplay or PWA installation.
- After meaningful changes, review the diff, run relevant checks where available, and record exact commit and remaining gaps.
