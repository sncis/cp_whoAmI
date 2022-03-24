import "../style.css"
import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import P5Wrapper  from './P5Wrapper'
import { useDataStateCtx,useDataDispatchCtx } from '../store/dataContext'
import { sketch } from '../p5/sketch'
// import { sketch } from '../p5/sketchTest'

const CanvasComp = () => {
	const state = useDataStateCtx()
	const dispatch = useDataDispatchCtx()
  const navigate = useNavigate();

	useEffect(() => {
		if((!state.loading && !state.displayInfos) || state.error){
			navigate('/')
		}
	},[navigate, state.loading, state.displayInfos, state.error])
	
	return(
		<div > 
			{state.displayInfos && <P5Wrapper sketch={sketch} dispatch={dispatch} state={state} />}		
		</div>
	)
}

export default CanvasComp