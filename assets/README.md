# Source asset packs

Downloaded source packs are kept under `assets/source-packs/` and are not copied into the public web build. Only selected, optimized runtime files should be placed under `public/assets/`.

Before integrating a source pack:
1. Inventory its files and inspect the actual visuals, perspective, frame layout, scale, formats, and dependencies.
2. Read and preserve the original licence, attribution, and README files.
3. Record source pack, source URL, licence, attribution, chosen files, and target game in `docs/CHOPPIES-ASSET-AUDIT.md`.
4. Do not use geometric primitives as substitute characters, food, props, or environments.
5. Keep one canonical copy of each source archive; do not commit duplicate downloads with suffixes such as `(1)`, `(2)`, or `(3)`.
