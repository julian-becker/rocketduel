import 'react-native';
import {
  initTargets
} from '../hooks/useTarget';

let player = {
  location: {
    coords: [40.7141, -80.138]
  }
}
test('generates targets for the first level', () => {
  player = { ...player, level: 0}
  const targets = initTargets(player);
  expect(targets.length).toBe(1);
  expect(targets[0].type).toBe('red');
});

test('generates targets for level 3', () => {
  player = { ...player, level: 3}
  const targets = initTargets(player);
  expect(targets.length).toBe(5);
  const blueTargets = targets.filter((target) => target.type === 'blue').length
  expect(blueTargets).toBe(4);
});
