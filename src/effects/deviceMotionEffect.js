import { useState, useEffect } from 'react'
import { isSafariMobile } from '../infoSources/browserInfos'

export const useDevicemotionEffect = () => {
	const [motion, setMotion] = useState(undefined)

	const getMotion = (event) => {
		setMotion({acc: event.acceleration, rot: event.rotationRate})
		console.info(event.acceleration.y, event.rotationRate.gamma)
	}
	useEffect(() => {
		if(!isSafariMobile() && window.DeviceOrientationEvent) {
		window.addEventListener("devicemotion",getMotion)
		return () => window.removeEventListener('devicemotion', getMotion)
		}
	})

return {motion: motion}
}