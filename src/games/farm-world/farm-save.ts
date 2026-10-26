export type FarmSave = {
  version: 1;
  savedAt: number;
  score: number;
  wateredCropIds: string[];
  harvestedCropIds: string[];
  fedAnimalIds: string[];
};

export const FARM_SAVE_KEY = 'choppies-farm-world-save-v1';

export function emptyFarmSave(now = Date.now()): FarmSave {
  return { version: 1, savedAt: now, score: 0, wateredCropIds: [], harvestedCropIds: [], fedAnimalIds: [] };
}

function uniqueStrings(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return [...new Set(value.filter((item): item is string => typeof item === 'string' && item.length > 0 && item.length < 240))].slice(0, 100);
}

export function parseFarmSave(raw: string | null, now = Date.now()): FarmSave {
  if (!raw) return emptyFarmSave(now);
  try {
    const value: unknown = JSON.parse(raw);
    if (!value || typeof value !== 'object') return emptyFarmSave(now);
    const v = value as Record<string, unknown>;
    if (v.version !== 1) return emptyFarmSave(now);
    return {
      version: 1,
      savedAt: typeof v.savedAt === 'number' && Number.isFinite(v.savedAt) && v.savedAt <= now + 60_000 ? Math.max(0, v.savedAt) : now,
      score: typeof v.score === 'number' && Number.isFinite(v.score) ? Math.max(0, Math.min(1_000_000, Math.floor(v.score))) : 0,
      wateredCropIds: uniqueStrings(v.wateredCropIds),
      harvestedCropIds: uniqueStrings(v.harvestedCropIds),
      fedAnimalIds: uniqueStrings(v.fedAnimalIds),
    };
  } catch {
    return emptyFarmSave(now);
  }
}

export function readFarmSave(now = Date.now()): FarmSave {
  try {
    return parseFarmSave(window.localStorage.getItem(FARM_SAVE_KEY), now);
  } catch {
    return emptyFarmSave(now);
  }
}

export function writeFarmSave(save: FarmSave): void {
  try {
    window.localStorage.setItem(FARM_SAVE_KEY, JSON.stringify({ ...save, savedAt: Date.now() }));
  } catch {
    // The farm remains playable when browser storage is unavailable or full.
  }
}
