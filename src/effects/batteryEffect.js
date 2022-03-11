import { useState, useEffect } from 'react'

export const useBatteryStatusEffect = () => {

	const [batteryLevel, setBatteryLevel]  = useState(undefined)
	const [charging, setCharging] = useState(undefined)
	const [dischargingTime, setDischargingTime] = useState(undefined)
	const [chargingTime, setChargingTime] = useState(undefined)


function updateBattery(bat){
	setBatteryLevel(Math.floor(bat.level * 100))
	setCharging(bat.charging)
	setChargingTime(bat.chargingTime)
	setDischargingTime(bat.dischargingTime /60) 
}
	useEffect(() => {	
		const isChrome = navigator.userAgent.indexOf('Chrome') > -1 ? true : false
		if(isChrome){
			navigator.getBattery().then((battery) => {
				
				updateBattery(battery)

				battery.onchargingchange = () => {
					updateBattery(battery)
				}
				battery.onlevelchange = () => {
					updateBattery(battery)
				}

				battery.ondischargingtimechange = () => {
					updateBattery(battery)
				}

				battery.onchargingtimechange = () => {
					updateBattery(battery)

				}
			})
		}
	},[batteryLevel,charging,chargingTime,dischargingTime])
	
	return {
		batteryLevel,
		charging,
		chargingTime,
		dischargingTime
	}
}