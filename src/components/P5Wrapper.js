import React, { useRef, useLayoutEffect,memo} from 'react'
import p5 from "p5"

export const p5Wrapper = () => {
	let canvas= null

	const P5Wrapper =({sketch=()=>{}, dispatch = () =>{}, state= {}}) => {
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
			<div ref={wrapper} style={{border:'1px solid red'}}>	
			</div>
		)
	}

	return memo(P5Wrapper, (_,nextProps) => {
		canvas.state ={...nextProps.state}
		return true
	})
}
