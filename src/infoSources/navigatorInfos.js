import { isChrome } from './browserInfos'
import * as navigatorInfosHelper from "./navigatorInfos"
import { getOS, getOSVersion } from './oSInfoHelpers'


const ua = navigator?.userAgent ? navigator.userAgent : '' 

export const isTouchScreen = () => {
	let isTouch = false
	if("maxTouchPoints" in navigator || 'msMaxTouchPoints' in navigator){
		isTouch = navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0
	}
	return isTouch
}

export const getConnectionType = ()=> {
	return navigator.connection?.effectiveType
}

export const getVendor = () => {
	if(window.navigator?.vendor ===''){
		return "Firefox"
	}
	return window.navigator?.vendor
}

export const getLanguage = () => {
	return navigator.language
}

export const getLanguages = () => {
	return navigator.languages
}


export const getPlatform = () => {
	let { platform } = window.navigator
	if(isChrome()){
	 return navigator.userAgentData.getHighEntropyValues(
		["platform", "platformVersion"]).then(el => {
			return {
				platform:el['platform'],
				version: el['platformVersion']
			} 
		});

	}else{
		if(platform === "Mac" && navigatorInfosHelper.isTouchScreen()){
				return {platform: "iPad", version: getOSVersion()}
			}
		return {platform: platform ? platform : getOS(), version: getOSVersion()}
	}	
}

export const getCPU = () => {
	return window.navigator?.hardwareConcurrency  || undefined
}

export const getDeviceMemeory = () => {
	return navigator.deviceMemory || undefined 
}

export const getPdfViewerEnabled = () => {
	return navigator.pdfViewerEnabled
}

export const getCookisEnabled = () => {
	return navigator.cookieEnabled
}

export const getScreenDepth = () => {
	return window.screen.colorDepth
}

export const getPlugins = () => {
	let plugins = navigator.plugins
	let pNames = []

	if(plugins){
		for(let p of plugins){
			pNames.push(p["name"])
		}
	}
	return plugins ? pNames : undefined
}

export const getScreenResolution = (toString = false) => {
	const width = window.screen.width
	const height = window.screen.height
	const depth = window.screen.colorDepth

	if(toString){
		return `${width},${height},${depth}`
	}
	return {width, height, depth}
}


export const getZoomLevel = () => {
	return Math.ceil(((window.outerWidth - 10 ) / window.innerWidth) * 100);
}





