import "../App.css"
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import backImg from '../img/back.png'
import { useDataStateCtx, useDataDispatchCtx } from '../store/dataContext'
import { deletData } from '../store/actions/fingerPrintActions'
import { RESET_STORE } from '../store/constants'

const NavigationComp = () => {
	const state = useDataStateCtx()
	const dispatch = useDataDispatchCtx()
	const navigate = useNavigate()

	const [deleteInfos, setDelete] = useState(false)
	const [back, setBack] = useState(false)

	useEffect(() => {
		if(deleteInfos){
			deletData(state.fingerprint)
			navigate('/')
		}
	},[deleteInfos, navigate,state.fingerprint])

	useEffect(() => {
		if(back){
			dispatch({
				type: RESET_STORE
			})
			navigate('/')
		}
	})

	
	return(
		<div className="navContainer"> 
			<img src={backImg} alt="back arrow" id="backArrow" onClick={() => setBack(true)}/>
			<p id="moreInf">more information</p>
			<button id="deleteBtn" onClick={() => setDelete(true)}>delete my Data</button> 

		</div>
	)

}

export default NavigationComp 