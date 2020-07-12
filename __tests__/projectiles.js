import 'react-native';
import { DEFAULT_STATE } from '../hooks/useProjectile';
import { fireProjectile, loadNextProjectile, initProjectiles } from '../actions/projectiles';

test('generates projectiles', () => {
  const projectiles = initProjectiles(DEFAULT_STATE);
  expect(projectiles.clip.length).toBe(3);
  expect(projectiles.clip[0].isInFlight).toBe(false);
});

test('fires a projectile', () => {
  const projectile = {"altitude": 0, "azimuth": 0, "coords": null, "elevation": 0, "id": "811131c2-3d90-4aba-af10-4eb73b8a275c", "isInFlight": false, "isLanded": false, "thrust": 0, "visible": true}
  const params = { elevation: 38, azimuth: 193, thrust: 45 }
  const firedProjectile = fireProjectile({projectile: projectile, params: params});
  expect(firedProjectile.isInFlight).toBe(true);
  expect(firedProjectile.isLanded).toBe(false);
  expect(firedProjectile.visible).toBe(true);
});

test('loads the next projectile', () => {
  const projectiles = [
    {"altitude": 0, "azimuth": 305, "coords": null, "elevation": 38, "id": "0f6fd69b-9f38-4191-8f9c-807de4a04998", "isInFlight": true, "isLanded": false, "thrust": 0, "visible": true},
    {"altitude": 0, "azimuth": 0, "coords": null, "elevation": 0, "id": "811131c2-3d90-4aba-af10-4eb73b8a275c", "isInFlight": false, "isLanded": false, "thrust": 0, "visible": false},
    {"altitude": 0, "azimuth": 0, "coords": null, "elevation": 0, "id": "fb89c1eb-9b9f-45ab-abcc-0ebc1bd5b43c", "isInFlight": false, "isLanded": false, "thrust": 0, "visible": false}
  ]
  const updatedProjectiles = loadNextProjectile(projectiles);
  const visibleProjectiles = updatedProjectiles.filter( p => p.visible === true);
  expect(visibleProjectiles.length).toBe(2);
});
