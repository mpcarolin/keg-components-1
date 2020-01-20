import React from 'react'
import { useTheme } from 'KegReTheme'
import PropTypes from 'prop-types'

const buildStyles = (styleId, theme, type, elType) => {
  styleId = styleId || `keg-${elType}-button`

  const form = theme.get(
    `${styleId}-${type || 'default'}`,
    'form.form.default',
    type && `form.form.${type}`
  )

  return { form }

}

export const FormWrapper = React.forwardRef((props, ref) => {
  const theme = useTheme()
  
  const {
    children,
    Element,
    elType,
    isWeb,
    style,
    styleId,
    type,
    ...elProps
  } = props

  const builtStyles = buildStyles(styleId, theme, type, elType)


  return (
    <Element
      elProps={ elProps }
      ref={ ref }
      style={ theme.join(builtStyles.form, style) }
      children={ children }
    />
  )

})

FormWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.array
  ]),
  ref: PropTypes.object,
  style: PropTypes.object,
  type: PropTypes.string,
}
