export type CropStage = 'sprout' | 'growing' | 'ready' | 'harvested';
export type Weather = 'sunny' | 'cloudy' | 'rainy';
export type Season = 'spring' | 'summer' | 'autumn' | 'winter';

export type CropState = { stage: CropStage; moisture: number; growthDays: number };
export type AnimalCareState = { hunger: number; thirst: number; energy: number; trust: number };
export type FarmWorldState = {
  version: 1;
  lastSimulatedAt: number;
  totalGameDays: number;
  waterReserve: number;
  crops: Record<string, CropState>;
  animals: Record<string, AnimalCareState>;
  weather: Weather;
  season: Season;
  events: string[];
  returnReport: string[];
};

export const FARM_WORLD_STATE_KEY = 'choppies-farm-world-state-v1';
const DAY_MS = 6 * 60 * 60 * 1000; // Six real hours per in-game day.
const MAX_CATCH_UP_MS = 90 * 24 * 60 * 60 * 1000;
const SEASONS: Season[] = ['spring', 'summer', 'autumn', 'winter'];
const WEATHER: Weather[] = ['sunny', 'cloudy', 'rainy'];

export function createFarmWorldState(now = Date.now()): FarmWorldState {
  return {
    version: 1, lastSimulatedAt: now, totalGameDays: 0, waterReserve: 100,
    crops: {}, animals: {}, weather: 'sunny', season: 'spring', events: [], returnReport: [],
  };
}

function bounded(value: number, min = 0, max = 100): number {
  return Math.max(min, Math.min(max, Number.isFinite(value) ? value : min));
}

export function parseFarmWorldState(raw: string | null, now = Date.now()): FarmWorldState {
  if (!raw) return createFarmWorldState(now);
  try {
    const value: unknown = JSON.parse(raw);
    if (!value || typeof value !== 'object') return createFarmWorldState(now);
    const v = value as Record<string, unknown>;
    if (v.version !== 1) return createFarmWorldState(now);
    const state = createFarmWorldState(now);
    state.lastSimulatedAt = typeof v.lastSimulatedAt === 'number' && Number.isFinite(v.lastSimulatedAt) && v.lastSimulatedAt <= now + 60_000 ? Math.max(0, v.lastSimulatedAt) : now;
    state.totalGameDays = typeof v.totalGameDays === 'number' && Number.isFinite(v.totalGameDays) ? Math.max(0, Math.min(100000, Math.floor(v.totalGameDays))) : 0;
    state.waterReserve = bounded(typeof v.waterReserve === 'number' ? v.waterReserve : 100);
    if (v.weather === 'sunny' || v.weather === 'cloudy' || v.weather === 'rainy') state.weather = v.weather;
    if (v.season === 'spring' || v.season === 'summer' || v.season === 'autumn' || v.season === 'winter') state.season = v.season;
    if (v.crops && typeof v.crops === 'object' && !Array.isArray(v.crops)) {
      for (const [id, rawCrop] of Object.entries(v.crops as Record<string, unknown>).slice(0, 100)) {
        if (!rawCrop || typeof rawCrop !== 'object') continue;
        const crop = rawCrop as Record<string, unknown>;
        if (crop.stage !== 'sprout' && crop.stage !== 'growing' && crop.stage !== 'ready' && crop.stage !== 'harvested') continue;
        state.crops[id] = { stage: crop.stage, moisture: bounded(typeof crop.moisture === 'number' ? crop.moisture : 0), growthDays: bounded(typeof crop.growthDays === 'number' ? crop.growthDays : 0, 0, 1000) };
      }
    }
    if (v.animals && typeof v.animals === 'object' && !Array.isArray(v.animals)) {
      for (const [id, rawAnimal] of Object.entries(v.animals as Record<string, unknown>).slice(0, 30)) {
        if (!rawAnimal || typeof rawAnimal !== 'object') continue;
        const animal = rawAnimal as Record<string, unknown>;
        state.animals[id] = {
          hunger: bounded(typeof animal.hunger === 'number' ? animal.hunger : 40),
          thirst: bounded(typeof animal.thirst === 'number' ? animal.thirst : 35),
          energy: bounded(typeof animal.energy === 'number' ? animal.energy : 80),
          trust: bounded(typeof animal.trust === 'number' ? animal.trust : 10),
        };
      }
    }
    state.events = Array.isArray(v.events) ? v.events.filter((x): x is string => typeof x === 'string' && x.length <= 180).slice(-20) : [];
    state.returnReport = Array.isArray(v.returnReport) ? v.returnReport.filter((x): x is string => typeof x === 'string' && x.length <= 180).slice(-4) : [];
    return state;
  } catch {
    return createFarmWorldState(now);
  }
}

export function advanceFarmWorld(state: FarmWorldState, now: number): FarmWorldState {
  if (!Number.isFinite(now) || now <= state.lastSimulatedAt) return { ...state, returnReport: [] };
  const elapsed = Math.min(now - state.lastSimulatedAt, MAX_CATCH_UP_MS);
  const days = Math.floor(elapsed / DAY_MS);
  if (days < 1) return { ...state, returnReport: [] };
  const next: FarmWorldState = {
    ...state,
    crops: Object.fromEntries(Object.entries(state.crops).map(([id, crop]) => [id, { ...crop }])),
    animals: Object.fromEntries(Object.entries(state.animals).map(([id, animal]) => [id, { ...animal }])),
    events: [...state.events],
    returnReport: [],
  };
  const newEvents: string[] = [];
  for (let i = 0; i < days; i++) {
    next.totalGameDays += 1;
    const dayInSeason = next.totalGameDays % 90;
    const nextSeason = SEASONS[Math.floor(next.totalGameDays / 90) % SEASONS.length];
    if (nextSeason !== next.season) {
      next.season = nextSeason;
      newEvents.push(`A new season begins: ${nextSeason}.`);
    }
    next.weather = WEATHER[(next.totalGameDays + Math.floor(next.totalGameDays / 7)) % WEATHER.length];
    if (next.weather === 'rainy') next.waterReserve = bounded(next.waterReserve + 12);
    for (const [id, crop] of Object.entries(next.crops)) {
      if (crop.stage === 'harvested') continue;
      const moisture = bounded(crop.moisture - (next.weather === 'rainy' ? -22 : next.weather === 'sunny' ? 38 : 22));
      crop.moisture = moisture;
      if (crop.stage !== 'sprout' && crop.stage !== 'growing') continue;
      if (moisture > 15) {
        crop.growthDays += next.season === 'winter' ? 0.5 : 1;
        if (crop.growthDays >= 2) {
          crop.stage = 'ready';
          newEvents.push(`A crop row is ready to harvest (${id}).`);
        } else {
          crop.stage = 'growing';
        }
      }
    }
    for (const [id, animal] of Object.entries(next.animals)) {
      const beforeHungry = animal.hunger >= 80;
      const beforeThirsty = animal.thirst >= 80;
      animal.hunger = bounded(animal.hunger + 12);
      animal.thirst = bounded(animal.thirst + 15);
      animal.energy = bounded(animal.energy - 4);
      if (!beforeHungry && animal.hunger >= 80) newEvents.push(`An animal needs feeding (${id}).`);
      if (!beforeThirsty && animal.thirst >= 80) newEvents.push(`An animal needs water (${id}).`);
      // The farm is forgiving: animals become tired or needy, never die while offline.
    }
    if (dayInSeason === 0 && next.totalGameDays > 0) newEvents.push('The farm season has turned.');
  }
  next.lastSimulatedAt = state.lastSimulatedAt + elapsed;
  next.events = [...next.events, ...newEvents].slice(-20);
  next.returnReport = [...new Set(newEvents)].slice(-4);
  return next;
}

export function waterCrop(state: FarmWorldState, id: string): { state: FarmWorldState; message: string } {
  if (state.waterReserve < 10) return { state, message: 'The water reserve is low. Wait for rain before watering again.' };
  const existing = state.crops[id];
  if (existing?.stage === 'ready') return { state, message: 'This row is ready to harvest.' };
  if (existing?.stage === 'sprout' || existing?.stage === 'growing') return { state, message: 'This row is growing already. Give it time to mature.' };
  const crops = { ...state.crops, [id]: { stage: 'sprout' as const, moisture: 100, growthDays: 0 } };
  return { state: { ...state, crops, waterReserve: bounded(state.waterReserve - 10) }, message: 'Crop planted and watered. It needs time and moisture to mature.' };
}

export function harvestCrop(state: FarmWorldState, id: string): { state: FarmWorldState; harvested: boolean; message: string } {
  const crop = state.crops[id];
  if (!crop || crop.stage === 'harvested') return { state, harvested: false, message: 'This row has no harvest ready yet. Water it first.' };
  if (crop.stage !== 'ready') return { state, harvested: false, message: 'The vegetables are still growing. Come back after more farm time.' };
  return { state: { ...state, crops: { ...state.crops, [id]: { ...crop, stage: 'harvested', moisture: 0 } } }, harvested: true, message: 'Fresh produce collected for the Choppies basket!' };
}

export function feedAnimal(state: FarmWorldState, id: string): FarmWorldState {
  const animal = state.animals[id] ?? { hunger: 45, thirst: 35, energy: 80, trust: 10 };
  return { ...state, animals: { ...state.animals, [id]: { ...animal, hunger: 10, thirst: Math.max(0, animal.thirst - 12), trust: bounded(animal.trust + 5) } } };
}

export function waterAnimal(state: FarmWorldState, id: string): FarmWorldState {
  if (state.waterReserve < 5) return state;
  const animal = state.animals[id] ?? { hunger: 45, thirst: 35, energy: 80, trust: 10 };
  return { ...state, waterReserve: bounded(state.waterReserve - 5), animals: { ...state.animals, [id]: { ...animal, thirst: 5, trust: bounded(animal.trust + 2) } } };
}

export function saveFarmWorldState(state: FarmWorldState, storage: Pick<Storage, 'setItem'> = window.localStorage): void {
  try { storage.setItem(FARM_WORLD_STATE_KEY, JSON.stringify(state)); } catch { /* Keep play available when storage is full. */ }
}

export function loadFarmWorldState(now = Date.now(), storage: Pick<Storage, 'getItem' | 'setItem'> = window.localStorage): FarmWorldState {
  let raw: string | null = null;
  try { raw = storage.getItem(FARM_WORLD_STATE_KEY); } catch { /* private mode or disabled storage */ }
  const parsed = parseFarmWorldState(raw, now);
  const advanced = advanceFarmWorld(parsed, now);
  saveFarmWorldState(advanced, storage);
  return advanced;
}
