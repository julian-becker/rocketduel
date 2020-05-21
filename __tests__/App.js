import 'react-native';
import React from 'react';
import App from '../App.tsx';

// Note: test renderer must be required after react-native.
import { render } from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';

jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper')

test('renders correctly', () => {
    const { getByTestId, baseElement } = render(<App />);
    //console.log(getByTestId('newGameButton').props.title);
    expect(getByTestId('welcomeText').props.children).toBe(`Welcome to Rocket Duel`);
    expect(getByTestId('newGameButton')).toHaveTextContent(`New Game`);
});
