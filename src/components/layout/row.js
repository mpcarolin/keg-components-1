import React from 'react'
import { useTheme } from '@svkeg/re-theme'
import { get } from '@svkeg/jsutils'
import { Container } from './container'
import PropTypes from 'prop-types'

export const Row = ({ children, style, ...props }) => {
  const theme = useTheme()

  return (
    <Container
      {...props}
      style={{ ...get(theme, 'layout.grid.row'), ...style }}
      flexDir='row'
    >
      { children }
    </Container>
  )
}

Row.propTypes = {
  center: PropTypes.string,
  theme: PropTypes.object,
  style: PropTypes.object,
}
