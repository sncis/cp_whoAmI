import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { p5Wrapper } from './P5Wrapper'
import { useDataStateCtx,useDataDispatchCtx } from '../store/dataContext'
import { sketch } from '../p5/sketch'


const P5Wrapper = p5Wrapper()

const CanvasComp = () => {
	const state = useDataStateCtx()
	const dispatch = useDataDispatchCtx()
	const navigate = useNavigate()


	useEffect(() => {
		console.log("***** DISPLAY INFOS *******")
		console.log(state.displayInfos)
	},[state])

	useEffect(() => {
		if((!state.loading && !state.displayInfos) || state.error){
			navigate('/')
		}
	},[navigate, state])
	
	return(
		<div> 
			<p>canvas</p>
			{state.displayInfos && <P5Wrapper sketch={sketch} dispatch={dispatch} state={state} />}		
		</div>
	)
}

export default CanvasComp