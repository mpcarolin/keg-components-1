import { colors } from './colors'
import { components } from './components'
import { display } from './display'
import { flex } from './flex'
import { form } from './form'
import { helpers } from './helpers'
import { layout } from './layout'
import { margin } from './margin'
import { padding } from './padding'
import { transform } from './transform'
import { transition } from './transition'
import { typography } from './typography'

export const theme = {
  colors,
  display,
  flex,
  form,
  helpers,
  layout,
  margin,
  padding,
  transform,
  transition,
  typography,
  ...components,
}
