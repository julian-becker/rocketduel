import 'react-native';
import {
  calculateOffset,
  calculatePerceivedHeight,
  calculateXPos
} from '../lib/helpers';

const SMALL_IMAGE_WIDTH = 800; // in px
const LARGE_IMAGE_WIDTH = 4096; // in px

// single entity positioning
describe('calculates absolute pixel offsets', () => {
  test('converts positive pixel offsets', () => {
    const initialAzimuth = 90; // in degrees
    const currentAzimuth = 90;
    expect(calculateOffset(SMALL_IMAGE_WIDTH, initialAzimuth, currentAzimuth)).toBe(400);
    expect(calculateOffset(LARGE_IMAGE_WIDTH, initialAzimuth, currentAzimuth)).toBe(2048);
  });

  test('wraps around when calculating pixel offsets', () => {
    const initialAzimuth = 270; // in degrees
    const currentAzimuth = 180;
    expect(calculateOffset(SMALL_IMAGE_WIDTH, initialAzimuth, currentAzimuth)).toBe(200);
    expect(calculateOffset(LARGE_IMAGE_WIDTH, initialAzimuth, currentAzimuth)).toBe(1024);
  });

  test('calculates zero offset', () => {
    const initialAzimuth = 180; // in degrees
    const currentAzimuth = 180;
    expect(calculateOffset(SMALL_IMAGE_WIDTH, initialAzimuth, currentAzimuth)).toBe(0);
    expect(calculateOffset(LARGE_IMAGE_WIDTH, initialAzimuth, currentAzimuth)).toBe(0);
  });
});

// relative positioning between two entities
describe('calculates relative pixel offsets in a small image', () => {
  test('places targets to the right', () => {
    const playerPos = 200; // in px
    const targetPos = 500; // in px
    expect(calculateXPos(SMALL_IMAGE_WIDTH, playerPos, targetPos)).toBe(300);
  });

  test('places targets to the left', () => {
    const playerPos = 200; // in px
    const targetPos = 750; // in px
    expect(calculateXPos(SMALL_IMAGE_WIDTH, playerPos, targetPos)).toBe(-250);
  });
});

describe('calculates relative pixel offsets in a large image', () => {
  test('places targets to the right', () => {
    const playerPos = 280; // in px
    const targetPos = 1115; // in px
    expect(calculateXPos(LARGE_IMAGE_WIDTH, playerPos, targetPos)).toBe(835);
  });

  test('places targets to the left', () => {
    const playerPos = 280; // in px
    const targetPos = 3125; // in px
    expect(calculateXPos(LARGE_IMAGE_WIDTH, playerPos, targetPos)).toBe(-1251);
  });
});

describe('calculates relative target height', () => {
  test('converts faraway enemies', () => {
    const realSize = 8; // in meters
    const distance = 1000; // meters, farthest away
    expect(calculatePerceivedHeight(realSize, distance)).toBeCloseTo(21.5);
  });

  test('converts nearby enemies', () => {
    const realSize = 13; // in meters
    const distance = 180; // close!
    expect(calculatePerceivedHeight(realSize, distance)).toBeCloseTo(194.05);
  });

});