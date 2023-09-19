import React from 'react'
import { StyledButton } from './Button.Styled'
import svg from '../../icons8-search.svg'

const Button = () => {
  return (
    <StyledButton type="submit" className="button">
    <img src={svg} alt="search" width="28" height="28"/>
  </StyledButton>
  )
}

export default Button
