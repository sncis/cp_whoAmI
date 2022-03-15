import React, { useRef, useLayoutEffect} from 'react'
import p5 from "p5"


const P5Wrapper =({sketch=()=> {}, dispatch = () => {}, state= {}}) => {
	let canvas= null

	const wrapper = useRef()

	useLayoutEffect(() => {
		console.log('p5 wrapper inistialised')
		
		canvas = new p5(sketch,wrapper.current)
		canvas.state = state
		canvas.dispatch = dispatch


		return () => {
			console.log("p5 wrapper removed")
			canvas.remove()
		}
	}, [state,dispatch,sketch])

	return(
		<div ref={wrapper} className='canvasContainer'>	
		</div>
	)
}


export default React.memo(P5Wrapper)
