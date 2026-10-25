# Choppies Play & Discover — audience, brand and experience research

**Prepared:** 25 October 2026  
**Purpose:** Translate public evidence into practical product and design decisions. This is desk research, not original user testing, and does not establish Choppies corporate endorsement or approval.

## What the evidence says

### Botswana is mobile-first, but connectivity is not universal

Statistics Botswana's 2024 ICT household survey reported internet access in 68.9% of households; mobile broadband via handsets was the dominant access route (86.1%). Its survey also reported that 84.2% of people aged five and older used mobile phones, while e-commerce use was still 7.9%. Household internet access and individual internet use are different measures and should not be conflated. The survey also highlights unequal access and digital skills.

DataReportal's *Digital 2026: Botswana* estimated 2.09 million internet users at the end of 2025 (81.4% penetration) and 479,000 people offline. These estimates use a different methodology from Statistics Botswana's household survey; treat them as complementary context, not interchangeable statistics.

**Product implications:** Build for portrait phones first; keep the menu legible without large downloads; lazy-load any game art; avoid requiring an account simply to browse; make network failures recoverable; test on slower devices and connections; and do not assume every shopper has continuous data access.

### Choppies' public positioning is value, broad reach and community

Choppies' 2024 Integrated Annual Report describes a broad consumer market serving all income groups, value-for-money positioning, a customer/shared-value approach, and its long-running customer Bonanza. It reported a monthly store footfall of 9.3 million shoppers and described customer competitions as part of customer appreciation and community engagement. These facts support an experience that feels welcoming and broadly accessible rather than premium-gated, exclusionary or dependent on expensive devices.

**Product implications:** Use Choppies red with warm white and a restrained yellow accent; keep the tone friendly, lively and plain-spoken; favour quick activities with clear starts and satisfying finishes. Do not invent store promotions, product prices, rewards or prizes. Do not imply official corporate approval unless the owner confirms it.

### Child and family well-being research points to agency, mastery and safe connection

UNICEF Innocenti's 2024 RITEC research describes potential benefits when digital games support choice and control, mastery and achievement, emotional regulation, social connection, creativity and exploration. The OECD's child digital well-being framework also emphasises competence, empowerment, connection, creativity, safety/security and inclusion. These are design considerations, not a claim that any game automatically produces these outcomes.

**Product implications:** Offer understandable choices, achievable skill progression, short sessions, gentle feedback and a clear exit/return path. Make shared play possible without public chat or public profiles. Avoid coercive streaks, pressure timers designed to frustrate, manipulative reward loops, unnecessary child data, in-app spending prompts and competitive systems that expose children to strangers. Add caregiver-facing explanations if accounts or online features are introduced later.

## Brand and UX direction

- **Product definition:** Choppies Play & Discover is a branded interactive destination—an emulator-like digital place for discovery and play—not one standalone game.
- **Journey:** short branded introduction → clear discovery menu → choose an activity only when it is actually playable → play → clear finish/retry/return to menu.
- **Voice:** warm, energetic, straightforward and locally relevant. Use Setswana phrases only when reviewed for natural usage; do not use local identity as decoration or stereotype.
- **Visual identity:** Choppies red as the anchor, warm cream/white surfaces, a sparing yellow highlight, strong typography, generous spacing and clear mobile touch targets. Use actual licensed art inside activities; do not substitute geometric placeholders for food, people, vehicles or environments.
- **Data/accessibility:** menu should work quickly; keep animation subtle and honour reduced-motion preference; support keyboard navigation and visible focus; avoid tiny text; no autoplay sound.
- **Trust:** distinguish an activity concept from a playable experience. Do not suggest an activity works until assets, controls, performance and failure/recovery states have been verified.
- **Privacy and safety:** no login to browse; no public chat or child-facing public profile; collect no personal details unless a later, justified feature needs them and has been reviewed.

## Asset-to-game decision gate

The repository contains six canonical Choppies-specific packs (food kit, pixel food expansion, restaurant bits, cafe drinks, party food, and an unidentified glTF archive), plus inherited source packs and extracted runtime assets. The repository inventory is useful for triage, but filenames and archive member lists do not prove visual suitability, animation quality or redistribution rights.

Candidate directions remain conditional until each shortlisted pack has been opened and visually inspected:

1. **Food/produce collection or sorting** — only if the Kenney food assets provide a coherent view, enough distinct objects and usable transparent sprites.
2. **Cafe/food assembly** — only if restaurant, drinks and party-food packs contain compatible props, scale, textures and an appropriate licence.
3. **Family/nature discovery** — consider already-integrated animal/world assets only after checking whether the style and theme fit the Choppies experience.
4. **Driving/racing** — Vula's Car Wash has a proven independent vehicle-physics/collision implementation. It is a mechanics reference, not a Choppies runtime dependency. The Choppies repository still needs a suitable, licensed vehicle and track art set before a racer can be called ready.

Do not select final games from filenames alone. Reject or defer concepts that require invented sprites, placeholder geometry, mismatched perspective or unverified licensing.

## Sources

- Statistics Botswana, *Botswana Household Access and Individual Use of ICTs Stats Brief — 2024*: https://www.statsbots.org.bw/sites/default/files/Botswana%20Household%20Access%20and%20Individual%20Use%20of%20ICT%27s%20Stats%20Brief%202024.pdf
- Statistics Botswana, *2024 ICT Household Survey Results* press release (15 August 2025): https://www.statsbots.org.bw/sites/default/files/press-releases/Press%20Release-Statistics%20Botswana%202024%20ICT%20Household%20Survey%20Results.pdf
- DataReportal, *Digital 2026: Botswana*: https://datareportal.com/reports/digital-2026-botswana
- Choppies Enterprises, *Integrated Annual Report 2024*: https://www.choppies-group.com/pdf/integrated-reports/integrated-reports-2024.pdf
- UNICEF Innocenti, *Video games can have a positive impact on children – if they are designed right* (30 April 2024): https://www.unicef.org/innocenti/press-releases/video-games-can-have-positive-impact-children-if-they-are-designed-right-says-new
- OECD, *How's Life for Children in the Digital Age?* — digital well-being framework: https://www.oecd.org/en/publications/how-s-life-for-children-in-the-digital-age_0854b900-en/full-report/a-comprehensive-approach-to-child-digital-well-being_96b332cb.html

## Product direction from owner brief — 25 October 2026

The owner’s direction is a family-friendly Choppies-branded destination where a shopper can discover useful supermarket information while children and relatives have enjoyable, thoughtful play. This is the product hypothesis to guide the next design and asset decisions; it is not evidence of customer validation or corporate approval.

### Game portfolio and shared progression

1. **Shopping Cart Racing** — short arcade races through a supermarket-inspired world, with mobile steering, acceleration/braking, reliable barrier collision, time trials and optional friend challenges. Reuse lessons from Vula’s handling/collision system only after inspecting its current implementation; source suitable, licensed cart/vehicle and environment art before committing to this game.
2. **Cafeteria Food Fight** — colourful, non-graphic slapstick arena play. Core loop should reward movement, aiming, dodging, timing and tactical choices, not realistic injury. Confirm character/food art is coherent and licensed before choosing an engine or mechanics.
3. **Paws World: Farm to Choppies** — care for a companion, plant and harvest produce, manage limited resources and fulfil fictional supermarket supply requests. This can draw on Botswana's familiar farming context and help make the farm-to-shelf connection understandable. Any appearance by a real public figure must be authorized; until then use a clearly fictional guest character and never imply a real endorsement, request or supplier relationship.
4. **Fruit Match & Puzzle Bonuses** — matching, sorting or falling-fruit puzzles with clear rules, gradually increasing challenge and skill-based combinations. Optional rewards can connect to fictional in-game farm progress, but should not require real purchases or exposure to promotions.

Shared progression can include cosmetic unlocks, collection books, personal bests and family challenges. Keep rewards understandable and proportionate; avoid coercive streaks, random paid rewards, pay-to-win mechanics, frustration timers and purchase-dependent progression. Only describe a title as playable after the assets, core loop, controls, persistence and recovery have been implemented and tested.

### Family play, friends and online interaction

- Design the shopper as the account holder and decision-maker, with optional child/family play and clear caregiver explanations.
- Build a usable solo experience first. Local pass-and-play or family-on-one-device challenges can validate the fun before online multiplayer.
- For a later online family game night, prefer private rooms created by an adult, invitation links/codes that can be revoked, limited display names, block/report controls and no public child directory. Avoid public chat and direct messages for child-facing play unless a formal safeguarding and moderation plan is approved and implemented.
- Invite flows must not silently upload contacts or expose a user's phone number/email. Invitations should be deliberate and revocable; make clear who can join and for how long.
- Online multiplayer needs server-authoritative score/state validation, abuse prevention, rate limits, moderation operations, outage handling and a privacy review. A multiplayer-looking UI alone is not proof of network play.

### Product discovery, favourites and promotions

The product's utility for the primary shopper can complement—not interrupt—play:
- Optional favourites and product availability/discount notifications, only when there is an authorized, maintained source for product and offer data.
- Every offer should carry clear store/region, effective dates, terms and freshness; expire or suppress stale information. Never invent product prices, stock status, discount percentages, prizes or official promotions.
- Ask users to opt into notifications by purpose; allow topic preferences, quiet periods and easy opt-out. Distinguish service updates (for example, an invitation) from promotional messaging.
- Keep product promotion out of child-directed game mechanics. Do not make a child's progress depend on shopping, viewing an advert, sharing personal data or asking a caregiver to buy something.
- Where live product feeds are not available, label product content as sample/demo data or omit it. Do not present a prototype catalogue as real store inventory.

### Privacy and child well-being

The design target is a place to play, not a data-harvesting funnel:
- Allow menu discovery and basic play without an account where feasible; explain what account features unlock before signup.
- Request only data needed for an explicit feature. Prefer a display name or generated nickname over a child's real name; avoid date of birth beyond a justified age-assurance design, precise location, contacts, photos, school and long-form profiles by default.
- Document data purpose, access, retention, deletion, security boundaries and vendor sharing before implementing accounts, friends or notifications. Do not reuse inherited credentials or production datasets.
- Use private defaults, minimal activity visibility, adult-controlled family settings, accessible privacy controls and a clear account/data deletion route. Do not infer sensitive traits or use children's gameplay for behavioural advertising.
- Support agency, achievable mastery, creative exploration, emotional regulation and safe social connection as design goals, not guaranteed clinical or educational outcomes. Critical-thinking benefits should be treated as a hypothesis and evaluated through appropriate playtesting rather than asserted as fact.
- Include low-bandwidth behaviour, responsive portrait controls, readable text, reduced-motion support, no autoplay audio, keyboard access and recoverable failures.

### Validation plan before scaling

1. **Asset gate:** open and visually inspect shortlisted packs; confirm perspective, art style, animation, runtime weight and redistribution licence/attribution. Record provenance. Reject concepts whose required assets are missing rather than substituting geometric placeholders.
2. **Core-loop prototype:** make one complete short round for one selected game, including start, instructions, input, success/failure, retry, return and performance on a modest Android device.
3. **Family usability:** with appropriate caregiver consent, test whether adults and children understand the goal, controls, reward and exit without help; look for frustration, accidental purchases, confusing ads or data prompts. Do not collect identifiable research data unnecessarily.
4. **Privacy/safety gate:** review account necessity, data map, notification consent, private-room model, abuse reporting and retention before adding social features.
5. **Retail utility gate:** connect favourites/promotions only after an authorized product/offer data source and ownership are confirmed; test stale/offline data and opt-out.
6. **Evidence discipline:** separately record source review, automated tests, local runtime tests, deployed integration and real-device/family tests. No menu card, successful build or push alone proves the experience works.

### Evidence limitations

This remains desk research and a product hypothesis. The cited child-well-being frameworks support design principles, not a guarantee that these specific games improve critical thinking. The portfolio, online family night, public-figure cameo, favourites and promotion notifications are intended directions; permissions, data sources, safeguards and implementation still need validation.
