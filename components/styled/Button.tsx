import styled from 'styled-components/native'

import { black, red } from './Colors'

export default Button = styled.TouchableOpacity`
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

Button.defaultProps = {
  backgroundColor: red
}