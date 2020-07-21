import React, { useEffect, useState } from 'react'
import { TouchableOpacity, Animated } from 'react-native'
import PropTypes from 'prop-types'
import { useThemeWithHeight, useFromToAnimation } from 'KegHooks'
import { View } from 'KegView'
import { noOp } from 'KegUtils'
import { Dimensions } from 'react-native'
import { isValidComponent } from 'KegUtils'
/**
 * Modal wrapper to allow caller to pass in custom animation and styles
 * @param {object} props
 * @param {Component} props.ModalContainer custom component with its own animation and styles
 * @param {Object} props.modalStyles default modal styles used if no ModalContainer is passed in
 * @param {Component} props.children children components
 * @param {Boolean} props.visible - if true, show the modal, else hide it
 * @param {Function} props.onAnimationFinish - cb function to execute after animation completes
 */
const DefaultAnimationView = ({
  ModalContainer,
  modalStyles,
  children,
  visible,
  onAnimationFinish,
}) => {
  if (isValidComponent(ModalContainer))
    return <ModalContainer>{ children }</ModalContainer>

  // setup anim value to start/end offscreen
  const windowHeight = Dimensions.get('window').height
  const animationOffset = windowHeight / 2
  const bottomOfScreen = windowHeight + animationOffset
  const origin = 0
  // const current = visible ? 0 : bottomOfScreen
  // todo: redo with raw animation
  const [slideUp] = useFromToAnimation({
    forward: visible,
    from: bottomOfScreen,
    to: origin,
    cb: onAnimationFinish,
    animateOnFirstRender: false,
  })

  return (
    <Animated.View
      style={{
        ...modalStyles.content,
        transform: [{ translateY: slideUp }],
      }}
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
 * @param {Object} props.styles - styles object which overrides default theme styles
 * @param {Function} props.onBackdropTouch - the function to execute when the user selects/touches outside the modal; defaults to noOp
 * @param {Component} props.children - the component(s) to render inside the modal
 * @param {String} props.themePath - path to a theme file containing the following properties:
 *  - main: styles for the modal
 *  - backdrop: styles for the background behind the modal
 * @param {String} props.type - type of modal (points to styles in theme file with that type); default is 'default'
 * @param {Number} props.activeOpacity - changes opacity of background when touched/clicked; default is 1
 * @param {Component} props.ModalContainer - pass a custom component to completely override the modal content
 */
export const Modal = props => {
  const {
    styles,
    onBackdropTouch = noOp,
    themePath,
    type = 'default',
    activeOpacity = 1,
    visible,
  } = props

  const [ renderModal, setRenderModal ] = useState(false)
  if (props.visible && !renderModal) setRenderModal(true)

  const [modalStyles] = useThemeWithHeight(
    themePath || `modal.${type}`,
    styles,
    'main'
  )

  useEffect(() => {
    if (document && visible)
      // lock scrolling on web if a modal exists
      document.body.style.overflow = 'hidden'
    // enable scrolling when unmounted
    return () => {
      document.body.style.overflow = ''
    }
  }, [visible])

  // animation callback
  // we change the wrapper dimensions to 0 AFTER animationOut finishes
  const cb = () => {
    console.log('callback')
    if (!visible) setRenderModal(false)
  }

  return (
    // change the wrapper dimensions to 0 when visible is set to false
    <View
      data-class='modal-main'
      style={renderModal ? modalStyles.main : hideModalStyle}
    >
      <TouchableOpacity
        data-class='modal-backdrop'
        style={modalStyles.backdrop}
        onPress={onBackdropTouch}
        activeOpacity={activeOpacity}
      />
      <DefaultAnimationView
        data-class='modal-content'
        modalStyles={modalStyles}
        onAnimationFinish={cb}
        {...props}
      />
    </View>
  )
}

Modal.propTypes = {
  visible: PropTypes.bool,
  styles: PropTypes.object,
  onBackdropTouch: PropTypes.func,
  ModalContainer: PropTypes.oneOfType([ PropTypes.func, PropTypes.elementType ]),
}
