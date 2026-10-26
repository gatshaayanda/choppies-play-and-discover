import { describe, expect, it } from 'vitest';
import { emptyFarmSave, parseFarmSave } from './farm-save';

describe('Farm World local save validation', () => {
  it('starts with a clean versioned save', () => {
    expect(emptyFarmSave(123)).toEqual({
      version: 1, savedAt: 123, score: 0,
      wateredCropIds: [], harvestedCropIds: [], fedAnimalIds: [],
    });
  });

  it('restores progress and removes duplicate or invalid IDs', () => {
    const save = parseFarmSave(JSON.stringify({
      version: 1, savedAt: 100, score: 25,
      wateredCropIds: ['crop-a', 'crop-a', '', 7],
      harvestedCropIds: ['crop-a'], fedAnimalIds: ['cow-1'],
    }), 200);
    expect(save).toEqual({
      version: 1, savedAt: 100, score: 25,
      wateredCropIds: ['crop-a'], harvestedCropIds: ['crop-a'], fedAnimalIds: ['cow-1'],
    });
  });

  it('recovers safely from malformed, unsupported or future-clock saves', () => {
    expect(parseFarmSave('{broken', 200)).toEqual(emptyFarmSave(200));
    expect(parseFarmSave(JSON.stringify({ version: 99, score: 900 }), 200)).toEqual(emptyFarmSave(200));
    expect(parseFarmSave(JSON.stringify({ version: 1, savedAt: 9999, score: -20 }), 200)).toEqual({
      version: 1, savedAt: 200, score: 0,
      wateredCropIds: [], harvestedCropIds: [], fedAnimalIds: [],
    });
  });
});
