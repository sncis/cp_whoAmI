import { isChrome, isFirefox, isSafariDesktop, isSafariMobile } from './browserInfos'


// const win = window
// const nav = navigator
const ua = window && window.navigator?.userAgent ? navigator.userAgent : '' 

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
		navigator.userAgentData.getHighEntropyValues(
		["platform", "platformVersion"]).then(el => {
			return {
				platform:el['platform'],
				version: el['platformVersion']
			} 
		});
	}

	if(platform === "MacIntel" && isTouchScreen()){
		return 'iPad'
	}

	return platform ? platform : undefined
}

export const getCPU = () => {
	return window.navigator.hardwareConcurrency ? window.navigator.hardwareConcurrency : undefined
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
	let {plugins} = navigator.plugins
	let pNames = []

	if(plugins){
		for(let p of plugins){
			pNames.push(p["name"])
		}
	}

	return plugins ? pNames : undefined
}






