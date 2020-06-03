import React from 'react';
import styled from 'styled-components';
import { ButtonText } from './Text';
import { black, red } from './Colors'

const Button = ({
  clickData,
  text,
  bold,
  textColor,
  backgroundColor,
  onClick,
  accessibilityId
}) => {
  return (
    <ButtonWrap
      onPress={() => onClick(clickData)}
      accessibilityId={accessibilityId}
      backgroundColor={backgroundColor}
    >
      <ButtonText bold={bold} color={textColor}>{text}</ButtonText>
    </ButtonWrap>
  )
}

const ButtonWrap = styled.TouchableOpacity`
width: 100%;
background-color: ${props => props.backgroundColor};
height: 60px;
border-radius: 8px;
flex-direction: row;
justify-content: center;
align-items: center;
elevation: 5;
box-shadow: 1px 2px 2px ${black};
`
export default Button;