import { isTouchScreen } from './navigatorInfos'
import * as browserInfosHelper from './browserInfos'

export const isFirefox = ()=> {
	if("mozInnerScreenY" in window && !("userAgentData" in navigator)){
		return true
	}
	return false
}

export const isSafariDesktop = () => {
	if("safari" in window && !("userAgentData" in navigator)){
		return true
	}
	return false
}

export const isChrome = () => {
	if("webkitMediaStream" in window && "userAgentData" in navigator){
		return true
	}
	return false
}

export const isSafariMobile = () => {
	if(isTouchScreen() && navigator.vendor.includes("Apple")){
		return true
	}
	return false
}

export const getBrowser = () => {
	if(isChrome()){
		return 'Chrome'
	}
	if(isFirefox()) {
		return 'Firefox'
	}
	if(isSafariDesktop()){
		return 'Safari'
	}
	if(isSafariMobile()){
	return 'Safari Mobile'
	}
	else{
		return 'unknown Browser'
	}
}

export const getBrowserVersion = () => {
	const ua = navigator.userAgent ? navigator.userAgent : ''

	if(browserInfosHelper.isChrome()){
		return navigator.userAgentData.getHighEntropyValues(['uaFullVersion']).then(version => {
			return version['uaFullVersion']
		})
	}
	
	else if(ua.match(new RegExp(/Firefox|FxiOS/))){
		return ua.split("Firefox/")[1]?.split('.')[0] || ua.split("FxiOS/")[1]?.split('.')[0]
	}

	else if(ua.match((new RegExp(/^((?!chrome|android).)*safari/i)))){
		return ua.split("Version/")[1]?.split('.')[0]
	}

	else{
		return 0
	}
}