# Choppies Play & Discover — Asset audit

**Checkpoint:** archive-level inventory from the GitHub repository tree. Archive contents, preview images, animation layouts, embedded licences and redistribution terms have not yet been fully inspected. A filename is not proof that a pack is suitable or legally redistributable.

## Choppies-specific source packs
The initial upload contained 11 archive paths but only 6 distinct archive blobs. Duplicates have been consolidated to one canonical copy of each pack and moved out of `public/` so source ZIPs are not shipped to visitors.

| Canonical source pack | Compressed size | Initial assessment | Still required |
|---|---:|---|---|
| `KayKit_Restaurant_Bits_1.0_FREE.zip` | 11.30 MB | Restaurant/environment candidate | Inspect models, textures, licence and web suitability |
| `LowPolyCafeDrinksPack_v1.0.zip` | 0.55 MB | Drinks/props candidate | Inspect formats, materials, licences and model quality |
| `LowPolyPartyFood_v1.0.zip` | 0.55 MB | Food/props candidate | Inspect model variety, dependencies and licence |
| `glTF-20261024T163640Z-1-001.zip` | 21.46 MB | Unknown 3D pack | Inventory every file; identify models, textures, audio and licence |
| `kenney_food-kit.zip` | 4.61 MB | Strong 2D food-sprite candidate | Inspect sprites, sheets, animation/frame layout, licence and target resolution |
| `kenney_pixel-platformer-food-expansion.zip` | 0.16 MB | 2D food/collectible candidate | Check style compatibility, perspective and licence |

Two extra KayKit copies and three extra Kenney Food Kit copies were byte-identical to their canonical copies in the initial Git tree and have been removed.

## Inherited source collection
The repository initially contained about 96 files under `public/assets/imported-packs/`. Source archives and documents have now been moved to `assets/source-packs/inherited/`; loose images used by existing prototypes remain under `public/assets/imported-packs/`.

Filename-only candidates:
- **Food/collectibles:** `kenney_fish-pack_2.zip`, `Fantasy Crops.zip`, `fishing_free.zip`, `Harvest Sumer Free Ver. Pack.rar`.
- **Family/nature:** `CatnDog.zip`, `dog.zip`, `dogcharacterbystyloo.zip`, Kenney animal packs and loose dog spritesheets. Paws World already integrates one brown dog spritesheet; do not duplicate or replace it without visual QA.
- **World/market environments:** `Tiny Village Pack.zip`, `Tiny Village Updates.zip`, `Interior free.zip`, `MiniWorldSprites.zip`; perspective and style consistency must be checked.
- **UI:** `Pocket GUI.zip`, `kenney_pixel-ui-pack.zip`, and related packs.
- **Mismatch until inspected:** side-view platformer, fantasy combat, weapon, medieval dungeon and combat-character packs are not automatically suitable for family retail play.

A name/size inventory is not a visual audit. Every candidate must be opened and viewed before integration.

## Vula's Car Wash racing reference
Inspected repository: `gatshaayanda/vulas-car-wash`.

Reviewed files:
- `src/app/games/racing-warmup.tsx`: race state includes world position/velocity/yaw, lateral velocity, speed, steering, throttle, brake pressure, NOS, off-track state, damage and impact time.
- `src/app/games/racing-track.ts`: Three.js Catmull–Rom track curve and turn sampling.
- `src/app/games/racing-3d-scene.tsx`: visible rail geometry and dense swept barrier segments; the car's previous-to-current world-space movement is checked against barrier segments to prevent tunnelling.
- `docs/RACING-WARMUP-BASELINE.md`: owner-approved handling/collision invariants.
- `docs/RACING-GAME-PLAN.md`: separates current warm-up from planned career features.

Reuse lesson: the car owns its world position and velocity; track projection is for timing, limits and collision queries, not a hidden force that drags the car along the route. Barrier collision must constrain position continuously; collision cooldowns may throttle damage/toasts but never physical resolution. Preserve touch/keyboard semantics and verify left/right sign conventions. This is a mechanics reference, not permission to copy Vula branding or business features.

## Candidate experiences — only after visual audit
| Candidate | Why it may fit | Minimum art/mechanics gate | Status |
|---|---|---|---|
| Food/produce collection or sorting | Short rounds; recognisable objects; family pass-and-play | Real food sprites with consistent perspective, pickup feedback, no placeholder shapes | Candidate only |
| Mini market discovery | Connects product discovery and everyday shopping | Coherent shelves/props/characters; no unapproved offers/prices; simple navigation | Candidate only |
| Cafe/food preparation | Restaurant/drink packs may support tactile sequences | Matching props, readable interactions, suitable camera and performance | Candidate only |
| Family co-op challenge | Supports shared play and conversation | Clear roles or pass-and-play, no public chat, robust round reset | Candidate only |
| Racing challenge | Vula provides a proven handling/collision reference | Compatible real vehicle/track art; verified collisions and mobile controls; no geometric placeholder track | Candidate only; not yet in this repo |
| Nature/animal break | Paws World and animal packs may be reusable | Confirm fit for the Choppies audience and visually QA existing art | Existing inherited prototype; not Choppies-specific |

## Next inspection
1. Source archives live under `assets/source-packs/`, outside `public/`.
2. Only approved runtime assets go into `public/assets/choppies/` after optimisation.
3. For each selected asset, record path, dimensions/polycount, format, licence, attribution, source URL, target scene and device budget.
4. Do not invent/draw substitute geometric characters, food or vehicles when a pack lacks the required asset. Reject the concept or find a properly licensed matching asset.
5. Run `node scripts/audit-choppies-assets.mjs` to list ZIP/JAR members and licence/readme candidates, then visually inspect shortlisted art. RAR/7z require a compatible archive utility. Filename inventory alone cannot determine visual quality, animation correctness or licence permission.
6. Keep imported ZIP/RAR/7z files out of `public/`; never make customers download the source library with the app.
