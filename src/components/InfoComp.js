import {useEffect, useCallback} from 'react'
import { useDataDispatchCtx } from '../store/dataContext'
import {  SET_LOADING, SET_DISPLAYINFOS, SET_DRAWVARIABLES } from '../store/constants'
import { displayInfos, getDrawVariables } from '../infoSources/systemInfos'
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
		let sysInfos = await displayInfos()
		let drawVariables =  getDrawVariables()
		

		let d = {...ipInfos,...sysInfos, batteryLevel,charging,chargingTime,dischargingTime}
		
		let data = filterData(d)
		// console.log('filtered data', data)
		
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
	},[collectInfos])

	return null

}

export default InfoComp