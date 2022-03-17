import * as NAV_INFOS from '../infoSources/navigatorInfos'
import { filterData } from '../utils/filterHelpers'
import { getFonts } from '../infoSources/fonts'
import { getKeyboardLayout } from '../infoSources/keyboard'
import { getBrowser, getBrowserVersion } from './browserInfos'
import { isLandscape } from './orientation'
import { isTouchScreen } from './navigatorInfos'
import { getBluetoothEnabled } from './blueThooth'



//infos which are displayed to user in sketch 
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
		keyLayout: await getKeyboardLayout(),
		browser: getBrowser(),
		browserVersion: await getBrowserVersion(),
		timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
		screenResolution: NAV_INFOS.getScreenResolution(true),
		zoomLevel: NAV_INFOS.getZoomLevel(),
		deviceOrientation: isLandscape() ? 'Device is in Landscape orientation' : 'Device is in Portrait orientation',
		isTouchscreen: isTouchScreen() ? 'Device is a touch device' : 'Device is not a touch device',
		bluetoothEnbaled : await getBluetoothEnabled() ? 'Bluetooth accessable' : 'Bluetooth not accessable',
	}

	return filterData(infos)
}

//infos which are used for drawing settings
export const getDrawVariables = async() => {
	let infos = {
		platformVersion: Object.values(await NAV_INFOS.getPlatform())[1],
		deviceMemory: NAV_INFOS.getDeviceMemeory(),
		cpu: NAV_INFOS.getCPU(),
		fonts : getFonts().length,
		plugins: NAV_INFOS.getPlugins().length,
		browserVersion: Number((await getBrowserVersion()).split('.')[0]),
		screenResolution: NAV_INFOS.getScreenResolution(),
		zoomLevel: NAV_INFOS.getZoomLevel()
	}
	return filterData(infos)
}

//infos to show in Info Apge to tell user what I can get from him 
export const getSystemInfos = async() => {
	let screenResolution = NAV_INFOS.getScreenResolution()
	let infos = {
		"Connection Type": NAV_INFOS.getConnectionType(),
		"Vendor": NAV_INFOS.getVendor(),
		"Language": NAV_INFOS.getLanguage(),
		"Languages": NAV_INFOS.getLanguages(),
		"Platform": Object.values(await NAV_INFOS.getPlatform()),
		"Device Memory": NAV_INFOS.getDeviceMemeory(),
		"Available CPU" : NAV_INFOS.getCPU(),
		"Installed Fonts" : getFonts().length,
		"Plugins": NAV_INFOS.getPlugins(),
		"Keyboard Layout": await getKeyboardLayout(),
		"Browser": getBrowser(),
		"Browser Version": await getBrowserVersion(),
		"Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
		"Browser Zoom Level": NAV_INFOS.getZoomLevel(),
		"Device Orientation": isLandscape() ? 'Device is in Landscape orientation' : 'Device is in Portrait orientation',
		"Touchscreen": isTouchScreen() ? 'Device is a touch device' : 'Device is not a touch device',
		"Bluetooth" : await getBluetoothEnabled() ? 'Bluetooth available' : 'Bluetooth not available',
		"PDF Viewer enabled": NAV_INFOS.getPdfViewerEnabled() ? "Yes" : "No",
		"Cookies enabled": NAV_INFOS.getCookisEnabled() ? 'YES' : 'NO',
		"Screen Resolution": `Width: ${screenResolution.width}, Height: ${screenResolution.height}, Depth: ${screenResolution.depth}`,
		"Browser Permissions": await NAV_INFOS.getPermissions()
	}

	return filterData(infos)
}


//infos used to calculate fingerprint
export const fingerPrintInfos = async() => {
	console.log('fingerprint system infos called')
	let infos = {
		connectionType: NAV_INFOS.getConnectionType(),
		vendor: NAV_INFOS.getVendor(),
		language: NAV_INFOS.getLanguage(),
		languages: NAV_INFOS.getLanguages(),
		platform: Object.values(await NAV_INFOS.getPlatform()),
		deviceMemory: NAV_INFOS.getDeviceMemeory(),
		availableCPU : NAV_INFOS.getCPU(),
		installedFonts : getFonts(),
		plugins: NAV_INFOS.getPlugins(),
		keyboardLayout: await getKeyboardLayout(),
		browser: getBrowser(),
		browserVersion: await getBrowserVersion(),
		timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
		touchscreen: isTouchScreen() ,
		bluetooth : await getBluetoothEnabled() ,
		PDFViewerEnabled: NAV_INFOS.getPdfViewerEnabled() ,
		cookiesEnabled: NAV_INFOS.getCookisEnabled() ,
		screenResolution: NAV_INFOS.getScreenResolution(),	
	}

	return filterData(infos)
}