/* eslint-disable */
import React from 'react'
import { Button as AntdButton } from 'antd'
import styled, { css } from 'styled-components'
import Flex from '../Flex'
import { THEME } from '../../theme'

const BorderStyle = css`
  /* &:hover {
    border-color: ${THEME.GREY_T_85};
  } */
  &:focus {
    border-color: ${THEME.GREY_T_85};
  }
`
const TextContainer = styled.div`
    /* margin-left: ${props => (props.icon ? '10px' : '')}; */
    display: flex;
    font-size:16px;
`

const TextContentStyle = styled.div`
    /* margin-left: ${props => (props.icon ? '10px' : '')}; */
    display: flex;
    margin: 0 200px;
    @media screen and (max-width:1086px){
    margin: 0 80px;
    }
`
const dangerButtonStyles = css`
    color:#fff;
    background-color: ${THEME.danger_2};
  /* &:hover {
    color:#fff;
    background-color: ${THEME.RED_S_100};
    border-color: ${THEME.RED_S_100};
  } */
  
  &:focus {
    box-shadow:0 0 0 .2rem rgba(220,53,69,.5)
  }
`
const secondaryButtonStyles = css`
  background-color: ${THEME.PRIMARY_PURPLE};
  border-color: ${THEME.PURPLE_T_80};
  color: '#FFFFFF';
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  /* &:hover {
    background-color: ${THEME.PRIMARY_PURPLE};
    border-color: ${THEME.PURPLE_T_80};
  } */
  &:focus {
    background-color: ${THEME.PRIMARY_PURPLE};
    border-color: ${THEME.PURPLE_T_80};
  }
`

const primaryButtonStyles = css`
   color:#fff !important;
    background-color: ${THEME.primary_2}!important;
    border-color:  ${THEME.primary_2} !important;
  /* &:hover {
    color:#fff !important;
    background-color: #28aaeb !important;
    border-color:  #28aaeb !important;
  } */
  &:focus {
    box-shadow:0 0 0 .2rem rgba(0,123,255,.5)
  }
`

const yellowButtonStyles = css`
  color:${THEME.white};
  background-color:${THEME.dark_gold};
  border-color:${THEME.dark_gold};
  box-shadow:${THEME.button_box_shadow};
  font-size:1rem;
  font-weight:600;
  transition:.4s;
  /* &:hover {
    transform:translateY(-5px);
    box-shadow:${THEME.buttonHover_box_shadow};
  } */
  &:focus {
    box-shadow:0 0 0 .2rem (255, 179, 2,.5)
  }
`

const blueButtonStyles = css`
  color:${THEME.white};
  background-color: #3f51b5;
  /* border-color:${THEME.dark_gold}; */
  box-shadow:var(--mdc-protected-button-container-elevation, 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12));
  font-size:1rem;
  font-weight:600;
  transition:.4s;
  /* &:hover {
    transform:translateY(-5px);
    box-shadow:${THEME.buttonHover_box_shadow};
  } */
  &:focus {
    box-shadow:0 0 0 .2rem (255, 179, 2,.5)
  }
`

const pinkButtonStyles = css`
  color:${THEME.white};
  background-color: #ff4081;
  /* border-color:${THEME.dark_gold}; */
  box-shadow:var(--mdc-protected-button-container-elevation, 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12));
  font-size:1rem;
  font-weight:600;
  transition:.4s;
  /* &:hover {
    transform:translateY(-5px);
    box-shadow:${THEME.buttonHover_box_shadow};
  } */
  &:focus {
    box-shadow:0 0 0 .2rem (255, 179, 2,.5)
  }
`

const orangeButtonStyles = css`
  color:${THEME.white};
  background-color: #f44336;
  /* border-color:${THEME.dark_gold}; */
  box-shadow:var(--mdc-protected-button-container-elevation, 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12));
  font-size:1rem;
  font-weight:600;
  transition:.4s;
  /* &:hover {
    transform:translateY(-5px);
    box-shadow:${THEME.buttonHover_box_shadow};
  } */
  &:focus {
    box-shadow:0 0 0 .2rem (255, 179, 2,.5)
  }
`

const greenButtonStyles = css`
  color:${THEME.white};
  background-color: #3df436;
  /* border-color:${THEME.dark_gold}; */
  box-shadow:var(--mdc-protected-button-container-elevation, 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12));
  font-size:1rem;
  font-weight:600;
  transition:.4s;
  /* &:hover {
    transform:translateY(-5px);
    box-shadow:${THEME.buttonHover_box_shadow};
  } */
  &:focus {
    box-shadow:0 0 0 .2rem (255, 179, 2,.5)
  }
`

const successButtonStyles = css`
    color:#fff;
    background-color: ${THEME.GREEN_PRIMARY};
    border-color: ${THEME.GREEN_PRIMARY};
  /* &:hover {
    color:#fff;
    background-color: ${THEME.GREEN_PRIMARY};
    border-color: ${THEME.GREEN_PRIMARY};
  } */
  &:focus {
    box-shadow:0 0 0 .2rem rgba(40,167,69,.5)
  }
`

const defaultButtonStyles = css`
  color: #30475e;
`

const PlainButton = styled(AntdButton)`
  color: ${props => (props.type === 'secondary' ? THEME.PRIMARY : '#FFFFFF')};
  border-width:1px;
  display: flex;
  height: 40px;
  align-items: center;
  justify-content: space-between;
  /* border-radius: 8px; */
  /* box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.25); */
   /* transform: scale(1.5); */
  border-radius: 4px;
  font-size:14px;
  letter-spacing:1px;
  justify-content: center;
  text-transform:capitalize;
  /* font-weight:600; */
  padding: 0px 15px !important;
  margin: 0px 15px 8px 0px !important;
  font-weight:400;
  cursor: ${props => props?.disableCursor && 'not-allowed'};
  pointer-events: ${props => (props?.disable ? 'none' : 'auto')};
  ${props => props.type === 'secondary' && secondaryButtonStyles};
  ${props => props.type === 'danger' && dangerButtonStyles};
  ${props => props.type === 'success' && successButtonStyles};
  ${props => props.type === 'default' && defaultButtonStyles};
  ${props => props.type === 'primary' && primaryButtonStyles};
  ${props => props.type === 'yellow' && yellowButtonStyles};
  ${props => props.type === 'blue' && blueButtonStyles};
  ${props => props.type === 'pink' && pinkButtonStyles};
  ${props => props.type === 'orange' && orangeButtonStyles};
  ${props => props.type === 'green' && greenButtonStyles};
  transition: 0.5s;
  
  /* &:hover {
      transform: scale(1.1); 
  } */
`
const CircleButton = styled(AntdButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  ${BorderStyle}
`

const ButtonStandard = props => <AntdButton {...props} />

const Primary = ({ text, icon, shape, ...props }) => (
  <PlainButton {...props} type="primary">
    <Flex centervertically={"true"}>
      {icon} {shape}
      <TextContainer icon={icon ? "true" : "false"} >{text}</TextContainer>
    </Flex>
  </PlainButton>
)

const Yellow = ({ text, icon, ...props }) => (
  <PlainButton {...props} type="yellow">
    <Flex centervertically={"true"}>
      {icon}
      <TextContainer icon={icon ? "true" : "false"}>{text}</TextContainer>
    </Flex>
  </PlainButton>
)

const Secondary = ({ text, icon, ...props }) => (
  <PlainButton {...props} type="secondary">
    <Flex centervertically={"true"}>
      {icon}
      <TextContainer icon={icon ? "true" : "false"}>{text}</TextContainer>
    </Flex>
  </PlainButton>
)

const Success = ({ text, icon, ...props }) => (
  <PlainButton {...props} type="success">
    <Flex centervertically={"true"}>
      {icon}
      <TextContainer icon={icon ? "true" : "false"}>{text}</TextContainer>
    </Flex>
  </PlainButton>
)

const Danger = ({ text, icon, ...props }) => (
  <PlainButton {...props} type="danger">
    <Flex centervertically={"true"}>
      {icon}
      <TextContainer icon={icon ? "true" : "false"}>{text}</TextContainer>
    </Flex>
  </PlainButton>
)

const Default = ({ icon, text, onClick, ...rest }) => {
  return (
    <PlainButton onClick={onClick} {...rest} type="default">
      {icon}
      <TextContainer icon={icon ? "true" : "false"}>{text}</TextContainer>
    </PlainButton>
  )
}

const Round = ({ icon, text, onClick, ...rest }) => {
  return (
    <PlainButton type="round" onClick={onClick} {...rest}>
      {icon}
      <TextContainer>{text}</TextContainer>
    </PlainButton>
  )
}

const Circle = ({ icon, onClick, ...rest }) => {
  return (
    <CircleButton type="circle" onClick={onClick} {...rest}>
      {icon}
    </CircleButton>
  )
}

const Blue = ({ icon, text, onClick, ...props }) => {
  return (
    <PlainButton {...props} type="blue">
      <Flex centervertically={"true"}>
        {icon}
        <TextContainer icon={icon ? "true" : "false"}>{text}</TextContainer>
      </Flex>
    </PlainButton>
  )
}

const Pink = ({ icon, text, onClick, ...props }) => {
  return (
    <PlainButton {...props} type="pink">
      <Flex centervertically={"true"}>
        {icon}
        <TextContainer icon={icon ? "true" : "false"}>{text}</TextContainer>
      </Flex>
    </PlainButton>
  )
}

const Orange = ({ icon, text, onClick, ...props }) => {
  return (
    <PlainButton {...props} type="orange">
      <Flex centervertically={"true"}>
        {icon}
        <TextContainer icon={icon ? "true" : "false"}>{text}</TextContainer>
      </Flex>
    </PlainButton>
  )
}

const Green = ({ icon, text, onClick, ...props }) => {
  return (
    <PlainButton {...props} type="green">
      <Flex centervertically={"true"}>
        {icon}
        <TextContainer icon={icon ? "true" : "false"}>{text}</TextContainer>
      </Flex>
    </PlainButton>
  )
}

const BlueLogin = ({ icon, text, onClick, ...props }) => {
  return (
    <PlainButton {...props} type="blue">
      <Flex centervertically={"true"}>
        {icon}
        <TextContentStyle icon={icon ? "true" : "false"}>{text}</TextContentStyle>
      </Flex>
    </PlainButton>
  )
}

ButtonStandard.Primary = Primary
ButtonStandard.Secondary = Secondary
ButtonStandard.Success = Success
ButtonStandard.Danger = Danger
ButtonStandard.Default = Default
ButtonStandard.Round = Round
ButtonStandard.Circle = Circle
ButtonStandard.Yellow = Yellow
ButtonStandard.Blue = Blue
ButtonStandard.Pink = Pink
ButtonStandard.Orange = Orange
ButtonStandard.Green = Green
ButtonStandard.BlueLogin = BlueLogin


export default ButtonStandard
