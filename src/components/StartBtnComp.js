import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDataStateCtx, useDataDispatchCtx } from '../store/dataContext'
import { usePointerEffect } from '../effects/pointerEffect'
import { SET_POINTER,  SET_TIMETOCLICKBUTTON } from '../store/constants'

const StartBtnComp = ({}) => {

	const {loading} = useDataStateCtx()
	const navigate = useNavigate()
	const dispatch = useDataDispatchCtx()

	const [navigation, setNavigation] = useState(false)
	const [timer, setTimer] = useState(0)
	const [clicked, setClicked] = useState(false)

	useEffect(() => {
		setTimer(new Date())
	},[])


	const pointer = usePointerEffect()
	useEffect(() => {
		dispatch({
			type: SET_POINTER,
			payload: pointer

		})
		// console.log(pointer, "pointer")
	},[pointer, dispatch])

	useEffect(() => {
		if(navigation && !loading){
			navigate('/sketch')
		}
	},[navigate, loading, navigation])

	useEffect(() => {
		if(clicked){
			setNavigation(true)
			let  timeCollapse = (new Date() - timer) / 1000

			dispatch({
				type: SET_TIMETOCLICKBUTTON,
				payload: timeCollapse
			})
		}
	},[dispatch, timer, clicked])

	return(
		<div>
			{!navigation && <button className='startBtn' onClick={() => setClicked(true)}>Who Am I?</button>}
			{navigation && loading && <p>Loading your Information...</p>}
		</div>
	)
}

export default StartBtnComp