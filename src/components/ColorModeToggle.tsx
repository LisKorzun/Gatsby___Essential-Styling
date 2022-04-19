import React from 'react'

import { useColorModeContext } from '../store'

const ColorModeToggle = () => {
  const { mode, setMode } = useColorModeContext()
  console.log(mode)

  if (!mode) {
    return null
  }

  return (
    <label>
      {mode === 'dark' ? '🌙' : '🌞'}
      <input
        type="checkbox"
        checked={mode === 'dark'}
        onChange={(e) => {
          setMode(e.target.checked ? 'dark' : 'light')
        }}
      />
    </label>
  )
}

export default ColorModeToggle
