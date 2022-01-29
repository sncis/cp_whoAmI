import React, { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { SET_LOADING,SET_DISPLAYINFOS } from '../store/constants'
import { displayInfos } from '../utils/displayInfos'
import { useDataDispatchCtx } from '../store/dataContext'

const HomeComp = () => {

	const dispatch = useDataDispatchCtx()

	const navigate = useNavigate()
	const [navigation, setNavigation] = useState(false)

	const collectInfos = useCallback( async() => {
		dispatch ({
			type:SET_LOADING,
			payload: true
		})

		const infos = await displayInfos()

		dispatch ({
			type:SET_DISPLAYINFOS,
			payload: infos
		})

		dispatch ({
			type:SET_LOADING,
			payload: false
		})

	},[dispatch])


	useEffect(() => {
		collectInfos()
	},[collectInfos])



	useEffect(() => {
		if(navigation) {
			navigate('/sketch')
		}
	},[navigation, navigate])


	return(
		<div> 
			<button className='startBtn' onClick={() => setNavigation(true)}>Who Am I?</button>
		</div>
	)
}

export default HomeComp