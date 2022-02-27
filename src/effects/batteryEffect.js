import { useState, useEffect } from 'react'

export const useBatteryStatusEffect = () => {

	const [batteryLevel, setBatteryLevel]  = useState('')
	const [charging, setCharging] = useState('')
	const [dischargingTime, setDischargingTime] = useState('')
	const [chargingTime, setChargingTime] = useState('')


function updateBattery(bat){
	setBatteryLevel(Math.floor(bat.level * 100))
	setCharging(bat.charging ? `Device is chargin` : 'Device is not chargin')
	setChargingTime(`Remaining chargin time: ${bat.chargingTime}`)
	setDischargingTime(`Remaining discharging time: ${bat.dischargingTime / 60}` ) // minutes => if more then 60 devide /60 to get hours
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