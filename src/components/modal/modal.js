import React, { useEffect, useState, useCallback } from 'react'
import { TouchableOpacity, Animated } from 'react-native'
import PropTypes from 'prop-types'
import { useThemePath, useFromToAnimation } from 'KegHooks'
import { View } from 'KegView'
import { noOp } from 'KegUtils'
import { Dimensions } from 'react-native'
import { isFunc } from '@svkeg/jsutils'

/**
 * Default Slide animated View for modal
 * @param {Object} props
 * @param {Object=} props.defaultStyle - default style coming from theme
 * @param {Boolean} props.visible - if true, show the modal, else hide it
 * @param {Component} props.children - the component(s) to render inside the modal
 * @param {Function=} props.onAnimationFinish - the function to execute when the an animation is complete
 */
const SlideAnimatedView = ({
  defaultStyle,
  visible,
  children,
  onAnimationFinish,
}) => {
  // setup anim value to start/end offscreen
  const windowHeight = Dimensions.get('window').height
  const bottomOfScreen = windowHeight
  const origin = 0

  const [slide] = useFromToAnimation(
    {
      from: visible ? bottomOfScreen : origin,
      to: visible ? origin : bottomOfScreen,
      onFinish: onAnimationFinish,
    },
    [visible]
  )

  return (
    <Animated.View
      dataSet={Modal.dataSet.content}
      style={{ ...defaultStyle, transform: [{ translateY: slide }] }}
    >
      { children }
    </Animated.View>
  )
}

const hideModalStyle = { height: 0, width: 0, overflow: 'hidden' }

/**
 * Simple popup modal using fixed positioning.
 * @param {Object} props
 * @param {Boolean} props.visible - if true, show the modal, else hide it
 * @param {Object=} props.styles - styles object which overrides default theme styles
 * @param {Function=} props.onBackdropTouch - the function to execute when the user selects/touches outside the modal; defaults to noOp
 * @param {Function=} props.onAnimateIn - the function to execute when animation on visible is done
 * @param {Function=} props.onAnimateOut - the function to execute when animation on not visible is done
 * @param {Component} props.children - the component(s) to render inside the modal
 * @param {String=} props.themePath
 * @param {String=} props.type - type of modal (points to styles in theme file with that type); default is 'default'
 * @param {Number=} props.activeOpacity - changes opacity of background when touched/clicked; default is 1
 * @param {Component=} props.AnimatedComponent - Custom animated component if you want to override our default animations
 */
export const Modal = props => {
  const {
    styles,
    onBackdropTouch = noOp,
    themePath,
    type = 'default',
    activeOpacity = 1,
    visible,
    AnimatedComponent = SlideAnimatedView,
    onAnimateIn,
    onAnimateOut,
    children,
  } = props

  const [ renderModal, setRenderModal ] = useState(false)
  if (props.visible && !renderModal) setRenderModal(true)
  const [modalStyles] = useThemePath(themePath || `modal.${type}`, styles)

  useEffect(() => {
    if (global.document && visible) {
      // lock scrolling on web if a modal exists
      global.document.body.style.overflow = 'hidden'
      // enable scrolling when unmounted
      return () => {
        global.document.body.style.overflow = ''
      }
    }
  }, [visible])

  // animation callback
  // we change the wrapper dimensions to 0 AFTER animationOut finishes
  const cb = useCallback(() => {
    if (!visible) {
      setRenderModal(false)
      if (isFunc(onAnimateOut)) onAnimateOut()
    }
    else if (isFunc(onAnimateIn)) onAnimateIn()
  }, [ onAnimateOut, onAnimateIn ])

  return (
    // change the wrapper dimensions to 0 when visible is set to false
    <View
      dataSet={Modal.dataSet.main}
      style={renderModal ? modalStyles.main : hideModalStyle}
    >
      <TouchableOpacity
        dataSet={Modal.dataSet.backdrop}
        style={modalStyles.backdrop}
        onPress={onBackdropTouch}
        activeOpacity={activeOpacity}
      />
      <AnimatedComponent
        onAnimationFinish={cb}
        visible={visible}
        defaultStyle={modalStyles.content}
      >
        { children }
      </AnimatedComponent>
    </View>
  )
}

Modal.dataSet = {
  main: { class: 'modal-main' },
  backdrop: { class: 'modal-backdrop' },
  content: { class: 'modal-content' },
}

Modal.propTypes = {
  themePath: PropTypes.string,
  type: PropTypes.string,
  visible: PropTypes.bool,
  styles: PropTypes.object,
  activeOpacity: PropTypes.number,
  onBackdropTouch: PropTypes.func,
  onAnimateIn: PropTypes.func,
  onAnimateOut: PropTypes.func,
  AnimatedComponent: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.elementType,
  ]),
}
