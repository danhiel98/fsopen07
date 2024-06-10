import { createContext, useContext, useReducer } from 'react'

const initialState = {
  notification: null,
  user: null
}

/* eslint-disable indent */
const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return {
        ...state,
        notification: action.payload
      }
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notification: null
      }
    case 'SET_USER':
      return {
        ...state,
        user: action.payload
      }
    case 'UNSET_USER':
      return {
        ...state,
        user: null
      }
    default:
      return state
  }
}

const StateContext = createContext()

export const useStateDispatch = () => {
  const stateAndDispatch = useContext(StateContext)
  return stateAndDispatch[1]
}

export const StateContextProvider = (props) => {
  const [state, stateDispatch] = useReducer(reducer, initialState)

  return (
    <StateContext.Provider value={[state, stateDispatch]}>
      {props.children}
    </StateContext.Provider>
  )
}

export default StateContext