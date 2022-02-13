import React, { useEffect, useState, useCallback } from 'react'
import FingerprintComp from './FingerprintCompOut'
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
	// const [userData, setUserData] = useState(undefined)
	

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

	// const storeData = useCallback(async(data) => {
	// 	const options = {
	// 		url:"/infos",
	// 		method: "post",
	// 		data: data
	// 	}
	// 	try{
	// 		let resp = await backendFetcher(options)
	// 		console.log(resp)
	// 	}catch(err){
	// 		console.log("error to post data to backend:")
	// 		console.log(err)
	// 	}
	// })


	const collectInfos = useCallback( async() => {
		dispatch ({
			type:SET_LOADING,
			payload: true
		})

		// const canvasHash = state.canvasHash
		const ip = await fetchIP()
		const infos = await systemInfos()
		const ipInfoData = await fetchIPInfos(ip)
		// const fingerPrintData = state.fingerPrintData

		let data = {...infos, ...ipInfoData}
		// let data = {...ipInfoData, fingerPrintData}
		// let data ={}

		console.log("data")
		console.log(data)


		// setUserData(data)
	
		dispatch ({
			type:SET_DISPLAYINFOS,
			payload: data
		})

		dispatch ({
			type:SET_LOADING,
			payload: false
		})
	
	},[dispatch,fetchIP,fetchIPInfos])



	// useEffect(() => {
	// 	fetchIP()
	// },[fetchIP])


	// useEffect(() => {
	// 	fetchIPInfos(ip)
	// },[ip,fetchIPInfos])


	useEffect(() => {
		collectInfos()
	},[])

	// useEffect(() => {
	// 	if(navigation && !state.loading) {
	// 		navigate('/sketch')
	// 	}
	// },[navigation, navigate, state,state.loading])

	useEffect(()=>{
		if(navigation){
			navigate('/home')
		}
	},[navigation,navigate])


	return(
		<div> 
			<FingerprintComp />
			{!navigation && <button className='startBtn' onClick={() => setNavigation(true)}>Who Am I?</button>}			
			{navigation && state.loading && <p>loading...</p>}
		</div>
	)
}

export default HomeComp