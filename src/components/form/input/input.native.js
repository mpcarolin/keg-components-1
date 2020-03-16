import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { TextInput } from 'react-native'
import { InputWrapper } from './input.wrapper'
import { withTouch } from '../../../hocs'

const NativeInput = forwardRef(({ elProps, ...args }, ref) => {
  return (
    <TextInput
      { ...args }
      { ...elProps }
      ref={ref}
    />
  )
})

/**
 * React native's TextInput does not accept onPress, so this fixes that
 */
const TouchableNativeInput = withTouch(NativeInput, { showFeedback: false })

export const Input = forwardRef((props, ref) => {
  return (
    <InputWrapper 
      Element={ TouchableNativeInput }
      elType={'native'}
      ref={ref}
      { ...props }
    />
  )
})

Input.propTypes = {
  ...InputWrapper.propTypes,
  theme: PropTypes.object,
  style: PropTypes.object,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
  onPress: PropTypes.func,
  onChange: PropTypes.func,
}
