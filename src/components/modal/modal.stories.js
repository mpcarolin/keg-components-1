import React, { useEffect, useState } from 'react'
import { storiesOf } from '@storybook/react'
import { Button, Section, H6, Divider, P, View } from '../../'
import { Modal } from './modal'
import { StoryWrap } from 'StoryWrap'
import { action } from '@storybook/addon-actions'
import { Animated } from 'react-native'
import { button, withKnobs } from '@storybook/addon-knobs'

const DemoContent = () => {
  return (
    <View>
      <Section>
        <H6>This is a Section!</H6>

        <P style={{ paddingTop: 30 }}>
          This is some text content that is displayed inside of the section.
        </P>
      </Section>
      <Section>
        <H6>This is a Section!</H6>
        <Divider />
        <P style={{ paddingTop: 30 }}>
          This is some text content that is displayed inside of the section.
        </P>
      </Section>
      <Section>
        <H6>This is a Section!</H6>
        <Divider />
        <P style={{ paddingTop: 30 }}>
          This is some text content that is displayed inside of the section.
        </P>
      </Section>
      <Section>
        <H6>This is a Section!</H6>
        <Divider />
        <P style={{ paddingTop: 30 }}>
          This is some text content that is displayed inside of the section.
        </P>
      </Section>
    </View>
  )
}
const storyStyles = { textAlign: 'center' }
const buttonStyle = { width: 125, marginRight: 10, alignSelf: 'center' }
const modalOverrideStyle = {
  content: {
    backgroundColor: 'yellow',
    width: '400px',
    borderRadius: 40,
    height: 200,
    justifyContent: 'center',
  },
  backdrop: { backgroundColor: 'rgba(1,1,1,0.5)' },
}

const modal2Style = {
  content: {
    width: '400px',
    height: 200,
    justifyContent: 'center',
  },
}

const CustomComponent = ({ children }) => {
  const [ animated, setAnimated ] = useState(false)
  let slideVal = new Animated.Value(0)

  useEffect(() => {
    Animated.timing(slideVal, {
      toValue: 1,
      duration: 1000,
    }).start(() => setAnimated(true))
  }, [])

  const rotate = slideVal.interpolate({
    inputRange: [ 0, 1 ],
    outputRange: [ '0deg', '360deg' ],
  })

  return (
    <Animated.View
      style={{
        backgroundColor: 'white',
        zIndex: 999999,
        width: 600,
        height: 500,
        transform: animated ? null : [{ rotateZ: rotate }],
        justifyContent: 'center',
      }}
    >
      { children }
    </Animated.View>
  )
}

let isVisible1 = false
let isVisible2 = false
let example2Visible = true
storiesOf('Display | Modal', module)
  .addDecorator(withKnobs)
  .add('One at a time', () => {
    // allow only 1 modal on the screen at a time
    const toggleModal = index => {
      switch (index) {
      case 1:
        isVisible1 = !isVisible1
        if (isVisible2 && isVisible1) isVisible2 = false
        return
      case 2:
        isVisible2 = !isVisible2
        if (isVisible2 && isVisible1) isVisible1 = false
        return
      }
    }
    button('toggle modal 1', () => {
      toggleModal(1)
    })
    button('toggle modal 2', () => {
      toggleModal(2)
    })

    return (
      <StoryWrap style={storyStyles}>
        <DemoContent />
        <Modal
          visible={isVisible1}
          onBackdropTouch={action('Touched outside of modal 1')}
        >
          <P>
            Body of the default Modal. This is just some demo text as an
            example.
          </P>
          <Button
            themePath='button.contained.primary'
            styles={{ main: buttonStyle }}
            onClick={action('Button Clicked!')}
            content={'Primary'}
          />
          <Button
            themePath='button.contained.primary'
            styles={{ main: buttonStyle }}
            onClick={action('Button Clicked!')}
            content={'Primary'}
          />
        </Modal>
        <Modal
          visible={isVisible2}
          onBackdropTouch={action('Touched outside of modal 2')}
          styles={modal2Style}
        >
          <P>MODAL 2</P>
          <Button
            themePath='button.contained.primary'
            styles={{ main: buttonStyle }}
            onClick={action('Button Clicked!')}
            content={'Primary'}
          />
        </Modal>
      </StoryWrap>
    )
  })
  .add('Style Override', () => {
    button('toggle modal 1', () => {
      example2Visible = !example2Visible
    })
    return (
      <StoryWrap style={storyStyles}>
        <DemoContent />
        <Modal
          styles={modalOverrideStyle}
          visible={example2Visible}
          onBackdropTouch={action('Touched outside of modal')}
        >
          <P>
            Body of the default Modal. This is just some demo text as an
            example.
          </P>
          <Button
            themePath='button.contained.primary'
            styles={{ main: buttonStyle }}
            onClick={action('Button Clicked!')}
            content={'Primary'}
          />
        </Modal>
      </StoryWrap>
    )
  })
  .add('Custom Animation', () => (
    <StoryWrap style={storyStyles}>
      <DemoContent />
      <Modal
        visible={true}
        onBackdropTouch={action('Touched outside of modal')}
        ModalContainer={CustomComponent}
      >
        <P>This has a custom animation!</P>
      </Modal>
    </StoryWrap>
  ))
