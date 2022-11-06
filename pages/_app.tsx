import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React, { useReducer, Dispatch, createContext, useEffect, useState } from 'react'
import initialState from '../store/initialState/initialState'
import { ActionReducer, InitialState } from '../interfaces/interface/interface.initialState'
import reducer from '../store/reducers'
import { ActionCreator } from '../interfaces/types/action.creator'
import actionCreator from '../store/actions'

export const StoreContext = createContext<{
  stateContext: InitialState;
  dispatch: Dispatch<ActionReducer>;
  actions: ActionCreator;
}>({ stateContext: initialState, dispatch: () => null, actions: actionCreator });

function MyApp({ Component, pageProps }: AppProps) {
  const [stateContext, dispatch] = useReducer(reducer, initialState)
  const [enhancedActions, setEnhancedActions] = useState<ActionCreator>(actionCreator);
  
  useEffect(() => {
    // used for interceptor dispatch
    Object.keys(actionCreator).forEach((key: string) => {
      setEnhancedActions((e) => ({
        ...e,
        [key]: (...args:any) => {
          actionCreator[key as keyof typeof actionCreator].apply(null, args)(dispatch) } 
        }))
    });
  }, []);

  return (
    <StoreContext.Provider value={{ stateContext, dispatch, actions: enhancedActions }}>
      <Component {...pageProps} />
    </StoreContext.Provider>
  )
}

export default MyApp
