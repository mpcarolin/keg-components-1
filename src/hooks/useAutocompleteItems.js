import { isEmpty } from 'jsutils'
import { useState, useEffect } from 'react'
import { getFilteredStrings } from 'KegHelpers'

/**
 * Custom hook for acquiring menu items that are filtered based on text.
 * @param {String} text 
 * @param {Array} menuItems - all menu items
 */
export const useAutocompleteItems = ( text, menuItems ) => {
  const [ autocompleteItems, setAutocompleteMenuItems ] = useState([])
  const [ selectedItem, setSelectedItem ] = useState(null)

  // when text changes, update the autocomplete fields
  useEffect(() => {
    // hide the auto complete menu when text is empty or if user selected an item. Otherwise, update menu
    isEmpty(text) || (selectedItem === text)
      ? setAutocompleteMenuItems([]) 
      : setAutocompleteMenuItems(getAutocompleteItems(text, menuItems))
  }, [ text, menuItems, selectedItem ])

  return [ autocompleteItems, setSelectedItem, selectedItem ]
}

/**
 * 
 * @param {*} text 
 * @param {*} menuItems 
 */
const getAutocompleteItems = (text, menuItems) => getFilteredStrings(text, menuItems).map(text => ({ text }))
