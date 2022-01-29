import React, { createContext, useReducer, useContext } from 'react'
import { dataReducer } from './dataReducer'

export const DataDispatchCtx = createContext(() =>{})
export const DataStateCtx = createContext({})

export const DataStateProvider = ({children}) => {
	const [state,dispatch] = useReducer(dataReducer, {})

	return(
		<DataDispatchCtx.Provider value={dispatch}>
			<DataStateCtx.Provider value ={state}>
				{children}
			</DataStateCtx.Provider>
		</DataDispatchCtx.Provider>
	)
}

export const useDataDispatchCtx = () => {
	const ctx = useContext(DataDispatchCtx)
	if(ctx === undefined){
		throw new Error("Data dispatch context must be used inside a Provider")
	}
	return ctx
}

export const useDataStateCtx = () => {
	const ctx = useContext(DataStateCtx)
	if(ctx === undefined){
		throw new Error("Data state context must be used inside a Provider")
	}
	return ctx
}
