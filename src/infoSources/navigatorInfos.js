import { isChrome } from './browserInfos'
import * as navigatorInfosHelper from "./navigatorInfos"
import { getOS, getOSVersion, getOSandVersion } from './OSInfoHelpers'


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
		if((platform === "Mac" || "MacIntel") && navigatorInfosHelper.isTouchScreen()){
				return {platform: "iPad", version: getOSVersion()}
			}
		return {platform: platform ? platform : getOSandVersion(), version: getOSVersion()}
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

export const getPermissions = () => {
	const permissions = ['accelerometer','accessibility-events','ambient-light-sensor', 'background-sync','camera','clipboard-read', 'clipboard-write' ]

		const permissionsArray =[]
		for(let p of permissions) {
			navigator.permissions.query({name: p}).then((result) => {
				if(result.status === 'ganted'){
					permissionsArray.push(p)
				}
			}).catch(error => {
				console.log(error)
			})
		}
		return permissionsArray.length > 1 ? permissionsArray : undefined
}





