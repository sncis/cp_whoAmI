import React, { useEffect, useState, useCallback } from 'react'
import FingerprintComp from './FingerprintComp'
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
		console.log(Object.keys(infos).length, 'info length')
		console.log(infos)


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
			<FingerprintComp />

			<button className='startBtn' onClick={() => setNavigation(true)}>Who Am I?</button>
		</div>
	)
}

export default HomeComp