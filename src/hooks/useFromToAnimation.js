import { useEffect, useMemo } from 'react'
import { Animated } from 'react-native'
import { noOp } from 'KegUtils'

/**
 * A hook for running an animation from an origin (from) point to a destination (to) point
 * @param {Object} params - options object
 * @param {boolean} params.animate - an optional override you can use to enable/disable animations
 * @param {number} params.from - the starting value of the animation
 * @param {number} params.to - the ending destination value of the animation
 * @param {Number} params.duration - time in milliseconds that the animation should proceed
 * @param {Function} params.onFinish - passed to Animated.start(), called when the animation finishes
 * @returns {Array} [ Animated.Value ]
 *  - Animated.Value: pass this value to your Animated.View to begin the animation
 */
export const useFromToAnimation = params => {
  const { animate = true, from, to, duration = 500, onFinish = noOp } =
    params || {}

  const fromVal = useMemo(() => new Animated.Value(from), [from])

  useEffect(() => {
    if (!animate) return
    Animated.timing(fromVal, { toValue: to, duration }).start(onFinish)
  }, [ fromVal, to, onFinish, animate ])

  return [fromVal]
}
