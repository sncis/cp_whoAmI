import { isChrome } from './browserInfos'
import { isTouchScreen } from './screenInfos'
import {getOSandVersion } from './OSInfos'

export const getPlatform = async() => {
	let { platform } = window.navigator
	if(isChrome()){
	 return navigator.userAgentData.getHighEntropyValues(
		["platform", "platformVersion"]).then(el => {
			return {platform: el['platform'], version: el['platformVersion']}
		});
	}
	if(isTouchScreen() && (platform === "MacIntel" || platform === "Mac")){
		return {platform: 'iOS', version: getOSandVersion().version}
	}
	
	else{
		return getOSandVersion().platform ? {platform: getOSandVersion().platform , version : getOSandVersion().version } : {platform: platform || undefined, version: ''}
	}	
}

export const getCPU = () => {
	return window.navigator?.hardwareConcurrency  || undefined
}

export const getDeviceMemeory = () => {
	return navigator.deviceMemory || undefined 
}

export const isMobile = () => {
	let media = window.matchMedia("only screen and (max-width: 760px)").matches
	if(media && isTouchScreen()){
		return true
	}
	return false
}