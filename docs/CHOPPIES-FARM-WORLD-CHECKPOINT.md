# Choppies Play & Discover — Farm World checkpoint

## Product direction
This is a Choppies-branded gaming and discovery portal, not a shopping app. The intended customer journey is publisher intro → focused Choppies game library → Boy/Girl farmer choice → Farm World gameplay. Do not substitute Paws World or leave unrelated Admin Hub games presented as the Choppies product.

## Current implementation
- Choppies branding is applied to the publisher intro, library, PWA metadata, package identity and service-worker cache namespace.
- The library is focused on Choppies Farm World. Startup imports only the scenes required for this experience.
- The player chooses Boy farmer or Girl farmer before entering the farm. The choice is stored locally and currently changes a procedural farmer presentation.
- The 3D farm uses committed GLB assets for the barn, tractor, trough, well, fence, farm sign, crop rows, cow, sheep, chick, goat and horse.
- Keyboard and touch movement are available. The player can water crop rows, harvest mature crops, feed and water animals, and mount/dismount the horse.
- Farm simulation is separated into pure TypeScript in `src/games/farm-world/farm-world-state.ts`: validated local state, crop stages, water reserve, deterministic weather/seasons, animal hunger/thirst/energy/trust, bounded elapsed-time catch-up and a return report.
- Crop rows visibly change scale as they sprout, grow, mature and become harvested. Harvesting requires a mature crop; each row is harvested once in this slice.
- Simulation tests cover deterministic growth, harvest rules, clock rollback, bounded catch-up, animal needs and malformed saves.
- The PWA install listener attaches before game startup. The branded card appears only when the browser supplies `beforeinstallprompt`; native installation is triggered by a user tap. Dismiss/reopen, iOS Safari guidance and embedded-browser guidance are implemented.
- Startup previously invoked `startHall()` twice. This was fixed in commit `53ff435d790d3f3c6aa00e114c350cb344fe8f29`; the error screen retains visible exception details.
- The service worker now increments its Choppies cache version and caches GLB/glTF and related static assets after they have been fetched, so stale cached scripts can be replaced and farm assets can be reused offline after an online load.

## Important limitations — do not misrepresent
- The farmer is still a procedural 3D model, not a validated authored farmer character asset.
- The horse uses the actual committed GLB, but an authored rider model and riding animation have not been verified. The current mount interaction is a prototype, not a complete animated riding system.
- Animal needs progress over elapsed in-game days, but animals do not yet autonomously seek food, water, shade or safety, and the herd does not yet have movement/cohesion AI.
- The simulation is local-first. Cloud sync, mission progression and a full set of ecology systems are not implemented.
- The offline cache can retain assets after an online visit; first-time offline use before assets have been downloaded is not guaranteed.
- Asset placement, camera feel, collision quality, horse scale/riding pose, browser startup and installation still require real-device QA. A successful build does not prove these.

## Verification / QA
1. Open the production URL and confirm it proceeds past the publisher intro to the focused Choppies Farm World library.
2. Start Farm World, select Boy and then Girl on separate runs; verify the choice changes the farmer and persists.
3. Verify the 3D environment and GLB assets load without console/network errors.
4. Move with the touch joystick and keyboard. Water a crop row, verify it changes to a growing stage, wait for simulation time to advance, and harvest only when mature.
5. Feed and water an animal; verify water reserve and care status are reflected in the HUD.
6. Reopen after enough elapsed time to trigger a return report; verify the world advances once and unattended animals are not killed.
7. Approach the horse, mount, move, dismount and inspect the visual result.
8. Check portrait/landscape, safe areas and performance on the target phone.
9. In supported Chrome, confirm the install card appears only when the native event is available, only prompts on tap, and can be dismissed/reopened. On iOS Safari, verify Share → Add to Home Screen guidance.
10. After a successful online visit, test installed-PWA relaunch offline and confirm the cached farm assets load.

## Next roadmap slices
1. Complete phone QA for startup, character choice, farm play, riding and installation; fix observed issues before adding more scope.
2. Audit actual character/animal archives for model rigging, authored animations and licences; replace the procedural farmer only with a suitable validated asset.
3. Add animal autonomous needs-seeking and small-scale movement/avoidance without destabilising the current renderer.
4. Add clear player goals, a harvest basket loop and a readable return report/returning-player summary.
5. Harden offline asset precaching and test installed Android PWA offline relaunch.
