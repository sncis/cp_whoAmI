import { isFirefox } from './browserInfos'

export const getOS = () => {
	let ua = navigator.userAgent
	let os = undefined

	if(ua.indexOf("Win") !== -1) os = "Windows";
	else if (ua.indexOf("Mac") !== -1) os = "MacOS";
	else if (ua.indexOf("X11") !== -1) os = "UNIX";
	else if (ua.indexOf("Linux") !== -1) os = "Linux";
	return os
}

export const getOSVersion = () => {
	if(isFirefox()){
		return navigator.userAgent.split(';')[1]?.split(" ").slice(-1)[0] || 0

	}
	// let ua = navigator.userAgent
	return navigator.userAgent.split(')')[0]?.split(" ").slice(-1)[0] || 0
}