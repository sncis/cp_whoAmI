import {useEffect, useCallback} from 'react'
import { useDataDispatchCtx } from '../store/dataContext'
import {  SET_LOADING, SET_DISPLAYINFOS, SET_DRAWVARIABLES,SET_IPINFOS } from '../store/constants'
import { getDisplayInfos, getDrawVariables } from '../infoSources/systemInfos'
import { useBatteryStatusEffect } from '../effects/batteryEffect'
import { fetchIpInfos } from '../utils/ipInfosFetcher'
import { filterData ,filterIPInfos} from '../utils/filterHelpers'


const InfoComp = () => {
	const dispatch = useDataDispatchCtx()

	const { batteryLevel,charging,chargingTime,dischargingTime} = useBatteryStatusEffect()

	const collectInfos = useCallback(async() => {
		dispatch({
			type:SET_LOADING,
			payload: true
		})

		let resp = await fetchIpInfos()
	
		let ipInfos = resp.data ? filterIPInfos(resp.data) : undefined
		let dispalyInfos = await getDisplayInfos()
		let drawVariables =  getDrawVariables()
		
		let bObj = batteryLevel !== undefined ? {batteryLevel: `Battery level is: ${batteryLevel}`,charging: charging ? "Device is charging": "Device is not chargin", chargingTime : `Remaining chargin time is: ${chargingTime}`,dischargingTime: `Remaining dischargin time is: ${dischargingTime}`}: undefined

		let d = {...ipInfos,...dispalyInfos, ...bObj}
		let data = filterData(d)
		
		dispatch({
			type: SET_DISPLAYINFOS,
			payload: data
		})
		dispatch({
			type: SET_DRAWVARIABLES,
			payload: drawVariables
		})
		dispatch({
			type: SET_IPINFOS,
			payload: ipInfos
		})

		dispatch({
			type:SET_LOADING,
			payload: false
		})
	},[dispatch, batteryLevel,charging,chargingTime,dischargingTime])


	useEffect(() => {
		collectInfos()
	},[collectInfos])

	return null

}

export default InfoComp