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
