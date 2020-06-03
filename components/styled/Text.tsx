import React from 'react';
import { Platform, Text } from 'react-native';
import { human, material, systemWeights } from 'react-native-typography';
import styled, { css } from 'styled-components';
import { black, white } from './Colors';


const BaseTextStyles = css`
  color: ${props => (props.color ? props.color : black)};
  text-align: ${props => (props.align ? props.align : 'left')};
`;

const BodyText = styled(props => <Text {...props} />)`
  ${Platform.OS === 'ios' ? human.bodyObject : material.body1Object};
  ${BaseTextStyles}
`;

const ButtonText = styled(props => <Text {...props} />)`
  ${Platform.OS === 'ios' ? human.title1Object : material.titleObject};
  ${systemWeights.semibold}
  ${BaseTextStyles}
`;

const Header = styled(props => <Text {...props} />)`
  ${Platform.OS === 'ios' ? human.headlineObject : material.subheadingObject};
  ${systemWeights.bold}
  ${BaseTextStyles}
`;

export { BodyText, ButtonText, Header };