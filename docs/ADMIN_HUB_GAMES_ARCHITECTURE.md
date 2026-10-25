# Choppies Play & Discover — Architecture checkpoint

## Product
Choppies Play & Discover is a branded interactive destination for shoppers and families, not one single game. Its shell owns the intro, menu, PWA identity, activity status, and return-to-menu journey. Each activity remains a separate experience.

## Current foundation
- Vite + TypeScript application shell.
- Phaser scenes for inherited 2D prototypes.
- Three.js used by the inherited Paws World experience and available for reviewed 3D assets.
- PWA registration and native, user-initiated install prompt.
- Vula's Car Wash is a separate reference repository for racing physics/collision patterns, not a runtime dependency.

## Current customer-facing state
The intro and menu use Choppies Play & Discover identity. The menu presents Food & Market, Family Fun, and Racing & Driving as directions under review, not as playable or completed games. Existing inherited prototypes remain in source but are not presented as Choppies activities before asset and audience review.

## Asset boundary
- Source archives are stored in `assets/source-packs/` and are not served as public assets.
- Only selected, optimized runtime files belong in `public/assets/`.
- The archive inventory tool lists ZIP/JAR contents and licence/readme candidates; visual review and licence determination remain separate acceptance gates.
- Keep an asset provenance/licence record before shipping any selected art.

## Audience and safety
Mobile-first for Botswana shoppers and families. Prefer low-data loading, clear touch targets, brief rounds, agency, mastery, family connection, and safety-by-design. Do not add public chat, unnecessary child data collection, manipulative retention mechanics, or inherited production backend integrations without a separately reviewed requirement.

## Verification status
Identity/source changes are checkpointed in GitHub. Build, automated tests, local runtime, PWA installation, offline behavior, and real-device usability must be verified separately; a commit does not prove them.
