# Choppies Play & Discover — Farm World checkpoint

## Product direction
This is a Choppies-branded gaming and discovery portal, not a shopping app. The intended customer journey is publisher intro → focused Choppies game library → Boy/Girl farmer choice → Farm World gameplay. Do not substitute Paws World or leave unrelated Admin Hub games presented as the Choppies product.

## Current implementation
- Choppies branding is applied to the publisher intro, library, PWA metadata and app package identity.
- The library is focused on Choppies Farm World; the startup imports only the scenes required for this experience so unrelated inherited game chunks cannot block launch.
- The player chooses Boy farmer or Girl farmer before entering the farm. Choice is stored locally and affects the farmer's current procedural presentation.
- Farm World uses committed GLB assets for the barn, tractor, trough, well, fence, farm sign, crop rows, cow, sheep, chick, goat and horse.
- Keyboard and touch movement are available. Current interactions include watering/harvesting crop rows, feeding animals and mounting/dismounting the horse after approaching it.
- The PWA install listener attaches before game startup. The branded card appears only when the browser supplies `beforeinstallprompt`; native installation is triggered by a user tap. Dismiss/reopen, iOS Safari guidance and embedded-browser guidance are implemented.
- The startup error screen now displays the actual exception rather than hiding it behind the generic message.

## Important limitations — do not misrepresent
- The farmer is still a procedural 3D model, not a validated authored farmer character asset.
- The horse uses the actual committed GLB, but an authored rider model and riding animation have not been verified. The current mount interaction is a prototype.
- Farm World progress now saves locally with a versioned, validated save: score, watered crop rows, harvested rows/basket count and animals fed survive refresh. Malformed/unsupported saves recover to a clean state. Each row can be watered once, must be watered before harvest, and cannot be harvested repeatedly for points.
- This is not yet a full simulation: crop growth stages, animal needs/autonomy, missions, bounded offline elapsed-time progression and a return report are not yet implemented.
- Asset placement, camera feel, horse scale/riding pose, browser startup and installability still require real-device QA. A successful build does not prove these.

## Verification / QA
1. Confirm production opens past the publisher intro and shows the focused Choppies Farm World library.
2. Start Farm World, select Boy and then Girl on separate runs; verify the choice changes the farmer and persists.
3. Verify the 3D environment and GLB assets load without console/network errors.
4. Move with the touch joystick and keyboard; approach crops and animals to test each interaction.
5. Approach the horse, mount, move, dismount and inspect the visual result.
6. Check portrait/landscape, safe areas and performance on the target phone.
7. In supported Chrome, confirm the install card appears only when the native event is available, only prompts on tap, and can be dismissed/reopened. On iOS Safari, verify Share → Add to Home Screen guidance.
8. Confirm the service worker updates the shell and does not strand the user on stale cached code.

## Next roadmap slices
1. Device-verify the Choppies startup, farmer selection, current farm playthrough and install experience.
2. Audit and validate the actual farmer/horse/animal asset archives, including animation clips and licences; replace the procedural farmer only with a suitable validated asset.
3. Extend the versioned local save into deterministic farm state: crop growth stages, animal needs, farm resources and bounded elapsed-time progression.
4. Add readable goals/progression and a return report only after the simulation/save tests pass.
5. Harden offline caching for required models and textures and test installed-PWA offline relaunch.
