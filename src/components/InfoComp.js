import React, {useEffect, useCallback} from 'react'
import { useDataDispatchCtx } from '../store/dataContext'
import { backendFetcher } from '../utils/apiHelpers/backendFetcher'
import { SET_IPINFOS, SET_LOADING, SET_DISPLAYINFOS, SET_DRAWVARIABLES } from '../store/constants'
import { systemInfos, infosWithDescription, displayInfos, getDrawVariables } from '../infoSources/systemInfos'
import { useBatteryStatusEffect } from '../effects/batteryEffect'
import { fetchIpInfos } from '../store/actions/fetchActions'
import { useDevicemotionEffect } from '../effects/deviceMotionEffect'
import { filterData ,filterIPInfos} from '../utils/helpers'


const InfoComp = () => {
	const dispatch = useDataDispatchCtx()

	const { batteryLevel,charging,chargingTime,dischargingTime} = useBatteryStatusEffect()
	const {motion} = useDevicemotionEffect()

	const collectInfos = useCallback(async() => {
		dispatch({
			type:SET_LOADING,
			payload: true
		})

		let ipInfos = filterIPInfos(await fetchIpInfos())
		let sysInfos = await displayInfos()
		let drawVariables =  getDrawVariables()
		

		let d = {...ipInfos,...sysInfos, batteryLevel,charging,chargingTime,dischargingTime}
		
		let data = filterData(d)
		console.log('filtered data', data)
		
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