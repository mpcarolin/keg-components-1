import { colors } from '../colors'
import { padding } from '../padding'
import { margin } from '../margin'

export const section = {
  default: {
    $native: {
      shadowColor: colors.opacity.opacity05,
      shadowOffset: { height: 0, width: 0 },
      shadowOpacity: 1,
      shadowRadius: 1,
      elevation: 1,
    },
    $web: {
      boxShadow: `1px 1px 5px ${ colors.opacity.opacity05 }`
    },
    $all: {
      backgroundColor: colors.palette.white01,
      borderColor: colors.palette.gray01,
      borderStyle: 'solid',
      borderWidth: 1,
      padding: padding.size,
      margin: margin.size,
      marginBottom: 0,
      minHeight: 200
    },
  }
}