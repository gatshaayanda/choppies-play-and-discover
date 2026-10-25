# Choppies Play & Discover — Farm World checkpoint

## Current implementation
- The clean Admin Hub Games clone remains the foundation; shared games and install/service-worker mechanisms are retained.
- The library presents **Choppies Farm World** instead of Paws World.
- The intro identifies Choppies Play & Discover.
- First entry requires choosing **Boy farmer** or **Girl farmer**. The choice is saved locally and used to vary the farmer presentation.
- Farm World loads committed 3D GLB assets for the barn, tractor, trough, well, fence, farm sign, vegetable rows and animals.
- The first gameplay loop supports keyboard and touch movement, walking close to crop rows to water/harvest, and approaching animals to feed them. Points and watering progress are session state at this stage.
- App metadata, manifest identity, publisher intro and PWA install-card wording are branded for Choppies. The install event lifecycle, user-triggered native prompt and service-worker code path were not redesigned.

## Important limitations
- This is an initial playable slice, not a finished farming simulation. Harvest/feeding are interaction prototypes; inventory, crop growth, animal needs, quests, persistence and progression are not yet implemented.
- The farmer presentation is currently a lightweight procedural 3D character; the committed Mana Seed Farmer Sprite Free Sample archive has not yet been extracted and validated for runtime use.
- The existing imported GLB assets load asynchronously; their final in-browser scale/placement and mobile performance still require QA.
- Automated build/tests and real-device/browser QA have not yet been run in this implementation environment. Do not infer deployment from GitHub commits.

## QA gate
1. Open the app and enter the game library.
2. Select Choppies Farm World; verify the Choppies intro and boy/girl choice.
3. Select each farmer and confirm the selected presentation changes.
4. Check the 3D farm loads, then use the on-screen pad and WASD/arrows to move.
5. Approach the vegetable rows and test WATER CROPS and HARVEST; approach each animal and test FEED ANIMALS.
6. Test portrait/landscape and small-screen controls; check browser console/network for asset-load errors.
7. Verify PWA install still appears only when the browser supplies the native install event and that install requires the user's tap.
8. Confirm Hall, President's Shoes, Shooters Trigger and Wardrobe still open correctly.
