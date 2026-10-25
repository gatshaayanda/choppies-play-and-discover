# Choppies Play & Discover — Asset audit

**Checkpoint:** repository-level archive inventory and source-code review completed. The archive member listings, image dimensions, actual visual appearance, animation layouts, embedded licences and redistribution terms still require execution of the audit script and visual review. A filename is not proof that a pack is suitable or legally redistributable.

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
5. Run `npm run assets:audit` to inventory source archives and all extracted runtime files, including image dimensions and model metadata where readable. ZIP/JAR member listings and licence/readme candidates are catalogued; RAR/7z still require a compatible archive utility. Then open and visually inspect shortlisted art. Filename inventory alone cannot determine visual quality, animation correctness or licence permission.
6. Keep imported ZIP/RAR/7z files out of `public/`; never make customers download the source library with the app.


## Current implementation reality check — 25 October 2026

This section records a source-code inspection of the current `main` branch after the farm-first product direction was clarified. It is not a visual asset review or phone QA.

### What actually exists

- **The customer-facing entry is still an intro and concept menu.** `src/main.ts` starts only `BootScene` and `PublisherIntroScene`. The publisher intro renders `src/catalog.ts`, whose three cards explicitly say the directions are under review and are not launchable games. There is currently no farm-first entry choice or direct mini-game launcher in that customer-facing menu.
- **A farm-themed prototype exists, but it is not the intended Choppies flagship.** `LivingWorldGameScene` instantiates `PawsWorldExperience`. That is an inherited 2D canvas prototype with a single named dog, procedurally drawn farm scenery and animals, movement controls, a fixed herd destination, and a rabbit-chase task. It does not yet provide the requested persistent open-world farm, crop lifecycle, orchard sorting, coyote/Splatter defence, cart racing, pumpkin competition, cookhouse competition, or farm-to-order loop.
- **The current Paws World visuals are mostly procedural drawings.** Its active canvas loads `public/assets/paws-world/dog-brown.png` for the player dog; sheep, goats, rabbits, trees, pen, barn, water and feed visuals are drawn in code. This is a prototype implementation, not the required asset-led visual quality. Do not expand this approach into the Choppies flagship.
- **A separate Three.js farm/dog prototype is present in source but is not the active renderer.** `src/games/living-world/LivingWorldExperience.ts` uses Three.js and GLTFLoader, but `LivingWorldGameScene` does not instantiate it. That prototype loads only six selected GLBs (sheep, goat, dog house, water trough, fence gate and apple tree) and builds much of its environment and dog characters from primitive geometry. It is a reference for loading GLBs and camera/control experiments, not a finished open-world implementation.
- **The simulation core is a useful reusable foundation, but it is not yet connected to the active play loop.** `src/games/living-world/simulation.ts`, `types.ts`, `save.ts` and their Vitest tests model a versioned local world with goats, plant patches, water, seasons and bounded offline-time progression. The scene advances and saves that model, but the active Paws World canvas keeps its own separate local dog/animal state. The two states are not integrated into one consistent farm simulation.
- **The requested Choppies mini-games are not implemented.** Repository code search found no coyote/Splatter or rotten-tomato gameplay, Fruit Match, Shopping Cart Racing, pumpkin contest, or cooking competition implementation. These remain product direction, not available game modes. Vula's Car Wash is a separate mechanics reference, not a Choppies game dependency.
- **The intro/setup scenes are not part of the current entry path.** `LivingWorldIntroScene` and `LivingWorldSetupScene` exist as source files, but the current configured scene list does not register them. They cannot be treated as working user flows yet.

### Asset evidence currently available

- The tree contains **54 public GLB models** under the inherited farm/living-world collection: 24 animal-related models and 30 environment/prop models (based on the checked paths). This is a promising starting library for an asset-led farm, especially for animal variety, fencing, barns, crops, feed, troughs, storage and tools.
- Six canonical Choppies-specific source archives are present under `assets/source-packs/choppiesassets/`: KayKit Restaurant Bits, LowPoly Cafe Drinks, LowPoly Party Food, an unidentified glTF archive, Kenney Food Kit, and Kenney Pixel Platformer Food Expansion. The public runtime tree contains 2,425 PNG files, 54 GLBs, 82 JSON files, 10 SVGs and four JPGs. These are repository-tree counts, not a claim that all assets suit the project or are licensed for release.
- The archive-audit script is present at `scripts/audit-choppies-assets.mjs`, but this inspection did **not** execute it against a local checkout. The GitHub connector can inspect source text and repository paths but cannot render archive previews here. No archive member inventory, contact sheet, model polycount, animation-track inspection, licence determination or mobile performance measurement is claimed in this checkpoint.

### Recommended reuse order

1. **Keep the pure simulation core and tests** as the basis for crop growth, livestock needs, season progression and local save/resume, but extend its state model deliberately for crop types, harvests, inventory, farm locations, fictional requests and competition results.
2. **Audit and preview the existing 54 GLBs before adding new packs.** Build a small visual evidence sheet for animals, fences/gates, barn, crops, tractor, wagon, wheelbarrow, water and storage. Confirm material/texture dependencies, scale, animation clips, compressed size, attribution and licence. The existing filenames indicate likely categories but do not establish visual quality or legal reuse.
3. **Choose one coherent 3D art direction and prove one real scene first.** Start with a real character/animal, a compact farm area and real props from the audited library. Avoid making more placeholder geometric characters, food, crops, vehicles or buildings.
4. **Make the farm the primary entry and navigation world**, with an optional skip-able intro and separate direct-launch list for only genuinely playable solo activities. Keep the scene routing and return-to-farm behaviour explicit.
5. **Build the farming loop before peripheral games:** plough/prepare → plant → tend → harvest → store/sort → use produce for fictional requests, cook-offs and biggest-produce contests. Add Splatter at the pasture using real projectile/aiming mechanics after its cartoonish assets and collision rules are chosen. Cart racing should reuse Vula's physics lessons, but must wait for suitable cart/track assets.
6. **Do not implement promotion or review mechanics as gameplay gates.** Any real Choppies offers need authorised, current data; reviews must be optional and must not be rewarded or pressured. Keep all commercial content separate from child progression.

### Verification status

- GitHub Actions at commit `d5a191b` — build: **passed**; verify (tests and build): **passed**.
- The source-string syntax failure in `PawsWorldExperience.ts` was fixed in commit `d5a191b`.
- These checks prove compilation and automated tests only. They do not prove the assets have been visually approved, the farm is playable, the menu launches a game, the game runs well on Android, or offline PWA behaviour works.
- Local archive extraction, asset audit script execution, contact sheets, browser QA, phone QA and deployment QA remain outstanding.


### Archive member spot-check (GitHub-hosted ZIP metadata)

I inspected ZIP central-directory member names for the three smaller source archives directly from the repository. This is more than filename-only folder triage, but it still does **not** extract image previews, decode model geometry or animation tracks, or verify the legal terms inside the licence files.

| Archive | Confirmed member evidence | Practical conclusion |
|---|---|---|
| `LowPolyCafeDrinksPack_v1.0.zip` | 119 files: 29 GLB, 29 FBX, 29 OBJ, 29 MTL, one Blender scene, a README and `LICENSE.txt`. Named models include bubble tea, cappuccino, cake dome, espresso cup, smoothie glass, takeaway cup, milk jug, coffee tools and bakery items. | Strongest inspected candidate for a later cookhouse/cafe scene. Prefer the included GLBs for a browser test; inspect their materials and scale, then select a small consistent subset. Do not load every format duplicate into the app. |
| `LowPolyPartyFood_v1.0.zip` | 111 files: 27 GLB, 27 FBX, 27 OBJ, 27 MTL, one Blender scene, a README and `LICENSE.txt`. Includes burger, fries, pizza, taco, chips, cake, snacks, a snack stand and party props; it also includes a champagne-bottle model. | Useful food/competition props are present. Curate individual items; exclude alcohol-related art from the family-facing experience. Need visual/style review and licence confirmation before shipping. |
| `kenney_pixel-platformer-food-expansion.zip` | 125 files including 116 PNGs, a Construct 3 project, tilemaps, a preview/sample and a `License.txt`. The PNGs are mostly numbered tile images. | Likely a 2D side-view/platformer-oriented food expansion, not automatically a top-down farm or 3D world set. Open the preview and tilesheet before choosing it for Fruit Match; do not mix it into the farm scene without a deliberate art-direction decision. |

The repository API response did not provide complete binary data for the larger KayKit Restaurant Bits, Kenney Food Kit and unidentified glTF ZIPs, so their central directories were not successfully inspected in this pass. No claim is made about their actual member counts or contents. The archive files' embedded licence text has not yet been extracted and read; the presence of a licence/readme filename is not a legal clearance.
