import { isChrome } from './browserInfos'
import { isTouchScreen } from './screenInfos'
import {getOSandVersion } from './OSInfos'

export const getPlatform = () => {
	let { platform } = window.navigator
	if(isChrome()){
	 return navigator.userAgentData.getHighEntropyValues(
		["platform", "platformVersion"]).then(el => {
			return {platform: el['platform'], version: el['platformVersion']}
		});
	}
	if(isTouchScreen() && (platform === "MacIntel" || platform === "Mac")){
		getOSandVersion()
		return `iPad ${navigator.userAgent?.split(')')[0].split(' ').pop()}`
	}
	
	else{
		console.log(platform)
		return platform ? `${platform} ${navigator.userAgent?.split(')')[0].split(' ').pop()}`: getOSandVersion()
	}	
}

export const getCPU = () => {
	return window.navigator?.hardwareConcurrency  || undefined
}

export const getDeviceMemeory = () => {
	return navigator.deviceMemory || undefined 
}