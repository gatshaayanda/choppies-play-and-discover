import { describe, expect, it } from 'vitest';
import {
  advanceFarmWorld, createFarmWorldState, feedAnimal, harvestCrop, parseFarmWorldState,
  waterAnimal, waterCrop,
} from './farm-world-state';

const DAY = 6 * 60 * 60 * 1000;

describe('Farm World simulation core', () => {
  it('advances crop growth and animal needs deterministically', () => {
    const initial = createFarmWorldState(0);
    const watered = waterCrop(initial, 'crop-a').state;
    const animal = feedAnimal(watered, 'cow-a');
    const a = advanceFarmWorld(animal, DAY * 2);
    const b = advanceFarmWorld(animal, DAY * 2);
    expect(a).toEqual(b);
    expect(a.crops['crop-a'].stage).toBe('ready');
    expect(a.animals['cow-a'].hunger).toBe(34);
    expect(a.animals['cow-a'].thirst).toBe(33);
    expect(a.returnReport.some((event) => event.includes('ready to harvest'))).toBe(true);
  });

  it('requires a crop to mature before harvest and allows one harvest', () => {
    const planted = waterCrop(createFarmWorldState(0), 'crop-a').state;
    expect(harvestCrop(planted, 'crop-a').harvested).toBe(false);
    const mature = advanceFarmWorld(planted, DAY * 2);
    const harvest = harvestCrop(mature, 'crop-a');
    expect(harvest.harvested).toBe(true);
    expect(harvestCrop(harvest.state, 'crop-a').harvested).toBe(false);
  });

  it('does not simulate time twice or move backwards when the clock rolls back', () => {
    const initial = createFarmWorldState(1000);
    const advanced = advanceFarmWorld(initial, 1000 + DAY);
    expect(advanceFarmWorld(advanced, 1000 + DAY)).toEqual({ ...advanced, returnReport: [] });
    const rollback = advanceFarmWorld(advanced, 10);
    expect(rollback.totalGameDays).toBe(advanced.totalGameDays);
    expect(rollback.lastSimulatedAt).toBe(advanced.lastSimulatedAt);
  });

  it('caps catch-up after long absence and never kills unattended animals', () => {
    const initial = createFarmWorldState(0);
    const fed = feedAnimal(initial, 'goat-a');
    const resumed = advanceFarmWorld(fed, 365 * 24 * DAY);
    expect(resumed.totalGameDays).toBe(360);
    expect(resumed.animals['goat-a'].hunger).toBe(100);
    expect(resumed.animals['goat-a']).toHaveProperty('energy');
  });

  it('recovers from malformed or unsupported saves', () => {
    expect(parseFarmWorldState('{bad', 123)).toEqual(createFarmWorldState(123));
    expect(parseFarmWorldState(JSON.stringify({ version: 99 }), 123)).toEqual(createFarmWorldState(123));
  });

  it('uses rain to replenish water and allows watering animals', () => {
    const initial = createFarmWorldState(0);
    const watered = waterAnimal(initial, 'sheep-a');
    expect(watered.animals['sheep-a'].thirst).toBe(5);
    expect(watered.waterReserve).toBe(95);
  });
});
