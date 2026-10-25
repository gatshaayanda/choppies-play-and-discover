# Choppies Play & Discover — Project Contract

## Product identity
- Repository: `gatshaayanda/choppies-play-and-discover`.
- Product: **Choppies Play & Discover** — a Choppies-branded interactive destination for shoppers, children, caregivers and families, not one standalone game.
- Intended loop: discover → choose a genuinely playable activity → play/learn together → earn in-game progress → return; optional, consent-based product/promotion discovery complements play without hijacking it.
- Product owner is final reviewer. GitHub `main` is the shared checkpoint.
- Do not imply Choppies corporate approval, official partnership, or access to private customer/store data unless explicitly confirmed. Public-figure guest appearances require permission/approval; otherwise use a clearly fictional character and do not imply endorsement.

## Flagship world and progression
- The flagship is a persistent, open-world farm that also acts as a living menu. It is not merely a grid of disconnected mini-games. After an optional skippable Choppies-branded introduction, players enter the world and can explore; in-world places and activities lead to the farm loop and optional mini-games.
- First-session onboarding: a friendly in-world guide/signaller invites the player to name their farm using a nickname or farm name (not a child's real name), choose whether to save, and learn movement/interactions through a short, skippable tutorial. Returning players can load a saved farm or start fresh. Do not force account creation for browsing or basic play.
- Core narrative loop: arrive on unfamiliar farmland → receive a clear, believable request/errand → learn and perform the relevant farm activity using player controls → produce/collect goods → fulfil the request → receive transparent in-game progress/resources → improve the farm and unlock the next task. Make each order explain why it matters within the world.
- Progression should follow plausible agricultural and livestock dependencies: prepare/plough land before planting; plant and tend crops before harvesting; care for and herd livestock before producing later livestock goods; gather and store produce before fulfilling supply requests. Use fictional in-world requests; never imply actual Choppies procurement or supplier relationships.
- Farm activities to investigate against the assets and code: tractor driving and ploughing; planting/growing/harvesting; sheep herding and animal care; crop protection; delivery/fulfilment errands. Do not mark an activity as possible until compatible assets and the necessary mechanics are verified.
- **Splatter is a required concept to preserve and investigate**, not to omit. Its paintball/shooter-style movement, aiming, throwing/projectiles, dodging, hit feedback and collision physics may support playful farm defence (e.g. tossing fruit at coyotes to protect crops) and later arena games. Keep combat cartoonish, non-graphic and non-harmful; prefer clear hit reactions, cooldowns and dodge skill over realistic injury. Inspect the actual Splatter/Paintball and Shooter Trigger implementations before choosing what can be reused.
- Candidate flagship mini-games: Shopping Cart Racing; Splatter / Cafeteria Food Fight (dodge-ball/paintball-like arena mechanics); Fruit Match & Puzzle; and other activities justified by verified local assets. These should be reached from places or objects in the farm world as well as from a secondary game-discovery section.
- Intro/menu structure: an optional skippable branded intro, followed by two clear paths: (1) enter/continue the flagship farm world, and (2) browse a separate list of solo and future multiplayer mini-games. The world remains the primary experience; the list is a shortcut, not a replacement for it.
- Multiplayer vision: private farm identities and progress first; later, players may visit/invite others, compare farm stats, enter lobbies, race shopping carts or play Food Fight/Splatter. A seasonal/high-score competition such as biggest pumpkin may compare opt-in, validated game stats. Do not pretend online multiplayer, shared persistence, lobbies, matchmaking or cross-device saves exist until implemented and tested.
- Build sequence: (1) inspect actual repository, source code, asset archives and licences; (2) determine whether a small farm-world vertical slice is viable; (3) implement one complete farm loop with save/reload; (4) integrate one reusable Splatter/defence activity if supported; (5) add farm-side Fruit Match; (6) add Cart Racing only after vehicle/track assets and compatible physics are verified; (7) consider multiplayer and campaign integration only after solo play is robust. Change this order only when the evidence from the local audit supports it.
- The four activities are a product direction, not claims of implementation. Select/build each only after visual asset, licensing, mechanics and device-performance gates pass. No fake launch buttons or placeholder geometric art in place of real characters, food, vehicles or environments.
- Cross-game progression and bonuses should reward skill and exploration without coercive streaks, pay-to-win mechanics or pressure to buy products.
- Family game nights and online multiplayer are later capabilities, not implied by a menu. Begin with solo play and local/pass-and-play where practical. Public chat, stranger discovery and child-facing public profiles are out of scope unless a dedicated safeguarding/moderation review authorizes them.

## Living-farm activity map and full-circle engagement
- The open-world layout must make the farm's physical places meaningful activity entrances. Specific mini-games are also available from a separate discover/browse option before entering the world; players must not be forced to walk through the farm every time they want a quick game. Clearly distinguish playable now from planned/locked activities.
- Farm activity-to-gameplay relationships should be intuitive and connected:
  - **Orchard / produce sorting shed → Fruit Match & sorting puzzles:** harvest or collect fruit, then sort/match it by type, colour, quality or order. The puzzle should feel like part of handling the harvest, not a disconnected ad break.
  - **Herd feeding ground / pasture → Splatter farm defence:** coyotes threaten feed or crops; players defend the herd and farm by dodging and throwing cartoonish rotten tomatoes or other farm produce. Reuse verified Splatter/Paintball/Shooter Trigger movement, aiming, projectile, hit and collision mechanics where suitable. Keep it slapstick and non-graphic; do not depict harm to livestock or encourage real-world animal cruelty.
  - **Farm outback dirt track → Shopping Cart Racing:** the track is a natural in-world gateway to exciting cart races, spectators/crowds, time trials and competitions. Racing may launch as a separate game scene from the farm location; don't require physically simulating a full race track if the existing game architecture supports a reliable scene transition.
  - **Pumpkin patch / crop fields → Biggest Pumpkin competitions:** grow, tend and harvest a pumpkin through understandable farming steps; compare validated size/weight/quality stats in solo personal-best play first, with shared leaderboards or multiplayer competitions only after secure online services exist.
  - **Farm kitchen / cookhouse → Cooking competitions:** use harvested ingredients to prepare dishes through a timing, selection, sequence or matching activity. Judge dishes by transparent in-game criteria such as ingredient choice, timing and recipe completion. This should create another reason to grow varied produce.
  - **Market stand / delivery area → Orders and farm progression:** fulfil fictional requests to earn farm resources, unlock tools and expand activities. Orders are one strand of progression, not the sole objective.
- This creates a full-circle loop: plant and care → harvest → sort/match produce → protect the farm → cook or fulfil orders → enter farm competitions → unlock the outback racing venue and social challenges → return to improve the farm. Farm activities should feed other activities with meaningful, understandable consequences.
- Competition and spectacle matter alongside chores: use spectators, countdowns, celebratory finishes, records, seasonal challenges and personal-best displays where the existing assets and performance budget support them. Do not fake a crowd or leaderboard if it is not implemented.
- **Promotions, specials, discounts and reviews belong at natural, optional touchpoints** such as the market stand, farm noticeboard, results/season board or a dedicated Choppies discovery area. These can show verified current offers only when sourced from an authorized Choppies feed or explicitly approved campaign data. Keep commercial content clearly separated from child-directed play; never require a child to view/click an offer to progress. Review requests should be optional, transparent and timed after a meaningful experience, not tied to rewards or positive-review pressure. Do not fabricate reviews, ratings, prices, discounts or availability.
- The initial entry screen has two clear routes: (1) enter/continue the flagship farm world; (2) browse directly available solo mini-games and any genuinely available multiplayer games. The farm remains the main living experience, while direct mini-game access supports quick sessions. Multiplayer/lobbies must be labelled planned until implemented and tested.
- Validate the complete engagement loop with real usability tests: can a player understand what to do next, why an activity is located there, how progress is earned, and how to return to the farm? Test on mobile and with families ethically; do not claim educational or commercial outcomes without evidence.

## Asset-first inspection requirements
- Before choosing an implementation, run `npm run assets:audit` and inspect the generated inventory if present; inspect the audit script and the actual archive contents. If the script or inventory is missing, report that accurately and repair the audit workflow before claiming it ran.
- Create visual contact sheets from existing local assets and inspect them. Record exact source paths, pack/archive, file formats, dimensions/model dependencies, animation availability, intended use, and licence/attribution requirements. Counts alone are not a completed audit.
- Inspect relevant code paths for the existing open-world/living-world systems, Splatter/Paintball, Shooter Trigger, Fruit Match/puzzle, and Vula racing reference before deciding what to reuse. Preserve source projects and their mechanics; port selectively rather than blindly copying across architectures.
- Keep original source packs out of `public/`; only approved, optimized runtime assets belong there. Keep licence/readme files and maintain an asset provenance/licence manifest.

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
