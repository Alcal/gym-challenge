// test-utils.jsx
import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider as StateProvider } from 'react-redux'
import { ThemeProvider } from '@mui/material'
import workoutReducer from '../state/reducers/workouts'
import theme from '../theme'

function render(ui,
  {
    preloadedState,
    store = configureStore({ reducer: { workouts: workoutReducer }, preloadedState }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return (
      <ThemeProvider theme={theme}>
        <StateProvider store={store}>
          {children}
        </StateProvider>
      </ThemeProvider>
    )
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

// re-export everything
export * from '@testing-library/react'
// override render method
export { render }