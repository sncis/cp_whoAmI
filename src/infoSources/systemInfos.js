import * as NAV_INFOS from '../infoSources/navigatorInfos'
import { filterData, filterStrings } from '../utils/helpers'
import { getFonts } from '../infoSources/fonts'
import { getKeyboardLayout } from '../infoSources/keyboard'
import { getBrowser, getBrowserVersion } from './browserInfos'


// export const displayInfos = async() => {

// 	let infos = {
// 		'Connection type': NAV_INFOS.getConnectionType(),
// 		'Browser Vendor': NAV_INFOS.getVendor(),
// 		'Language': NAV_INFOS.getLanguage(),
// 		'Paltform': Object.values(await NAV_INFOS.getPlatform()),
// 		'Device memory': NAV_INFOS.getDeviceMemeory(),
// 		'CPU' : NAV_INFOS.getCPU(),
// 		'Installed Fonts' : getFonts().length,
// 		'Plugins': NAV_INFOS.getPlugins(),
// 		'PDFViewer enabled' : NAV_INFOS.getPdfViewerEnabled().toString(), 
// 		'Cookies enabled': NAV_INFOS.getCookisEnabled(),
// 		'Keyboard layout': await getKeyboardLayout(),
// 		'Browser': getBrowser(),
// 		'Browser Version': getBrowserVersion(),
// 		'Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
// 		'Screen resolution': NAV_INFOS.getScreenResolution(),
// 		'Zoom level': NAV_INFOS.getZoomLevel()
// 	}

// 	return filterData(infos)
// }


export const displayInfos = async() => {

	let infos = {
		connectionType: NAV_INFOS.getConnectionType(),
		vendor: NAV_INFOS.getVendor(),
		language: NAV_INFOS.getLanguage(),
		paltform: Object.values(await NAV_INFOS.getPlatform()),
		deviceMemory: NAV_INFOS.getDeviceMemeory(),
		cpu : NAV_INFOS.getCPU(),
		fonts : getFonts().length,
		plugins: NAV_INFOS.getPlugins(),
		// getPDFViewer : NAV_INFOS.getPdfViewerEnabled().toString(), 
		keyLayout: await getKeyboardLayout(),
		browser: getBrowser(),
		browserVersion: await getBrowserVersion(),
		timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
		screenResolution: NAV_INFOS.getScreenResolution(true),
		zoomLevel: NAV_INFOS.getZoomLevel()

	}

	return filterData(infos)
}

export const getDrawVariables = async() => {
	let infos = {
		platformVersion:Object.values(await NAV_INFOS.getPlatform())[1],
		deviceMemory: NAV_INFOS.getDeviceMemeory(),
		cpu: NAV_INFOS.getCPU(),
		fonts : getFonts().length,
		plugins: NAV_INFOS.getPlugins().length,
		browserVersion: Number((await getBrowserVersion()).split('.')[0]),
		screenResolution: NAV_INFOS.getScreenResolution(),
		zoomLevel: NAV_INFOS.getZoomLevel()
	}
	return infos
}

export const systemInfos = async() => {

	let infos = {
		connectionType: NAV_INFOS.getConnectionType(),
		vendor: NAV_INFOS.getVendor(),
		language: NAV_INFOS.getLanguage(),
		paltform: Object.values(await NAV_INFOS.getPlatform()),
		deviceMemory: NAV_INFOS.getDeviceMemeory(),
		cpu : NAV_INFOS.getCPU(),
		fonts : getFonts().length,
		plugins: NAV_INFOS.getPlugins(),
		getPDFViewer : NAV_INFOS.getPdfViewerEnabled()?.toString(), 
		keyLayout: await getKeyboardLayout(),
		browser: getBrowser(),
		browserVersion: getBrowserVersion(),
		timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
		screenResolution: NAV_INFOS.getScreenResolution(),
		zoomLevel: NAV_INFOS.getZoomLevel()

	}

	return filterData(infos)
}

export const infosWithDescription = async() => {
	let infos = {
		connectionType: `Your have a ${NAV_INFOS.getConnectionType()} connection`,
		vendor: `Your Browser is from ${NAV_INFOS.getVendor()}`,
		language: `Your prefered langage is ${NAV_INFOS.getLanguage()}`,
		paltform: `You use ${NAV_INFOS.getPlatform().platform}`,
		deviceMemory: `Your device has ${NAV_INFOS.getDeviceMemeory()} GB of memeory`,
		cpu : `You have at least ${NAV_INFOS.getCPU()} logical processors available`,
		fonts : `You have ${getFonts().length} fonts installed`,
		plugins:`You installed plugins are: ${NAV_INFOS.getPlugins()}`,
		isTouch: NAV_INFOS.isTouchScreen() ? "You have a touch screen" : "You don't have a touch screen",
		keyLayout: `Your Keyboard Layout is ${await getKeyboardLayout()}`,
		browser: `$You use version ${getBrowserVersion()} of ${getBrowser()}`,
		timezone: `You are located in the ${Intl.DateTimeFormat().resolvedOptions().timeZone} timezone`,
		screenResolution: `Your screen is ${NAV_INFOS.getScreenResolution().width} wide, ${NAV_INFOS.getScreenResolution().height} high and has a dept of ${NAV_INFOS.getScreenResolution().depth}`,
		zoomLevel: `Your Browser has a zoom level of ${NAV_INFOS.getZoomLevel()}`
	}
	return filterStrings(infos)
}

export const crossFingerPrintInfos = async() => {
	let infos = {
		timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
		hardwareConcurrency: NAV_INFOS.getCPU(),
		screenResolution: NAV_INFOS.getScreenResolution(),
		zoomLevel: NAV_INFOS.getZoomLevel()
	}

}