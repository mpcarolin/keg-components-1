import { useEffect, useState } from 'react'
import { Animated } from 'react-native'
import { noOp } from 'KegUtils'

/**
 * A hook for acquiring animated values from a origin (from) point to a destination (to) point. Uses the "current" value to
 * determine if the animation needs to reverse direction.
 * @param {Object} params - options object
 * @param {number} params.from - start value
 * @param {number} params.to - end value
 * @param {number} params.current - point that animated component is currently in (either 'from' or 'to'). This will be the initial return value. When this value changes, the animation activates.
 * @param {Number} params.duration - time in milliseconds that the animation should proceed
 * @param {Boolean} params.animateOnFirstRender - if false, won't animate the from-to value on first render. It will merely return the currentState animated value. If true, animates on first render.
 * @param {Function} params.cb - passed to Animated.start(), called when the animation (in one direction) is complete
 * @returns {Array} tuple of form [ Animated.Value, nextState, nextValue ]
 *  - Animated.Value: pass this value to your Animated.View to begin the animation
 *  - nextState: the state we are animating *to* (either string 'from' or string 'to', since the animation toggles back and forth)
 *  - nextValue: the value we are animating to (value of either `from` or `to` args, as passed into the effect)
 */
export const useFromToAnimation = params => {
  const {
    forward = true,
    from,
    to,
    current,
    duration = 500,
    animateOnFirstRender = false,
    cb = noOp,
  } = params || {}

  // is the current state of the animated component equal to the origin ("from") value?
  // const currentStateIsOrigin = current === from

  const fromVal = new Animated.Value(from)
  const destinationVal = new Animated.Value(to)

  const animatedStartValue = forward ? fromVal : destinationVal

  // if animateOnFirstRender is false, we don't want to animate when the component
  // initially loads, only when the currentStateIsOrigin variable changes
  const [ isFirstRender, setIsFirstRender ] = useState(true)

  const toValue = forward ? to : from
  console.log({
    animateOnFirstRender,
    current,
    fromValue: animatedStartValue._value,
    toValue,
  })
  useEffect(() => {
    if (!animateOnFirstRender && isFirstRender) {
      console.log('skip initial anim')
      setIsFirstRender(false)
      return
    }
    console.log('wow')
    // console.log({currentStateIsOrigin})
    Animated.timing(animatedStartValue, { toValue, duration }).start(cb)
  }, [forward])
  return [
    !animateOnFirstRender && isFirstRender
      ? animatedStartValue
      : destinationVal,
    toValue === from ? 'from' : 'to',
    toValue,
  ]
}
