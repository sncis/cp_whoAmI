import React, {useEffect, useCallback} from 'react'
import { useDataDispatchCtx } from '../store/dataContext'
import { backendFetcher } from '../utils/apiHelpers/backendFetcher'
import { SET_IPINFOS, SET_LOADING, SET_DISPLAYINFOS, SET_DRAWVARIABLES } from '../store/constants'
import { systemInfos, infosWithDescription, displayInfos, getDrawVariables } from '../infoSources/systemInfos'
import { useBatteryStatusEffect } from '../effects/batteryEffect'
import { fetchIpInfos } from '../store/actions/fetchActions'
import { useDevicemotionEffect } from '../effects/deviceMotionEffect'

const InfoComp = () => {
	const dispatch = useDataDispatchCtx()

	const { batteryLevel,charging,chargingTime,dischargingTime} = useBatteryStatusEffect()
	const {motion} = useDevicemotionEffect()
//fetch the ip infos from backend and get isp infos etc
	// const fetchIpInfos = useCallback(async() => {
	// 	let options = { url:'/test/ip', method:'get'}
	// 	let resp = await backendFetcher(options)

	// 	if(resp){
	// 		dispatch({
	// 			type: SET_IPINFOS,
	// 			payload: resp.data 
	// 		})
	// 		return resp.data 
	// 	}
	// 	return {}
	
	// },[dispatch])

	const collectInfos = useCallback(async() => {
		dispatch({
			type:SET_LOADING,
			payload: true
		})

		let ipInfos = await fetchIpInfos()
		let sysInfos = await displayInfos()
		let drawVariables = await getDrawVariables()
		// let getSystemInfos = await infosWithDescription()


		let data = {...ipInfos, ...sysInfos, batteryLevel,charging,chargingTime,dischargingTime}
		// console.log(data)
		dispatch({
			type: SET_DISPLAYINFOS,
			payload: data
		})
		dispatch({
			type: SET_DRAWVARIABLES,
			payload: drawVariables
		})

		dispatch({
			type:SET_LOADING,
			payload: false
		})
	},[dispatch, batteryLevel,charging,chargingTime,dischargingTime])


	useEffect(() => {
		collectInfos()
		console.log("motion")
		console.log(motion)

	},[collectInfos, motion])

	return null

}

export default InfoComp