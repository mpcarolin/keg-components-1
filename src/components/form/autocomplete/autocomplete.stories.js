/* eslint-disable import/first */

import React, { useState, useEffect } from 'react'
import { storiesOf } from '@storybook/react'
import { Autocomplete } from './autocomplete'
import { Loading } from 'KegLoading'
import { StoryWrap } from 'StoryWrap'
import { P } from 'KegTypography'
import { action } from '@storybook/addon-actions'

const goats = [
  'Boer', 'Saanen', 'American Pygmy',
  'Anglo-Nubian', 'Nigerian Dwarf', 'Jamnapari',
  'Alpine', 'Angora', 'Kamori', 'Beetal',
  'Barbari', 'Kiko', 'American Lamancha', 'Kalahari Red',
  'Valais Blackneck', 'Russian white', 'Toggenburg', 'Oberhasli',
]

storiesOf('Form | Autocomplete', module)
  .add('Default', () => {
    const [ selection, setSelection ] = useState('')
    return (
      <StoryWrap>
        <Autocomplete
          inputStyle={{padding: 5}}
          onSelect={selection => action(selection)() || setSelection(selection)}
          placeholder='Type here...'
          values={goats}
          menuHeight={200}
        />
        <P style={{fontSize: 12, margin: 15}}>Current goat: {selection || 'Start typing to select a goat'}</P>
      </StoryWrap>
    )
  })
  // makes use of the onchange callback to make an async call for autocomplete items
  .add('Async', () => {
    const [ selection, setSelection ] = useState('')

    const [ currentGoats, setGoats ] = useState([])

    const [ showLoader, setShowLoader ] = useState(false)

    useEffect(() => {
      if (!showLoader) return
      const getValues = async () => {
        return new Promise((res, rej) => {
          setTimeout(() => {
            res(goats)
            setShowLoader(false)
          }, 1000)
        })
      }

      const fetch = async () => {
        const nextGoats = await getValues()
        setGoats(nextGoats)
      }

      fetch()
    }, [ showLoader ])

    const onChange = () => {
      if (!showLoader && !currentGoats.length) {
        setShowLoader(true)
      }
    }

    return (
      <StoryWrap>
        <Autocomplete
          inputStyle={{padding: 5}}
          onSelect={selection => action(selection)() || setSelection(selection)}
          onChange={onChange}
          placeholder='Type here...'
          values={currentGoats}
          menuHeight={200}
        />
        { showLoader && <Loading text={'Loading'} /> }
        <P style={{fontSize: 12, margin: 15}}>Current goat: {selection || 'Start typing to select a goat'}</P>
      </StoryWrap>
    )
  })