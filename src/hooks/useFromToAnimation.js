import { useEffect, useState } from 'react'
import { Animated } from 'react-native'

/**
 * Provides an animation value ranging `from` to `to`, for react-native(-web) animations
 * @param {Object} options - options object
 * @param {*} options.from - start point
 * @param {*} options.to - end point
 * @param {*} options.current - point that animated component is currently in (either `from` value or `to`).
 * @param {Number} options.duration - time in milliseconds that the animation should take to complete
 * @param {Boolean} options.animateOnFirstRender - if false, won't animate the from-to value on first render. 
 *  It will merely return the options.current value. Defaults to false.
 * @returns tuple of form [ Animated.Value, nextState, nextValue ]
 *  - Animated.Value: pass this value to your Animated.View to begin the animation
 *  - nextState: the state we are animating *to* (either string 'from' or string 'to', since the animation toggles back and forth)
 *  - nextValue: the value we are animating to (value of either `from` or `to` args, as passed into the effect)
 */
export const useFromToAnimation = ({ from, to, current, duration=500, animateOnFirstRender=false }={}) => {
  const currentStateIsClosed = current === from 
  const open = new Animated.Value(to)
  const closed = new Animated.Value(from)
  const [ animationValue ] = useState(currentStateIsClosed ? open : closed)

  // if animateOnFirstRender is false, we don't want to animate when the component
  // initially loads, only when the currentStateIsClosed variable changes
  const [ isFirstRender, setIsFirstRender ] = useState(true)

  const toValue = currentStateIsClosed ? to : from

  useEffect(() => {
      if (!animateOnFirstRender && isFirstRender) {
        setIsFirstRender(false)
        return
      }
      
      Animated
        .timing(animationValue, { toValue, duration })
        .start()

  }, [ current ])

  return [ 
    animationValue, 
    (toValue === from) ? 'from' : 'to',
    toValue
  ]
}