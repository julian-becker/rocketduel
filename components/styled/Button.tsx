import React from 'react';
import styled from 'styled-components';
import { ButtonText } from './Text';
import { black } from './Colors'

const Button = ({
  clickData,
  text,
  bold,
  textColor,
  backgroundColor,
  onClick,
  accessibilityId,
  disabled
}) => {
  return (
    <ButtonWrap
      onPress={() => onClick(clickData)}
      accessibilityId={accessibilityId}
      backgroundColor={backgroundColor}
      disabled={disabled ? disabled : false}
    >
      <ButtonText bold={bold} color={textColor}>{text}</ButtonText>
    </ButtonWrap>
  )
}

const ButtonWrap = styled.TouchableHighlight`
width: 100%;
background-color: ${props => props.backgroundColor};
opacity: ${props => (props.disabled === true ? 0.5 : 1)};
height: 60px;
margin: 10px;
border-radius: 8px;
flex-direction: row;
justify-content: center;
align-items: center;
elevation: 5;
box-shadow: 1px 2px 2px ${black};
`
export default Button;