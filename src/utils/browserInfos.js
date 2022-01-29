import { isTouchScreen } from './navigatorInfos'

const ua = window && window.navigator?.userAgent ? window.navigator.userAgent : ''

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

	if("userAgentData" in navigator && "webkitMediaStream" in window){
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
		return 'chrome'
	}
	if(isFirefox()) {
		return 'firefox'
	}
	if(isSafariDesktop()){
		return 'safari desktop'
	}
	if(isSafariMobile()){
	return 'safari mobile'
	}
	else{
		return 'unknown broser'
	}
}

export const getBrowserVersion = () => {
	if(isChrome()){
		navigator.userAgentData.getHighEntropyValues(['uaFullVersion']).then(version => {
			return version
		})
	}

	else if(ua.match(new RegExp(/Firefox|FxiOS/))){
		return ua.split("Firefox/")[1]?.split('.')[0] || ua.split("FxiOS/")[1]?.split('.')[0] + 'mobile'
	}

	else if(ua.match((new RegExp(/^((?!chrome|android).)*safari/i)))){
		return ua.split("Version/")[1]?.split('.')[0]
	}

	else{
		return 0
	}

}