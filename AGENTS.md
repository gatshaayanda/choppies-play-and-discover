# Choppies Play & Discover — Project Contract

## Product identity
- Repository: `gatshaayanda/choppies-play-and-discover`.
- Product: **Choppies Play & Discover** — a Choppies-branded interactive destination for shoppers, children, caregivers and families, not one standalone game.
- Intended loop: discover → choose a genuinely playable activity → play/learn together → earn in-game progress → return; optional, consent-based product/promotion discovery complements play without hijacking it.
- Product owner is final reviewer. GitHub `main` is the shared checkpoint.
- Do not imply Choppies corporate approval, official partnership, or access to private customer/store data unless explicitly confirmed. Public-figure guest appearances require permission/approval; otherwise use a clearly fictional character and do not imply endorsement.

## Intended experience portfolio
- **Shopping Cart Racing:** mobile-first arcade handling, track awareness, fair collisions, time trials and optional friend challenges.
- **Cafeteria Food Fight:** colourful, slapstick, non-graphic arena play with movement, aiming, dodging and tactical decisions.
- **Paws World — Farm to Choppies:** care for a companion, plant and harvest crops, manage simple resources and fulfil fictional supermarket supply requests. Botswana farming context can inform the fiction; never represent fictional requests as real supplier commitments.
- **Fruit Match & Puzzle Bonuses:** matching/sorting/falling-fruit puzzle mechanics, pattern recognition, planned combos and optional in-game rewards.
- These are target concepts, not claims of implementation. Select/build each only after visual asset, licensing, mechanics and device-performance gates pass. No fake launch buttons or placeholder geometric art in place of real characters, food, vehicles or environments.
- Cross-game progression and bonuses should reward skill and exploration without coercive streaks, pay-to-win mechanics or pressure to buy products.
- Family game nights and online multiplayer are later capabilities, not implied by a menu. Begin with local/pass-and-play or invite-only/private rooms where practical. Public chat, stranger discovery and child-facing public profiles are out of scope unless a dedicated safeguarding/moderation review authorizes them.

## Customer and promotion experience
- The shopper is the primary account holder and may choose to let children play; design for shared family use, clear caregiver controls and age-appropriate defaults.
- Product favourites and notifications for restocks, discounts or promotions are potential utility features. Only publish verified, current offers from an authorized source, with store/region, validity dates and clear terms. Do not fabricate discounts or make play conditional on viewing/claiming an offer.
- Keep marketing separate from child gameplay. Do not target children with purchase pressure, behavioural advertising, manipulative reward loops or notifications. Offer notification opt-in, topic controls, quiet periods and easy opt-out.
- Accounts should be optional for browsing and basic play where feasible. Collect the minimum data needed for a stated feature; explain the purpose, retention and deletion path in plain language. Never harvest long-form personal details for a game account. Avoid precise location, contact lists and children's real names by default.
- Friends and invites should use deliberate user action, revocable invitations and privacy-preserving identifiers. Do not expose contact details, account discovery or activity to strangers by default.

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
- Research-based design principles guide testing; do not claim a game improves critical thinking or other developmental outcomes without suitable evidence. Build puzzles with understandable rules, meaningful choices, and gradual skill progression, then test with families ethically.
- Future online/social features require a separate safeguarding, privacy, moderation and abuse-reporting design.

## Infrastructure and security
- Never reuse another app's production Firebase project, credentials, private data, or identity. Inspect Firebase configuration before enabling inherited backend features.
- Keep PWA installation optional. Preserve native `beforeinstallprompt`, user-click prompt, dismissal, update handling, and mobile controls while changing branding.
- Do not deploy, merge, mutate live data, or change production services without explicit authorization.

## Verification and checkpoints
- Distinguish source inspection, automated checks, local runtime, deployed integration, and real-device QA.
- Use PASS / FAIL / NOT RUN / BLOCKED with evidence. A commit or successful build is not proof of gameplay or PWA installation.
- After meaningful changes, review the diff, run relevant checks where available, and record exact commit and remaining gaps.
