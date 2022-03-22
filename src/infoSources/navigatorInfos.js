const ua = navigator?.userAgent ? navigator.userAgent : '' 


export const getVendor = () => {
	if(window.navigator?.vendor ===''){
		return "Mozilla Firefox"
	}
	return window.navigator?.vendor
}
export const getPdfViewerEnabled = () => {
	return navigator.pdfViewerEnabled
}

export const getCookisEnabled = () => {
	return navigator.cookieEnabled
}

export const getPlugins = () => {
	let plugins = navigator.plugins
	let pNames = []

	if(plugins){
		for(let p of plugins){
			pNames.push(p["name"])
		}
	}
	return pNames.length >=1 ? pNames : undefined
}

export const getZoomLevel = () => {
	return Math.ceil(((window.outerWidth - 10 ) / window.innerWidth) * 100);
}








