import { colors } from '../../colors'
import { inheritFrom } from '../../../utils'
import { containedStyles } from './contained'
import { get } from 'jsutils'

const defWhite = get(colors, 'palette.white01')

const outlineStyles = {
  default: {
    main: {
      $all: {
        borderColor: get(colors, 'opacity._20'),
        borderWidth: 1,
        padding: 8,
        backgroundColor: defWhite,
        outline: 'none',
      },
      $web: {

      },
      $native: {
      }
    },
    content: {
      $all: {
        color: get(colors, [ 'opacity', '_80' ]),
      },
      $web: {
        
      },
      $native: {
        
      }
    }
  },
  disabled: {
    main: {
      $all: {
        
      },
      $web: {

      },
      $native: {
      }
    },
    content: {
      $all: {
        color: get(colors, 'opacity._50'),
      },
      $web: {
        
      },
      $native: {
        
      }
    }
  },
  hover: {
    main: {
      $all: {
        backgroundColor: get(colors, 'opacity._10'),
      },
      $web: {
        
      },
      $native: {
        
      }
    },
    content: {
      $all: {

      },
      $web: {
        
      },
      $native: {
        
      }
    }
  },
  active: {
    main: {
      $all: {
        
      },
      $web: {
        
      },
      $native: {
        
      }
    },
    content: {
      $all: {

      },
      $web: {
        
      },
      $native: {
        
      }
    }
  }
}

const outline = {}
outline.default = inheritFrom(containedStyles.default, outlineStyles.default)
outline.disabled = inheritFrom(outline.default, containedStyles.disabled, outlineStyles.disabled)
outline.hover = inheritFrom(outline.default, containedStyles.hover, outlineStyles.hover)
outline.active = inheritFrom(outline.hover, outlineStyles.active)

export {
  outline,
  outlineStyles
}