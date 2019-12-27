import React from 'react'
import { storiesOf } from '@storybook/react'
import { H1, H2 } from '../../'


storiesOf('H1', module)
  .add('Default', () =>
    <H1>
      Keg H1
    </H1>
  )

storiesOf('H2', module)
  .add('Default', () =>
    <H2>
      Keg H2
    </H2>
  )