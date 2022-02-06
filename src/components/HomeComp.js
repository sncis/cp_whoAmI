import React, { useEffect, useState, useCallback } from 'react'
import FingerprintComp from './FingerprintComp'
import { useNavigate } from 'react-router-dom'
import { SET_LOADING, SET_DISPLAYINFOS } from '../store/constants'
import { systemInfos } from '../infoSources/systemInfos'
import { useDataDispatchCtx, useDataStateCtx } from '../store/dataContext'
import { backendFetcher } from '../store/actions/backendFetcher'
import { apiFetcher } from '../store/actions/apiFetcher'
import { filterIPInfos } from '../utils/helpers'

const HomeComp = () => {

	const dispatch = useDataDispatchCtx()
	const state = useDataStateCtx()
	

	const navigate = useNavigate()
	const [navigation, setNavigation] = useState(false)
	const [ip, setIp] = useState(undefined)
	const [ipInfos, setIpInfos] = useState(undefined)

	

	const fetchIP = useCallback( async() => {
		console.log('fetch Ip called')
		const options = {url:'/ip', method: 'get'}
		try{
			let req = await backendFetcher(options)
			// console.log('ip', req)

			return req.data
			// setIp(req.data)
		}catch(error){
			console.log(error)
		}
	},[])


	const fetchIPInfos = useCallback(async(i) => {
		console.log("api fetcher called")
		const options = {url:`http://ip-api.com/json/${i}`, method:'get'}
		
		try{
			let infos = await apiFetcher(options)
			// console.log("infos")
			// console.log(infos.status)
			if(infos.status === 200){
				// setIpInfos(infos.data)
				return filterIPInfos(infos.data)
			}
		}catch(error){
			console.log(error)
		}
	},[])


	const collectInfos = useCallback( async() => {
		dispatch ({
			type:SET_LOADING,
			payload: true
		})

		const canvasHash = state.canvasHash
		const ip = await fetchIP()
		const infos = await systemInfos()
		const ipInfoData = await fetchIPInfos(ip)

		let data = {...infos, ...ipInfoData, canvasHash}
		// console.log("data")
		// console.log(data)

	
		dispatch ({
			type:SET_DISPLAYINFOS,
			payload: data
		})

		dispatch ({
			type:SET_LOADING,
			payload: false
		})
	
	},[dispatch,fetchIP,fetchIPInfos,state.canvasHash])



	// useEffect(() => {
	// 	fetchIP()
	// },[fetchIP])


	// useEffect(() => {
	// 	fetchIPInfos(ip)
	// },[ip,fetchIPInfos])


	useEffect(() => {
		collectInfos()
	},[collectInfos])

	useEffect(() => {
		if(navigation && !state.loading) {
			navigate('/sketch')
		}
	},[navigation, navigate, state,state.loading])


	return(
		<div> 
			<FingerprintComp />
			{!navigation && <button className='startBtn' onClick={() => setNavigation(true)}>Who Am I?</button>}			
			{navigation && state.loading && <p>loading...</p>}
		</div>
	)
}

export default HomeComp